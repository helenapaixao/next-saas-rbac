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
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Next.js Saas",
      description: "full-stack Saas app with multi-tenant & RBAC",
      version: "1.0.0"
    },
    servers: []
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


app.listen({port: 3333}).then(() => {
  console.log("HTTP server running")
})