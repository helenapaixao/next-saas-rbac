import type { FastifyInstance } from "fastify";
import { UnauthorizedError } from "../routes/_errors/unauthorized-erros";

export async function auth(app: FastifyInstance) {
  app.addHook("preHandler", async(request) => {
    request.getCurrentUserId = async () => {
      try {
        const {sub} = await request.jwtVerify<{sub: string}>()
        return sub
      } catch (err){
        throw new UnauthorizedError("Invalid auth token")
      }
    }
  })
}