import mongoose, { Schema } from 'mongoose'
import { VerificationEnum } from '../../common/enums/verification-code.enum'
import { generateUniqueCode } from '../../common/utils/uuid'

export interface VerificationDocument {
  userId: mongoose.Types.ObjectId
  code: string
  type: VerificationEnum
  expiresAt: Date
  createdAt: Date
}

const verificationSchema = new Schema<VerificationDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  code: {
    type: String,
    unique: true,
    required: true,
    default: generateUniqueCode
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  expiresAt: {
    type: Date,
    required: true
  }
})

const VerificationModel = mongoose.model<VerificationDocument>('Verification', verificationSchema, 'verification_codes')
export default VerificationModel
