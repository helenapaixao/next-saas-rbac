import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with github',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body
      const githubOAuthURL = new URL(
        'https://github.com/login/oath/acess_token'
      )
      githubOAuthURL.searchParams.set('client_id', 'Ov23lixzeXduCQtXyJ6G')
      githubOAuthURL.searchParams.set(
        'client_secret',
        '712fb25256455abb37e8a6ff9fcced6d767fd858'
      )
      githubOAuthURL.searchParams.set("redirect_uri","http://localhost:3000/api/auth/callback")
      githubOAuthURL.searchParams.set("code", code)

      const githubAcessTokenResponse = await fetch(githubOAuthURL, {
        method: "POST",
        headers: {
          Accept: "application/json"
        }
      })

      const githubAcessTokenData = await githubAcessTokenResponse.json()
      console.log(githubAcessTokenData)
    }
  )
}
