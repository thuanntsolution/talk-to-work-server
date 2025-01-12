import { CookieOptions, Response } from 'express'
import { config } from '../../config/app.config'
import { calculateExpirationDate } from './date-time'

type CookiePayloadType = {
  res: Response
  accessToken: string
  refreshToken: string
}
export const REFRESH_PATH = `${config.BASE_PATH}/auth/refresh`

const defaults: CookieOptions = {
  httpOnly: true
}

export const getRefreshTokenCookieOptions = (): CookieOptions => {
  const expiresIn = config.JWT.REFRESH_EXPIRES_IN
  const expires = calculateExpirationDate(expiresIn)
  return {
    ...defaults,
    expires,
    path: REFRESH_PATH
  }
}
export const getAccesstokenCookieOptions = (): CookieOptions => {
  const expiresIn = config.JWT.EXPIRES_IN
  const expires = calculateExpirationDate(expiresIn)
  return {
    ...defaults,
    expires,
    path: '/'
  }
}
export const setAuthenticationCookies = ({ res, accessToken, refreshToken }: CookiePayloadType) => {
  return res
    .cookie('accessToken', accessToken, getAccesstokenCookieOptions())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions())
}
export const clearAuthenticationCookies = (res: Response) => {
  return res.clearCookie('accessToken').clearCookie('refreshToken', { path: REFRESH_PATH })
}
