import { ErrorCode } from '../../common/enums/error-code.enum'
import { LoginDto, RegisterDto } from '../../common/interfaces/auth.interface'
import { BadRequestException } from '../../common/utils/catch-error'
import { refreshTokenSignOptions, signJwtToken } from '../../common/utils/jwt'
import SessionModel from '../../databases/models/session.model'
import UserModel from '../../databases/models/user.model'

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { email, name, password } = registerData
    const existingUser = await UserModel.exists({ email })

    if (existingUser) {
      throw new BadRequestException('User already exists with this email', ErrorCode.AUTH_EMAIL_ALREADY_EXISTS)
    }

    const newUser = await UserModel.create({
      name,
      email,
      password
    })

    return {
      user: newUser
    }
  }

  public async login(loginData: LoginDto) {
    const { email, password, userAgent } = loginData

    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new BadRequestException('Invalid email or password privided', ErrorCode.AUTH_USER_NOT_FOUND)
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password provided', ErrorCode.AUTH_USER_NOT_FOUND)
    }

    const session = await SessionModel.create({
      userId: user._id,
      userAgent
    })

    const accessToken = signJwtToken({
      userId: user._id,
      sessionId: session._id
    })
    const refreshToken = signJwtToken(
      {
        sessionId: session._id
      },
      refreshTokenSignOptions
    )

    return {
      user,
      accessToken,
      refreshToken
    }
  }
  public async logout(sessionId: string) {
    return await SessionModel.findByIdAndDelete(sessionId)
  }
}
