import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from '@fastify/cors'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'


import { createAccount } from "./routes/auth/create-account";
import { authenticateWithPassword } from "./routes/auth/authenticate-with-password";
import { resetPassword } from "./routes/auth/reset-password";
import { requestPasswordRecover } from "./routes/auth/request-password-recover";

import fastifySwaggerUi from "@fastify/swagger-ui";
import { getProfile } from "./routes/auth/get-profile";
import { errorHandler } from "./error-handler";
import { authenticateWithGithub } from "./routes/auth/authenticate-with-github";
import { env } from "@saas/env";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Next.js Saas",
      description: "full-stack Saas app with multi-tenant & RBAC",
      version: "1.0.0"
    },
    securityDefinitions: {
      Authorization: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "JWT obtained from authentication route"
      }
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

app.register(fastifyJwt, {
  secret: "my-jwt-secret"
})

app.register(fastifyCors)
app.register(createAccount)
app.register(authenticateWithPassword);
app.register(getProfile);
app.register(resetPassword);
app.register(requestPasswordRecover)
app.register(authenticateWithGithub)


app.listen({port: env.SERVER_PORT}).then(() => {
  console.log("HTTP server running")
})