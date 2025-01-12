import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
import { SessionDocument } from '../../databases/models/session.model'
import { UserDocument } from '../../databases/models/user.model'
import { config } from '../../config/app.config'

export type AccessTPayload = {
  userId: UserDocument['_id']
  sessionId: SessionDocument['_id']
}
export type RefreshTPayload = {
  sessionId: SessionDocument['_id']
}

type SignOtpsAndSecret = SignOptions & {
  secret: string
}
const defaults: SignOptions = {
  audience: 'user'
}
export const accessTokenSignOptions: SignOtpsAndSecret = {
  expiresIn: config.JWT.EXPIRES_IN,
  secret: config.JWT.SECRET
}
export const refreshTokenSignOptions: SignOtpsAndSecret = {
  expiresIn: config.JWT.REFRESH_EXPIRES_IN,
  secret: config.JWT.REFRESH_SECRET
}

export const signJwtToken = (payload: AccessTPayload | RefreshTPayload, options?: SignOtpsAndSecret) => {
  const { secret, ...opts } = options || accessTokenSignOptions
  return jwt.sign(payload, secret, {
    ...defaults,
    ...opts
  })
}

export const verifyJwtToken = <TPayload extends object = AccessTPayload>(
  token: string,
  options: VerifyOptions & { secret: string }
) => {
  try {
    const { secret = config.JWT.SECRET, ...opts } = options || {}

    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...opts
    }) as TPayload

    return { payload }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}
