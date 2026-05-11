import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import IconButton from '@mui/material/IconButton'
import { type GridColDef } from '@mui/x-data-grid'

export const getTableColumns = <TData,>(
    columns: GridColDef[],
    enableEdit?: boolean,
    enableView?: boolean,
    enableDelete?: boolean,
    onEdit?: (row: TData) => void,
    onView?: (row: TData) => void,
    onDelete?: (row: TData) => void,
    renderRowActions?: (row: TData) => React.ReactNode
): GridColDef[] => {
    const enhanced: GridColDef[] = columns.map((column) => ({
        ...column,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        resizable: false,
        hideable: true,
        headerClassName: 'table-header',
        cellClassName: 'table-cell',
    }))

    if (enableEdit || enableView || enableDelete || renderRowActions) {
        const builtinActionsCount =
            (enableView ? 1 : 0) + (enableDelete ? 1 : 0) + (enableEdit ? 1 : 0)
        enhanced.push({
            field: '__actions__',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            resizable: false,
            align: 'center',
            headerAlign: 'center',
            minWidth: 70,
            width: Math.max(120, builtinActionsCount * 50 + (renderRowActions ? 180 : 0)),
            renderCell: (params) => (
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    {enableView && (
                        <IconButton onClick={() => onView?.(params.row)}>
                            <VisibilityIcon fontSize="small" color="action" />
                        </IconButton>
                    )}
                    {enableEdit && (
                        <IconButton
                            onClick={() => onEdit?.(params.row)}
                            color="info"
                        >
                            <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                    )}
                    {enableDelete && (
                        <IconButton
                            onClick={() => onDelete?.(params.row)}
                            color="error"
                        >
                            <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                    )}
                    {renderRowActions?.(params.row)}
                </div>
            ),
        })
    }

    return enhanced
}
