import Router from 'koa-router'
import { UserInfo } from '@common/types/UserTypes'
import { prisma, registerValidator, hashPassword } from '@common/index'

const _ = new Router()

/*
  * Register an account route with local strategy
  @POST /account/register

  @body name: string
  @body username: string
  @body email: string
  @body password: string
  
*/
_.post('/account/register', async (ctx, next) => {
  // If user is authenticated redirect them to /auth/user/me
  if (ctx.isAuthenticated()) {
    ctx.redirect('/auth/user/me')
    return
  }

  try {
    // Validate request body using using Joi @common/validators.ts
    const { error } = registerValidator.validate(ctx.request.body)
    // If validation failed send error message to the client
    if (error) {
      throw 'Please ensure all required fields are filled in with valid data. If issues persist, contact support.'
    }

    // Extract user info from request body
    const { name, username, email, password } = ctx.request.body as UserInfo
    // Check if user already exists
    let userExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    })

    // If user exists send error message to the client
    if (userExists) {
      throw 'User already exists!'
    }
    // Create user in the database
    await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: await hashPassword(password), // Hash password before storing it in the database
      },
    })
    // Send success message to the client
    ctx.body = {
      success: true,
      message: 'Successfully registered user',
    }
  } catch (err) {
    // If something went wrong send error message to the client
    ctx.body = {
      success: false,
      message: err,
    }
  }
  // Continue with the request
  await next()
})

export default _
