import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/detail-transaksi/{id}:
 *   get:
 *     summary: Mendapatkan detail transaksi berdasarkan ID
 *     tags: [Detail Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan detail transaksi
 *       404:
 *         description: Detail transaksi tidak ditemukan
 *       500:
 *         description: Server error
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const detail = await prisma.detail_transaksi.findUnique({
      where: { id },
      include: {
        produk: true,
        transaksi: true,
      },
    });

    if (!detail) {
      return NextResponse.json({ success: false, message: 'Detail transaksi tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: detail }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/detail-transaksi/{id}:
 *   put:
 *     summary: Memperbarui detail transaksi
 *     tags: [Detail Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jumlah:
 *                 type: integer
 *               harga:
 *                 type: integer
 *               subtotal:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Detail transaksi berhasil diperbarui
 *       404:
 *         description: Detail transaksi tidak ditemukan
 *       500:
 *         description: Server error
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { jumlah, harga, subtotal } = body;

    const detail = await prisma.detail_transaksi.update({
      where: { id },
      data: {
        jumlah,
        harga,
        subtotal,
      },
    });

    return NextResponse.json({ success: true, data: detail }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/detail-transaksi/{id}:
 *   delete:
 *     summary: Menghapus detail transaksi
 *     tags: [Detail Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Detail transaksi berhasil dihapus
 *       404:
 *         description: Detail transaksi tidak ditemukan
 *       500:
 *         description: Server error
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.detail_transaksi.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Detail transaksi berhasil dihapus' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
