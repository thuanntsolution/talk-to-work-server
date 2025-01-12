import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/asyncHandler'
import { AuthService } from './auth.service'
import { loginSchema, registerSchema } from '../../common/validators/auth.validator'
import { HTTPSTATUS } from '../../config/http.config'
import { clearAuthenticationCookies, setAuthenticationCookies } from '../../common/utils/cookie'
import { NotFoundException } from '../../common/utils/catch-error'

export class AuthController {
  private authService: AuthService
  constructor(authService: AuthService) {
    this.authService = authService
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public register = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const body = registerSchema.parse(req.body)
    const { user } = await this.authService.register(body)

    return res.status(HTTPSTATUS.CREACTED).json({
      message: 'User registered successfully',
      data: user
    })
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userAgent = req.headers['user-agent']

    const body = loginSchema.parse({ ...req.body, userAgent })

    const { user, accessToken, refreshToken } = await this.authService.login(body)
    return setAuthenticationCookies({ res, accessToken, refreshToken }).status(HTTPSTATUS.OK).json({
      message: 'User logged in successfuly',
      user
    })
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public logout = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const sessionId = req.sessionId
    if (!sessionId) {
      throw new NotFoundException('Session is invalid')
    }
    await this.authService.logout(sessionId)
    return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
      message: 'User loggout successful'
    })
  })
}
