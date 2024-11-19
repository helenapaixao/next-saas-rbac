import { z } from 'zod'
export const organizationSchema = z.object({
  __typename: z.literal("Project").default("Project"),
  id: z.string(),
  ownerId: z.string(),
})
export type User = z.infer<typeof organizationSchema>