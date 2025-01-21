import { auth } from "@/http/middleware/auth";
import { prisma } from "@/lib/prisma";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).get("/profile", {
    schema: {
      tags: ["auth"],
      summary: "Get authenticated user profile ",
      security: [{
        bearerAuth: []
      }],
      response: {
        200: z.object({
          user: z.object({
            id: z.string().uuid(),
            name: z.string().nullable(),
            email: z.string().email(),
            avatarUrl: z.string().url().nullable(),
          })
        })
      },
 
    },
  }, async(request, reply) => {
    const userId = await request.getCurrentUserId()
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true
      },
      where: {
        id: userId
      }, 
    })

    if(!user) {
      throw new Error("User not found")
    }
    return reply.send({user})
  }, )}