import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/detail-transaksi:
 *   get:
 *     summary: Mendapatkan daftar semua detail transaksi
 *     tags: [Detail Transaksi]
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar detail transaksi
 *       500:
 *         description: Server error
 */
export async function GET() {
  try {
    const details = await prisma.detail_transaksi.findMany({
      include: {
        produk: true,
        transaksi: true,
      },
      orderBy: { id: 'desc' },
    });
    const transformedDetails = details.map((d: any) => ({
      ...d,
      harga: d.harga_satuan
    }));
    return NextResponse.json({ success: true, data: transformedDetails }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/detail-transaksi:
 *   post:
 *     summary: Membuat detail transaksi baru
 *     tags: [Detail Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transaksi_id
 *               - produk_id
 *               - jumlah
 *             properties:
 *               transaksi_id:
 *                 type: string
 *                 format: uuid
 *               produk_id:
 *                 type: string
 *                 format: uuid
 *               jumlah:
 *                 type: integer
 *               harga_satuan:
 *                 type: integer
 *               subtotal:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Detail transaksi berhasil dibuat
 *       400:
 *         description: Data tidak valid
 *       500:
 *         description: Server error
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transaksi_id, produk_id, jumlah, harga_satuan, subtotal } = body;

    if (!transaksi_id || !produk_id || !jumlah) {
      return NextResponse.json(
        { success: false, message: 'transaksi_id, produk_id, and jumlah are required' },
        { status: 400 }
      );
    }

    // If harga or subtotal not provided, we can try to fetch from product
    let finalHarga = harga_satuan;
    let finalSubtotal = subtotal;

    if (!finalHarga || !finalSubtotal) {
      const product = await prisma.produk.findUnique({
        where: { id: produk_id },
      });

      if (!product) {
        return NextResponse.json(
          { success: false, message: 'Produk tidak ditemukan' },
          { status: 400 }
        );
      }

      finalHarga = finalHarga || product.harga;
      finalSubtotal = finalSubtotal || (finalHarga * jumlah);
    }

    const detail = await prisma.detail_transaksi.create({
      data: {
        transaksi_id,
        produk_id,
        jumlah,
        harga_satuan: finalHarga,
        subtotal: finalSubtotal,
      },
    });

    return NextResponse.json({ success: true, data: detail }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
