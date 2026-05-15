import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/stok/{id}:
 *   get:
 *     summary: Mendapatkan detail stok berdasarkan ID
 *     tags: [Stok]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan detail stok
 *       404:
 *         description: Stok tidak ditemukan
 *   patch:
 *     summary: Memperbarui jumlah stok
 *     tags: [Stok]
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
 *               jumlah_stok:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Stok berhasil diperbarui
 *   delete:
 *     summary: Menghapus record stok
 *     tags: [Stok]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Stok berhasil dihapus
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const stok = await prisma.stok.findUnique({
      where: { id },
      include: {
        produk: true
      }
    });

    if (!stok) {
      return NextResponse.json({ success: false, message: 'Stok tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: stok }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const { jumlah_stok } = body;

    const stok = await prisma.stok.update({
      where: { id },
      data: {
        jumlah_stok,
        updated_at: new Date()
      },
      include: {
        produk: true
      }
    });

    return NextResponse.json({ success: true, data: stok }, { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, message: 'Stok tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await prisma.stok.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Stok berhasil dihapus' }, { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, message: 'Stok tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
