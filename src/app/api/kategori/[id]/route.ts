import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/kategori/{id}:
 *   get:
 *     summary: Mendapatkan detail kategori berdasarkan ID
 *     tags: [Kategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategori
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan detail kategori
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Kategori tidak ditemukan
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

    const kategori = await prisma.kategori.findUnique({
      where: { id },
    });

    if (!kategori) {
      return NextResponse.json({ success: false, message: 'Kategori not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: kategori }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/kategori/{id}:
 *   put:
 *     summary: Memperbarui kategori berdasarkan ID
 *     tags: [Kategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategori
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_kategori
 *             properties:
 *               nama_kategori:
 *                 type: string
 *                 example: Snack
 *     responses:
 *       200:
 *         description: Kategori berhasil diperbarui
 *       400:
 *         description: Invalid ID atau nama_kategori diperlukan
 *       404:
 *         description: Kategori tidak ditemukan
 *       409:
 *         description: nama_kategori sudah ada
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

    const body = await request.json();
    const { nama_kategori } = body;

    if (!nama_kategori) {
      return NextResponse.json(
        { success: false, message: 'nama_kategori is required' },
        { status: 400 }
      );
    }

    const kategori = await prisma.kategori.update({
      where: { id },
      data: { nama_kategori },
    });

    return NextResponse.json({ success: true, data: kategori }, { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, message: 'Kategori not found' }, { status: 404 });
    }
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'nama_kategori already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/kategori/{id}:
 *   delete:
 *     summary: Menghapus kategori berdasarkan ID
 *     tags: [Kategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategori
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Kategori tidak ditemukan
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

    await prisma.kategori.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: 'Kategori deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, message: 'Kategori not found' }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
