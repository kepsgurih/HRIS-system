
import { connectDB } from "@/libs/mongo";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import User from "@/models/User";
import Admin from "@/models/Admin";
// Todo: delete
export async function GET() {
    return NextResponse.json({ message: 'Akses ditolak' }, { status: 403 });
}

// Todo Post
export async function POST(req: Request) {
    await connectDB();

    const { username, password, fullName, birthDate, type } = await req.json();

    if (!username || !password || !fullName || !birthDate) {
        // untuk sementara
        // Todo : cek 1 - 1
        return NextResponse.json({ message: 'Field kosong' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let newUser

    if (type === 'admin') {
        newUser = new Admin({
            username,
            password: hashedPassword,
            fullName,
            birthDate
        });
    } else {
        newUser = new User({
            username,
            password: hashedPassword,
            fullName,
            birthDate
        });
    }

    await newUser.save();

    return NextResponse.json({ message: 'User berhasil dibuat' }, { status: 200 })
}