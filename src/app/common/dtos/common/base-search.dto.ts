import { z } from 'zod'

export const baseSearchDto = z.object({
    page: z.coerce.number().int().min(1),
    perPage: z.coerce.number().int().min(1),
})

export type BaseSearchDtoType = z.infer<typeof baseSearchDto>
export type BaseSearchDto = BaseSearchDtoType
