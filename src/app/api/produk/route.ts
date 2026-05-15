import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

/**
 * @swagger
 * /api/produk:
 *   get:
 *     summary: Mendapatkan daftar semua produk
 *     tags: [Produk]
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar produk
 *       500:
 *         description: Server error
 */
export async function GET() {
  try {
    const produk = await prisma.produk.findMany({
      include: {
        kategori: true,
        stok_detail: true,
      },
      orderBy: { id: 'asc' },
    });
    const transformedProduk = produk.map((p: any) => ({
      ...p,
      stok: p.stok_detail?.jumlah_stok ?? 0
    }));

    return NextResponse.json({ success: true, data: transformedProduk }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/produk:
 *   post:
 *     summary: Menambahkan produk baru
 *     tags: [Produk]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nama_produk
 *               - harga
 *               - stok
 *             properties:
 *               nama_produk:
 *                 type: string
 *                 example: Keripik Singkong
 *               harga:
 *                 type: integer
 *                 example: 5000
 *               stok:
 *                 type: integer
 *                 example: 50
 *               gambar:
 *                 type: string
 *                 format: binary
 *                 description: Gambar produk
 *               kategori_id:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Produk berhasil ditambahkan
 *       400:
 *         description: Data tidak lengkap
 *       500:
 *         description: Server error
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const nama_produk = formData.get('nama_produk') as string;
    const hargaStr = formData.get('harga') as string;
    const stokStr = formData.get('stok') as string;
    const kategori_id_str = formData.get('kategori_id') as string;
    const gambarFile = formData.get('gambar') as File | null;

    if (!nama_produk || !hargaStr) {
      return NextResponse.json(
        { success: false, message: 'nama_produk dan harga is required' },
        { status: 400 }
      );
    }

    let gambar_url = null;

    if (gambarFile && gambarFile.size > 0) {
      const arrayBuffer = await gambarFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Generate a unique file name
      const fileName = `${Date.now()}-${gambarFile.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images_product')
        .upload(fileName, buffer, {
          contentType: gambarFile.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('images_product')
        .getPublicUrl(fileName);
        
      gambar_url = publicUrlData.publicUrl;
    }

    const produk = await prisma.produk.create({
      data: {
        nama_produk,
        harga: parseInt(hargaStr),
        gambar_url,
        kategori_id: kategori_id_str || null,
      },
    });

    return NextResponse.json({ success: true, data: produk }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
