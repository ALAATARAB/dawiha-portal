/**
 * Category entities based on dawiha-server swagger.yaml
 */

export interface CategoryEntity {
    id: number
    title: string
    description?: string
    created_at: string
    updated_at: string
}

export interface CategoriesEntity {
    data: CategoryEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}

export function getCategoryName(category: CategoryEntity): string {
    return category.title
}
