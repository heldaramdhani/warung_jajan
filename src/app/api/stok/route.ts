import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/stok:
 *   get:
 *     summary: Mendapatkan daftar semua stok
 *     tags: [Stok]
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar stok
 *       500:
 *         description: Server error
 */
export async function GET() {
  try {
    const stok = await prisma.stok.findMany({
      include: {
        produk: {
          include: {
            kategori: true
          }
        }
      },
      orderBy: { updated_at: 'desc' },
    });
    return NextResponse.json({ success: true, data: stok }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/stok:
 *   post:
 *     summary: Membuat record stok baru untuk produk
 *     tags: [Stok]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produk_id
 *               - jumlah_stok
 *             properties:
 *               produk_id:
 *                 type: string
 *                 format: uuid
 *               jumlah_stok:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Record stok berhasil dibuat
 *       400:
 *         description: Data tidak valid atau stok sudah ada untuk produk ini
 *       500:
 *         description: Server error
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { produk_id, jumlah_stok } = body;

    if (!produk_id) {
      return NextResponse.json(
        { success: false, message: 'produk_id is required' },
        { status: 400 }
      );
    }

    const stok = await prisma.stok.create({
      data: {
        produk_id,
        jumlah_stok: jumlah_stok || 0,
      },
      include: {
        produk: true
      }
    });

    return NextResponse.json({ success: true, data: stok }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'Stok sudah ada untuk produk ini' },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
