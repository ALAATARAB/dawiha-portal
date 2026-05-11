import type { PregnancyStageEntity } from '../../../common/entities/pregnancy-stage/pregnancy-stage.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box } from '@mui/material'
import { useState } from 'react'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import {
    useGetPregnancyStagesQuery,
    useCreatePregnancyStageMutation,
    useUpdatePregnancyStageMutation,
    useDeletePregnancyStageMutation,
} from '../api/pregnancyStageApiSlice'
import PregnancyStageFormItems, {
    type PregnancyStageFormValues,
} from '../components/PregnancyStageFormItems'

export const PregnancyStageListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const { data, isLoading } = useGetPregnancyStagesQuery({ page, perPage })
    const [createPregnancyStage] = useCreatePregnancyStageMutation()
    const [updatePregnancyStage] = useUpdatePregnancyStageMutation()
    const [deletePregnancyStage] = useDeletePregnancyStageMutation()

    const columns: GridColDef<PregnancyStageEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'week_number', headerName: 'Week', width: 100 },
        { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
        {
            field: 'description',
            headerName: 'Description',
            width: 300,
            valueFormatter: (value) => value || '-',
        },
        {
            field: 'medical_advice',
            headerName: 'Medical Advice',
            width: 150,
            valueFormatter: (value) => (value ? 'Available' : '-'),
        },
        {
            field: 'image_id',
            headerName: 'Image',
            width: 100,
            valueFormatter: (value) => (value ? 'Yes' : 'No'),
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return ''
                return new Date(value).toLocaleDateString()
            },
        },
    ]

    const handleCreate = async (formData: PregnancyStageFormValues) => {
        const payload: any = {
            title: formData.title,
            week_number: Number(formData.week_number),
            description: formData.description || undefined,
            image_id:
                formData.image && typeof formData.image === 'object' && 'id' in formData.image
                    ? formData.image.id
                    : undefined,
        }

        // Handle medical_advice - try to parse as JSON if it's a string
        if (formData.medical_advice) {
            try {
                payload.medical_advice = JSON.parse(formData.medical_advice)
            } catch {
                // If not valid JSON, store as plain text in an object
                payload.medical_advice = { text: formData.medical_advice }
            }
        }

        await createPregnancyStage(payload).unwrap()
    }

    const handleEdit = async (id: Tid, formData: PregnancyStageFormValues) => {
        const payload: any = {
            title: formData.title,
            week_number: Number(formData.week_number),
            description: formData.description || undefined,
            image_id:
                formData.image && typeof formData.image === 'object' && 'id' in formData.image
                    ? formData.image.id
                    : undefined,
        }

        // Handle medical_advice - try to parse as JSON if it's a string
        if (formData.medical_advice) {
            try {
                payload.medical_advice = JSON.parse(formData.medical_advice)
            } catch {
                // If not valid JSON, store as plain text in an object
                payload.medical_advice = { text: formData.medical_advice }
            }
        }

        await updatePregnancyStage({ id: id as number, data: payload }).unwrap()
    }

    const handleDelete = async (id: Tid) => {
        await deletePregnancyStage(id as number).unwrap()
    }

    // Map entity to form values
    const defaultKeyMap = {
        id: 'id',
        title: 'title',
        week_number: 'week_number',
        description: 'description',
        medical_advice: (entity: PregnancyStageEntity) => {
            if (!entity.medical_advice) return ''
            return typeof entity.medical_advice === 'string'
                ? entity.medical_advice
                : JSON.stringify(entity.medical_advice, null, 2)
        },
        image: (entity: PregnancyStageEntity) => {
            if (!entity.image_id) return null
            // If the entity has image data, use it; otherwise return a placeholder
            return entity.image_id ? { id: entity.image_id, url: '' } : null
        },
    }

    return (
        <Box sx={{ p: 3 }}>
            <CrudTemplate<PregnancyStageFormValues>
                title="Pregnancy Stages"
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
                DefaultFormItems={PregnancyStageFormItems}
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

export default PregnancyStageListPage
