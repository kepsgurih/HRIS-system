import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/libs/mongo';
import User from '@/models/User';
import Admin from '@/models/Admin';

export async function POST(req: Request) {
    await connectDB();

    const { username, password, type } = await req.json();

    let user = type === 'admin' ? await Admin.findOne({ username }) : await User.findOne({ username });

    if (!user) {
        return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 400 });
    }

    if (!user.isActive) {
        return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return NextResponse.json({ message: 'Masukan kembali password Anda!' }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, fullName: user.fullName, status: user.isActive, type }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    return NextResponse.json({ token }, { status: 200 });
}