import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/test-db:
 *   get:
 *     summary: Menguji koneksi database
 *     description: Menguji koneksi mentah ke tabel database PostgreSQL (Supabase)
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Berhasil terhubung ke database
 *       500:
 *         description: Gagal terhubung ke database
 */
export async function GET() {
  try {
    // Jalankan simple query untuk mengetes koneksi database
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      message: 'Berhasil terhubung ke database!',
    });
  } catch (error: unknown) {
    console.error('Database connection error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal terhubung ke database.',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
