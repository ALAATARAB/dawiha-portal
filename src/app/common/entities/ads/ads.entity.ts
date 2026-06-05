import type { MediaEntity } from '../media/media.entity'

export interface AdsEntity {
  id: number
  image_id?: number
  provider_id?: number
  priority?: number
  url?: string
  from?: string
  to?: string
  created_at: string
  updated_at: string
  image?: MediaEntity
}

export interface AdsListEntity {
  data: AdsEntity[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    from: number
    to: number
    total: number
  }
}
