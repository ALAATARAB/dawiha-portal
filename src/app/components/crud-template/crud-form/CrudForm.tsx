import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import React from 'react'
import { useForm } from 'react-hook-form'

export interface CrudFormProps<T> {
    mode: 'create' | 'edit' | 'view'
    initialData?: T
    onSubmit: (data: T) => void
    onCancel: () => void
    children: (form: any, isView: boolean) => React.ReactNode
    isLoading?: boolean
}
function CrudForm<T>({
    mode,
    initialData,
    onSubmit,
    onCancel,
    children,
    isLoading = false,
}: CrudFormProps<T>) {
    const { control, handleSubmit, reset, formState } = useForm<any>({
        defaultValues: initialData,
    })

    React.useEffect(() => {
        reset(initialData)
    }, [initialData, reset])

    const isView = mode === 'view'

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '10px 5px' }}>
            {children({ control, handleSubmit, reset, formState }, isView)}

            {!isView && (
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    mt={2}
                >
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        {mode === 'create' ? 'Create' : 'Save'}
                    </Button>
                </Stack>
            )}
            {isView && (
                <Stack direction="row" justifyContent="flex-end" mt={2}>
                    <Button onClick={onCancel}>Close</Button>
                </Stack>
            )}
        </form>
    )
}

export default CrudForm
