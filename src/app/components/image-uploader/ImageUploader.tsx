import { useNotifications } from '@toolpad/core/useNotifications'
import React from 'react'

import {
    type IImageUploaderProps,
    type UploadedMediaFieldValue,
} from './constant'
import { useUploadMediaMutation } from '../../features/media/api/mediaApiSlice'
import ImageAvatar from '../image-avatar/ImageAvatar'

interface ExtendedUploaderProps extends IImageUploaderProps {
    value?: string | null
    onChange?: (value: number | UploadedMediaFieldValue) => void
}

const ImageUploader: React.FC<ExtendedUploaderProps> = ({
    width = '80px',
    height = '80px',
    purpose = 'USER_PROFILE',
    valueMode = 'id',
    value,
    src,
    onUploadSuccess,
    onChange,
    isDisabled = false,
    borderRadius,
}) => {
    const notifications = useNotifications()
    const [uploadMedia] = useUploadMediaMutation()

    const onUpload = async (file: File) => {
        try {
            const d = await uploadMedia({ file, purpose }).unwrap()
            const uploadedId = d.id
            const mediaValue: UploadedMediaFieldValue = {
                id: uploadedId,
                url: d.url,
                title: d.title,
                type: d.type,
            }
            notifications.show('Upload successful', {
                severity: 'success',
                autoHideDuration: 3000,
            })
            onUploadSuccess?.(mediaValue)
            onChange?.(valueMode === 'media' ? mediaValue : uploadedId)
            return d
        } catch (error: any) {
            const msg =
                error?.data?.message ?? error?.message ?? 'Upload failed'
            notifications.show(msg, {
                severity: 'error',
                autoHideDuration: 3000,
            })
        }
    }
    return (
        <ImageAvatar
            upload={isDisabled ? false : true}
            width={width}
            height={height}
            onUpload={onUpload}
            src={src ?? value}
            borderRadius={borderRadius}
        />
    )
}

export default ImageUploader
