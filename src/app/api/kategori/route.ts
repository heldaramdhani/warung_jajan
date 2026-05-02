import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/kategori:
 *   get:
 *     summary: Mendapatkan daftar semua kategori
 *     tags: [Kategori]
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar kategori
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nama_kategori:
 *                         type: string
 *                         example: Makanan
 *       500:
 *         description: Server error
 */
export async function GET() {
  try {
    const kategori = await prisma.kategori.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json({ success: true, data: kategori }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/kategori:
 *   post:
 *     summary: Menambahkan kategori baru
 *     tags: [Kategori]
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
 *                 example: Minuman
 *     responses:
 *       201:
 *         description: Kategori berhasil ditambahkan
 *       400:
 *         description: nama_kategori diperlukan
 *       409:
 *         description: nama_kategori sudah ada
 *       500:
 *         description: Server error
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama_kategori } = body;

    if (!nama_kategori) {
      return NextResponse.json(
        { success: false, message: 'nama_kategori is required' },
        { status: 400 }
      );
    }

    const kategori = await prisma.kategori.create({
      data: { nama_kategori },
    });

    return NextResponse.json({ success: true, data: kategori }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'nama_kategori already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
