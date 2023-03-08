import mongoose from 'mongoose'

if (!process.env.MONGODB_URI)
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')

const uri = process.env.MONGODB_URI
const connection = { isConnected: false }

export async function connectMongo() {
    if (connection.isConnected) {
        console.log('Mongoose is already connected')
        return;
    } else {
        await mongoose.connect(uri)
        connection.isConnected = true
        console.log('Mongoose has successfully connected to MongoDB')
    }
}

export async function disconnectMongo() {
    if (process.env.NODE_ENV === 'production') {
        await mongoose.disconnect()
        connection.isConnected = false
    } else console.log('Not disconnected')
}
