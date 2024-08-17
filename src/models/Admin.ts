// Data Karyawan

import mongoose, { mongo } from "mongoose";

const AdminSchema = new mongoose.Schema({
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
AdminSchema.pre('save', async function (next) {
    if(this.isNew){
        const count = await mongoose.models.Admin.countDocuments();
        this.employeeId = `ADMIN${String(count+1).padStart(4,'0')}`;
        // ADMIN0001 dst...
    }
    next()
})

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin;