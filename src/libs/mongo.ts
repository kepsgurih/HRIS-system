import mongoose, { ConnectOptions } from "mongoose"

export const connectDB = async () => {
    // Check
    if(mongoose.connection.readyState >= 1) return;

    await mongoose.connect(process.env.MONGODB_URI || '' , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions);

    // js
    // await mongoose.connect(process.env.MONGODB_URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })


}