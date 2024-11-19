import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
jsonSchemaTransform,
serializerCompiler,
validatorCompiler,
type ZodTypeProvider
} from "fastify-type-provider-zod"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(fastifyCors)

app.listen({port: 3333}).then(() => {
  console.log("HTTP server running")
})