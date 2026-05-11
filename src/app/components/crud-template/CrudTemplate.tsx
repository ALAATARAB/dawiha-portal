import { Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type ICrudTemplateProps } from './constant'
import CrudForm from './crud-form/CrudForm'
import { getChangedValues, getCreateValues } from './crud-form/util'
import CrudTable from './crud-table/CrudTable'

const CrudTemplate = <TData extends { id?: number | string }>({
    columns,
    data = [],
    enableEdit,
    enableView,
    enableDelete,
    onEdit,
    onEditNavigate,
    onViewNavigate,
    // onView,
    onDelete,
    onCreate,
    onCreateNavigate,
    height,
    width,
    pagination,
    pageSizeOptions,
    enableSelect,
    border,
    enableCreate,
    DefaultFormItems,
    CreateItems,
    UpdateItems,
    ViewItems,
    defaultKeyMap = {},
    createKeyMap = {},
    updateKeyMap = {},
    getCreateInitialData,
    totalCount = 0,
    isLoading = false,
    extraButtons = <></>,
    extraFilters = <></>,
    isViewModePage = false,
    viewUrl = '',
    title = 'title',
    showTableTitle = true,
    isPatchMethod = true,
    renderRowActions,
}: ICrudTemplateProps<TData>) => {
    const navigate = useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [mode, setMode] = useState<'create' | 'view' | 'edit' | null>(null)
    const [selectedRow, setSelectedRow] = useState<TData | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const handleEdit = (row: TData) => {
        if (onEditNavigate) {
            onEditNavigate(row)
            return
        }
        setSelectedRow(row)
        setMode('edit')
        setDrawerOpen(true)
    }

    const handleView = (row: TData) => {
        if (onViewNavigate) {
            onViewNavigate(row)
            return
        }
        if (isViewModePage) {
            navigate(`${viewUrl}/${row.id}`)
        } else {
            setSelectedRow(row)
            setMode('view')
            setDrawerOpen(true)
        }
    }

    const handleDelete = (row: TData) => {
        setSelectedRow(row)
        setDeleteConfirm(true)
    }

    const confirmDelete = () => {
        if (onDelete && selectedRow) {
            onDelete(selectedRow?.id as number)
        }
        setDeleteConfirm(false)
        setSelectedRow(null)
    }

    const handleCreateClick = () => {
        if (onCreateNavigate) {
            onCreateNavigate()
            return
        }
        setSelectedRow(null)
        setMode('create')
        setDrawerOpen(true)
    }

    const handleFormSubmit = (formData: TData) => {
        if (mode === 'create') {
            const createData = getCreateValues(formData, {
                ...defaultKeyMap,
                ...createKeyMap,
            })
            onCreate && onCreate(createData as TData)
        } else if (mode === 'edit') {
            const updateData = getChangedValues(
                selectedRow as Record<string, any>,
                formData,
                { ...defaultKeyMap, ...updateKeyMap },
                isPatchMethod
            )
            onEdit && onEdit(selectedRow?.id as number, updateData as TData)
        }
        setDrawerOpen(false)
    }

    const handleCancel = () => setDrawerOpen(false)

    return (
        <>
            <Paper
                style={{
                    background: 'var(--mui-palette-DataGrid-bg)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    pt={2}
                    height="100%"
                    sx={{
                        flex: 1,
                        minHeight: 0,
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        flexWrap={'wrap'}
                        alignItems="center"
                        px={2}
                        pb={2}
                    >
                        {showTableTitle && title != 'title' && (
                            <Typography
                                variant="h6"
                                component="h6"
                                fontWeight="bold"
                            >
                                {title}
                            </Typography>
                        )}

                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            gap={2}
                            flexWrap={'wrap'}
                        >
                            {extraFilters}
                            {extraButtons}
                            {enableCreate && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateClick}
                                >
                                    Create New
                                </Button>
                            )}
                        </Box>
                    </Box>
                    <CrudTable
                        columns={columns}
                        isLoading={isLoading}
                        data={data}
                        height={height}
                        width={width}
                        pageSizeOptions={pageSizeOptions}
                        pagination={pagination}
                        enableSelect={enableSelect}
                        border={border}
                        enableEdit={enableEdit}
                        enableView={enableView}
                        enableDelete={enableDelete}
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                        renderRowActions={renderRowActions}
                        totalCount={totalCount}
                    />
                </Box>
            </Paper>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleCancel}
                style={{ zIndex: 100 }}
            >
                <Box
                    sx={{
                        width: {
                            xs: '100vw',
                            sm: '50vw',
                        },
                        height: '100vh',
                        p: 3,
                    }}
                >
                    <Typography
                        variant="h5"
                        mb={2}
                        style={{ marginTop: '50px' }}
                    >
                        {mode === 'create' && 'Create New Item'}
                        {mode === 'edit' && 'Edit Item'}
                        {mode === 'view' && 'View Item'}
                    </Typography>
                    {((mode == 'view' && (ViewItems ?? DefaultFormItems)) ||
                        (mode == 'create' &&
                            (CreateItems ?? DefaultFormItems)) ||
                        (mode == 'edit' &&
                            (UpdateItems ?? DefaultFormItems))) && (
                        <CrudForm<TData>
                            mode={mode ?? 'view'}
                            initialData={
                                mode === 'create'
                                    ? (getCreateInitialData?.() ?? undefined)
                                    : selectedRow ?? undefined
                            }
                            onSubmit={handleFormSubmit}
                            onCancel={() => setDrawerOpen(false)}
                            isLoading={isLoading}
                        >
                            {(form, isView) => (
                                <>
                                    {mode === 'view' && ViewItems && (
                                        <ViewItems
                                            control={form.control}
                                            isView={isView}
                                        />
                                    )}
                                    {mode === 'create' && CreateItems && (
                                        <CreateItems
                                            control={form.control}
                                            isView={isView}
                                        />
                                    )}
                                    {mode === 'edit' && UpdateItems && (
                                        <UpdateItems
                                            control={form.control}
                                            isView={isView}
                                        />
                                    )}
                                    {((mode == 'view' &&
                                        !ViewItems &&
                                        DefaultFormItems) ||
                                        (mode == 'create' &&
                                            !CreateItems &&
                                            DefaultFormItems) ||
                                        (mode == 'edit' &&
                                            !UpdateItems &&
                                            DefaultFormItems)) && (
                                        <DefaultFormItems
                                            control={form.control}
                                            isView={isView}
                                        />
                                    )}
                                </>
                            )}
                        </CrudForm>
                    )}
                </Box>
            </Drawer>

            <Dialog
                open={deleteConfirm}
                onClose={() => setDeleteConfirm(false)}
            >
                <Box sx={{ p: 4 }}>
                    <Typography>Are you sure you want to delete?</Typography>
                    <Box mt={4} display="flex" justifyContent="flex-end">
                        <Button
                            onClick={() => setDeleteConfirm(false)}
                            sx={{ mr: 2 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            color="error"
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default CrudTemplate
