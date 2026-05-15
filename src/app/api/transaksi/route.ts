import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/transaksi:
 *   get:
 *     summary: Mendapatkan daftar semua transaksi
 *     tags: [Transaksi]
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar transaksi
 *       500:
 *         description: Server error
 */
export async function GET() {
  try {
    const transaksi = await prisma.transaksi.findMany({
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
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json({ success: true, data: transaksi }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/transaksi:
 *   post:
 *     summary: Membuat transaksi baru
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - items
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               metode_pembayaran:
 *                 type: string
 *                 example: "CASH"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - produk_id
 *                     - jumlah
 *                   properties:
 *                     produk_id:
 *                       type: string
 *                       format: uuid
 *                     jumlah:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Transaksi berhasil dibuat
 *       400:
 *         description: Stok tidak mencukupi atau data tidak valid
 *       500:
 *         description: Server error
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, metode_pembayaran, items } = body;

    if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'user_id and items are required' },
        { status: 400 }
      );
    }

    // Generate unique transaction code: TR-TIMESTAMP
    const kode_transaksi = `TR-${Date.now()}`;

    // Use Prisma transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      let total = 0;
      const detail_items = [];

      for (const item of items) {
        const product = await tx.produk.findUnique({
          where: { id: item.produk_id },
          include: { stok_detail: true }
        });

        if (!product) {
          throw new Error(`Produk dengan ID ${item.produk_id} tidak ditemukan`);
        }

        if (!product.stok_detail || product.stok_detail.jumlah_stok < item.jumlah) {
          throw new Error(`Stok produk ${product.nama_produk} tidak mencukupi`);
        }

        // Update stock
        await tx.produk.update({
          where: { id: item.produk_id },
          data: { 
            stok_detail: {
              update: {
                jumlah_stok: product.stok_detail.jumlah_stok - item.jumlah
              }
            }
          }
        });

        const subtotal = product.harga * item.jumlah;
        total += subtotal;

        detail_items.push({
          jumlah: item.jumlah,
          harga_satuan: product.harga,
          subtotal: subtotal,
          produk: {
            connect: { id: item.produk_id }
          }
        });
      }

      // Create transaction
      const transaksi = await tx.transaksi.create({
        data: {
          kode_transaksi,
          user_id,
          total,
          metode_pembayaran: metode_pembayaran || 'CASH',
          detail_transaksi: {
            create: detail_items
          }
        },
        include: {
          detail_transaksi: {
            include: {
              produk: true
            }
          },
          user: {
            select: {
              nama: true,
              email: true
            }
          }
        }
      });

      return transaksi;
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    console.error('Transaction error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
