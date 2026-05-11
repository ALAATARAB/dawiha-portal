import type { SearchUserDto } from '../../common/dtos/user/search-user.dto'
import type { AdminUserEntity, AdminUsersEntity } from '../../common/entities/user/user.entity'

import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { userDefaultKeyMapper, userTableColumns } from './constant'
import { usePaginatedQuery } from '../../common/custom-hooks/usePaginatedQuery'
import CrudTemplate from '../../components/crud-template/CrudTemplate'
import { SimpleSearch } from '../../components/simple-search/SimpleSearch'
import { useGetUsersQuery } from '../../features/user/api/userApiSlice'

export default function Users() {
    const [searchParams] = useSearchParams()
    const { t } = useTranslation()
    const { data: users, isFetching } = usePaginatedQuery<
        AdminUsersEntity,
        SearchUserDto
    >(useGetUsersQuery, {
        name: searchParams.get('name') ?? undefined,
    } as SearchUserDto)

    return (
        <>
            <CrudTemplate<AdminUserEntity>
                columns={userTableColumns}
                data={users?.data}
                totalCount={users?.totalCount}
                isLoading={isFetching}
                enableEdit={false}
                enableView={true}
                pageSizeOptions={[10, 25, 50, 100]}
                isViewModePage={true}
                viewUrl="/users"
                defaultKeyMap={userDefaultKeyMapper}
                extraFilters={
                    <>
                        <SimpleSearch searchParamKeyName="name" />
                    </>
                }
                title={t('CLIENTS_PAGE_TITLE', { defaultValue: 'Users' })}
            />
        </>
    )
}
