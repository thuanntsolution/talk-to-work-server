import { UserDocument } from '../databases/models/user.model'
import { Request } from 'express'
declare global {
  namespace Express {
    interface Request {
      sessionId?: string
    }
  }
}
