import { z } from 'zod'

import { baseSearchDto } from '../common/base-search.dto'

export const selectUserDto = baseSearchDto.extend({
    name: z.string().nullable(),
})

export type SelectUserDto = z.infer<typeof selectUserDto>
