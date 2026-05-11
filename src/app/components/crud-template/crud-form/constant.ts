import { type Control, type FieldValues } from 'react-hook-form'

export interface FormItemsProps<T extends FieldValues> {
    control: Control<T>
    isView: boolean
}
