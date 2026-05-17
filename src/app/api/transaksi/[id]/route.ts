import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/transaksi/{id}:
 *   get:
 *     summary: Mendapatkan detail transaksi berdasarkan ID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID Transaksi
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan detail transaksi
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Transaksi tidak ditemukan
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

    const transaksi = await prisma.transaksi.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            nama: true,
            email: true,
            role: true
          }
        },
        detail_transaksi: {
          include: {
            produk: true
          }
        }
      },
    });

    if (!transaksi) {
      return NextResponse.json(
        { success: false, message: 'Transaksi tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: transaksi }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
