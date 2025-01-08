import mongoose from 'mongoose'
import { config } from '../config/app.config'

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('Error connecting to database')
    process.exit(1)
  }
}
export default connectDatabase
