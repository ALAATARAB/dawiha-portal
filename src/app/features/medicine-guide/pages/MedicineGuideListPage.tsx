import type { MedicineGuideEntity } from '../../../common/entities/medicine-guide/medicine-guide.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box } from '@mui/material'
import { useState } from 'react'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import {
    useGetMedicineGuidesQuery,
    useCreateMedicineGuideMutation,
    useUpdateMedicineGuideMutation,
    useDeleteMedicineGuideMutation,
} from '../api/medicineGuideApiSlice'
import MedicineGuideFormItems, {
    type MedicineGuideFormValues,
} from '../components/MedicineGuideFormItems'


export const MedicineGuideListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const { data, isLoading } = useGetMedicineGuidesQuery({ page, perPage })
    const [createMedicineGuide] = useCreateMedicineGuideMutation()
    const [updateMedicineGuide] = useUpdateMedicineGuideMutation()
    const [deleteMedicineGuide] = useDeleteMedicineGuideMutation()

    const columns: GridColDef<MedicineGuideEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 250 },
        {
            field: 'description',
            headerName: 'Description',
            width: 300,
            valueFormatter: (value) => value || '-',
        },
        {
            field: 'uses',
            headerName: 'Uses',
            width: 200,
            valueFormatter: (value) => value ? 'Available' : '-',
        },
        {
            field: 'how_to_use',
            headerName: 'How to Use',
            width: 200,
            valueFormatter: (value) => value ? 'Available' : '-',
        },
        {
            field: 'warnings',
            headerName: 'Warnings',
            width: 150,
            valueFormatter: (value) => value ? 'Available' : '-',
        },
        {
            field: 'main_info',
            headerName: 'Main Info',
            width: 150,
            valueFormatter: (value) => value ? 'Available' : '-',
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return ''
                return new Date(value).toLocaleString()
            },
        },
    ]

    const handleCreate = async (formData: MedicineGuideFormValues) => {
        const payload: any = {
            title: formData.title,
            description: formData.description || undefined,
            uses: formData.uses || undefined,
            warnings: formData.warnings || undefined,
            how_to_use: formData.how_to_use || undefined,
            main_info: formData.main_info || undefined,
            image_id:
                formData.image && typeof formData.image === 'object' && 'id' in formData.image
                    ? formData.image.id
                    : undefined,
        }

        await createMedicineGuide(payload).unwrap()
    }

    const handleEdit = async (id: Tid, formData: MedicineGuideFormValues) => {
        const payload: any = {
            title: formData.title,
            description: formData.description || undefined,
            uses: formData.uses || undefined,
            warnings: formData.warnings || undefined,
            how_to_use: formData.how_to_use || undefined,
            main_info: formData.main_info || undefined,
            image_id:
                formData.image && typeof formData.image === 'object' && 'id' in formData.image
                    ? formData.image.id
                    : undefined,
        }

        await updateMedicineGuide({ id: id as number, data: payload }).unwrap()
    }

    const handleDelete = async (id: Tid) => {
        await deleteMedicineGuide(id as number).unwrap()
    }

    // Map entity to form values
    const defaultKeyMap = {
        id: 'id',
        title: 'title',
        description: 'description',
        uses: 'uses',
        warnings: 'warnings',
        how_to_use: 'how_to_use',
        main_info: 'main_info',
        image: (entity: MedicineGuideEntity) => {
            if (!entity.image_id) return null
            return entity.image_id ? { id: entity.image_id, url: '' } : null
        },
    }

    return (
        <Box sx={{ p: 3 }}>
            <CrudTemplate<MedicineGuideFormValues>
                title="Medicine Guides"
                columns={columns}
                data={data?.data || []}
                totalCount={data?.meta.total || 0}
                isLoading={isLoading}
                enableCreate
                enableEdit
                enableView
                enableDelete
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                DefaultFormItems={MedicineGuideFormItems}
                defaultKeyMap={defaultKeyMap}
                pagination={{
                    page,
                    pageSize: perPage,
                }}
                pageSizeOptions={[10, 25, 50, 100]}
            />
        </Box>
    )
}

export default MedicineGuideListPage
