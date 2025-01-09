import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncControllerType = (req: Request, response: Response, next: NextFunction) => Promise<any>

export const asyncHandler = (controller: AsyncControllerType): AsyncControllerType => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
