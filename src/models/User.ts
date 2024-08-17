// Data Karyawan

import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    employeeId: {
        type: String,
        unique: true
    }
});
// middleware singkat untuk pembuatan employeeID
UserSchema.pre('save', async function (next) {
    if(this.isNew){
        const count = await mongoose.models.User.countDocuments();
        this.employeeId = `EMP${String(count+1).padStart(4,'0')}`;
        // EMP0001 dst...
    }
    next()
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;