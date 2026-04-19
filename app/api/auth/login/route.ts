import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password tidak boleh kosong" },
        { status: 400 },
      );
    }

    // Simulasi delay database ringan agar loading terasa statenya
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock sistem autentikasi statik (hardcoded credentials)
    if (email === "admin@gmail.com" && password === "admin123") {
      return NextResponse.json(
        {
          success: true,
          message: "Login berhasil!",
          data: {
            id: 1,
            name: "Siti Aminah",
            email: "admin@gmail.com",
            role: "Administrator Utama",
          },
        },
        { status: 200 },
      );
    }

    // Jika gagal (email/password tidak cocok)
    return NextResponse.json(
      {
        success: false,
        message:
          "Kombinasi email dan password salah. (Gunakan admin@gmail.com / admin123)",
      },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pembacaan sistem." },
      { status: 500 },
    );
  }
}
