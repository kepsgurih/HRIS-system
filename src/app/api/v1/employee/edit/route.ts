import { isAdmin } from "@/libs/authMiddleware";
import { connectDB } from "@/libs/mongo";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    await connectDB();

    if (!isAdmin(req)) {
        return NextResponse.json(
            { message: 'Ditolak' },
            { status: 403 }
        );
    }

    const { employeeId, fullName, birthDate, isActive } = await req.json();

    if (!employeeId || (!fullName && !birthDate && isActive === undefined)) {
        return NextResponse.json(
            { message: 'ID karyawan wajib dimasukan, dan setidaknya masukan 1 field untuk mengubah' },
            { status: 403 }
        );
    }

    const user = await User.findOne({ employeeId });

    if (!user) {
        return NextResponse.json(
            {
                message: 'Karyawan tidak ditemukan'
            },
            {
                status: 404
            }
        );
    }

    if (fullName) user.fullName = fullName;

    if (birthDate) user.birthDate = birthDate;

    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    return NextResponse.json(
        {
            message: 'Karyawan telah berhasil diubah!'
        },
        {
            status: 200
        }
    )

}