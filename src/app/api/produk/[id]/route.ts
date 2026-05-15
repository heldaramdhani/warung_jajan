import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

/**
 * @swagger
 * /api/produk/{id}:
 *   get:
 *     summary: Mendapatkan detail produk berdasarkan ID
 *     tags: [Produk]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID produk
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan detail produk
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Produk tidak ditemukan
 *       500:
 *         description: Server error
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    if (!id) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    const produk = await prisma.produk.findUnique({
      where: { id },
      include: {
        kategori: true,
        stok_detail: true,
      },
    });

    if (!produk) {
      return NextResponse.json({ success: false, message: 'Produk not found' }, { status: 404 });
    }

    const transformedProduk = {
      ...produk,
      stok: produk.stok_detail?.jumlah_stok ?? 0
    };

    return NextResponse.json({ success: true, data: transformedProduk }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/produk/{id}:
 *   put:
 *     summary: Memperbarui produk berdasarkan ID (Mendukung Update Parsial)
 *     description: Anda hanya perlu mengisi field yang ingin diubah. Kosongkan field yang tidak ingin diubah.
 *     tags: [Produk]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID produk
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_produk:
 *                 type: string
 *                 description: (Opsional) Nama produk baru
 *               harga:
 *                 type: integer
 *                 description: (Opsional) Harga produk baru
 *               stok:
 *                 type: integer
 *                 description: (Opsional) Jumlah stok baru
 *               gambar:
 *                 type: string
 *                 format: binary
 *                 description: (Opsional) File gambar produk baru jika ingin diganti
 *               kategori_id:
 *                 type: string
 *                 format: uuid
 *                 description: (Opsional) ID kategori baru
 *     responses:
 *       200:
 *         description: Produk berhasil diperbarui
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Produk tidak ditemukan
 *       500:
 *         description: Server error
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    if (!id) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    const formData = await request.formData();
    const nama_produk = formData.get('nama_produk') as string | null;
    const hargaStr = formData.get('harga') as string | null;
    const stokStr = formData.get('stok') as string | null;
    const kategori_id_str = formData.get('kategori_id') as string | null;
    const gambarFile = formData.get('gambar') as File | null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {};
    
    if (nama_produk && nama_produk.trim() !== '') {
      data.nama_produk = nama_produk;
    }
    
    if (hargaStr && hargaStr.trim() !== '') {
      const parsedHarga = parseInt(hargaStr);
      if (!isNaN(parsedHarga)) {
        data.harga = parsedHarga;
      }
    }
    
    if (stokStr && stokStr.trim() !== '') {
      const parsedStok = parseInt(stokStr);
      if (!isNaN(parsedStok)) {
        data.stok_detail = {
          upsert: {
            create: { jumlah_stok: parsedStok },
            update: { jumlah_stok: parsedStok }
          }
        };
      }
    }

    if (kategori_id_str !== null) {
      const trimmedKategoriId = kategori_id_str.trim();
      if (trimmedKategoriId !== '') {
        data.kategori_id = trimmedKategoriId;
      }
    }

    if (gambarFile && gambarFile.size > 0) {
      const arrayBuffer = await gambarFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
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

      const { data: publicUrlData } = supabase.storage
        .from('images_product')
        .getPublicUrl(fileName);
        
      data.gambar_url = publicUrlData.publicUrl;
    }

    const produk = await prisma.produk.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, data: produk }, { status: 200 });
  } catch (error: any) {
    console.error("=== ERROR DI PUT PRODUK ===", error);
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, message: 'Produk not found' }, { status: 404 });
    }
    if (error.code === 'P2003' && error.meta?.constraint === 'produk_kategori_id_fkey') {
      return NextResponse.json({ success: false, message: 'Kategori ID yang dimasukkan tidak ditemukan di database' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/produk/{id}:
 *   delete:
 *     summary: Menghapus produk berdasarkan ID
 *     tags: [Produk]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID produk
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Produk tidak ditemukan
 *       500:
 *         description: Server error
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    if (!id) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    await prisma.produk.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: 'Produk deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, message: 'Produk not found' }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
