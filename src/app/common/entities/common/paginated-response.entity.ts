import { z } from 'zod'

export const paginatedResponseEntity = <T extends z.ZodTypeAny>(
    entitySchema: T
) =>
    z.object({
        data: z.array(entitySchema),
        totalCount: z.number(),
    })
