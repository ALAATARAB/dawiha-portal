import type { Tid } from '../../common/@types/global'
import type { CreateCategoryDto } from '../../common/dtos/category/create-category.dto'
import type { UpdateCategoryDto } from '../../common/dtos/category/update-category.dto'

import { useNotifications } from '@toolpad/core/useNotifications'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import {
    CATEGORIES_PAGE_TITLE,
    categoryDefaultKeyMapper,
    categoryTableColumns,
    getCategoryFormDefaults,
    type CategoryFormValues,
} from './constant'
import CategoryFormItems from './form/CategoryFormItems'
import { usePaginatedQuery } from '../../common/custom-hooks/usePaginatedQuery'
import { type SearchCategoryDto } from '../../common/dtos/category/search-category.dto'
import { type CategoriesEntity } from '../../common/entities/category/category.entity'
import { isNotEmpty } from '../../common/utils/is-object-empty'
import CrudTemplate from '../../components/crud-template/CrudTemplate'
import { SimpleSearch } from '../../components/simple-search/SimpleSearch'
import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from '../../features/category/api/categoryApiSlice'

export default function Categories() {
    const [searchParams] = useSearchParams()
    const notifications = useNotifications()
    const { t } = useTranslation()
    const { data: categories, isFetching } = usePaginatedQuery<
        CategoriesEntity,
        SearchCategoryDto
    >(useGetCategoriesQuery, {
        search: searchParams.get('name'),
    } as SearchCategoryDto)
    const [createCategory, { isLoading: isCreating }] =
        useCreateCategoryMutation()
    const [updateCategory, { isLoading: isUpdating }] =
        useUpdateCategoryMutation()
    const [deleteCategory, { isLoading: isDeleting }] =
        useDeleteCategoryMutation()

    const onDelete = async (id: Tid) => {
        // const category = categories?.data?.find((c) => c.id === id)
        // New API doesn't have childs field, so we can't check for children
        // const hasChildren =
        //     category?.childs != null &&
        //     Array.isArray(category.childs) &&
        //     category.childs.length > 0
        // if (hasChildren) {
        //     notifications.show(
        //         t(
        //             'Cannot delete category that has children. Remove or reassign children first.'
        //         ),
        //         { severity: 'error', autoHideDuration: 5000 }
        //     )
        //     return
        // }
        try {
            await deleteCategory(id as number).unwrap()
            notifications.show(t('SUCCESSFUL_UPDATE_MESSAGE'), {
                severity: 'success',
                autoHideDuration: 3000,
            })
        } catch (error: any) {
            notifications.show(error?.data?.message, {
                severity: 'error',
                autoHideDuration: 3000,
            })
        }
    }

    const onCreate = async (formData: Record<string, unknown>) => {
        try {
            const title = String(formData.title ?? '').trim()
            if (!title) {
                notifications.show(t('Title is required'), {
                    severity: 'error',
                    autoHideDuration: 3000,
                })
                return
            }
            const description = String(formData.description ?? '').trim()
            const data: CreateCategoryDto = {
                title,
                ...(description !== '' ? { description } : {}),
            }
            await createCategory(data).unwrap()
            notifications.show(t('SUCCESSFUL_UPDATE_MESSAGE'), {
                severity: 'success',
                autoHideDuration: 3000,
            })
        } catch (error: any) {
            notifications.show(error?.data?.message, {
                severity: 'error',
                autoHideDuration: 3000,
            })
        }
    }

    const onEdit = async (id: Tid, formData: Record<string, unknown>) => {
        try {
            if (!isNotEmpty(formData)) {
                return
            }
            const data: Partial<UpdateCategoryDto> = {}

            if (formData.title !== undefined) {
                data.title = String(formData.title ?? '').trim()
            }
            if (formData.description !== undefined) {
                data.description = String(formData.description ?? '').trim()
            }

            if (!isNotEmpty(data)) {
                return
            }

            await updateCategory({
                id: id as number,
                data: data as UpdateCategoryDto,
            }).unwrap()
            notifications.show(t('SUCCESSFUL_UPDATE_MESSAGE'), {
                severity: 'success',
                autoHideDuration: 3000,
            })
        } catch (error: any) {
            notifications.show(error?.data?.message, {
                severity: 'error',
                autoHideDuration: 3000,
            })
        }
    }
    return (
        <>
            <CrudTemplate<CategoryFormValues>
                columns={categoryTableColumns}
                data={
                    categories?.data?.map((c) => getCategoryFormDefaults(c)) ??
                    []
                }
                totalCount={categories?.meta?.total}
                isLoading={isFetching || isUpdating || isCreating || isDeleting}
                enableEdit={true}
                enableView={true}
                enableCreate={true}
                enableDelete={true}
                isPatchMethod={false}
                pageSizeOptions={[10, 25, 50, 100]}
                onCreate={onCreate}
                onEdit={onEdit}
                onDelete={onDelete}
                isViewModePage={false}
                defaultKeyMap={categoryDefaultKeyMapper}
                getCreateInitialData={() =>
                    ({
                        id: 0,
                        title: '',
                        description: '',
                    }) as CategoryFormValues
                }
                extraFilters={
                    <>
                        <SimpleSearch searchParamKeyName="name" />
                    </>
                }
                DefaultFormItems={CategoryFormItems}
                title={CATEGORIES_PAGE_TITLE}
            />
        </>
    )
}
