import type { AdsEntity } from '../../../common/entities/ads/ads.entity'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    CircularProgress,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useCreateAdMutation, useUpdateAdMutation } from '../api/adsApiSlice'
import { MediaUploadField } from '../../../components/media/MediaUploadField'
import { ProviderSelect } from '../../../components/select-provider/ProviderSelect'

interface AdsFormModalProps {
    open: boolean
    onClose: () => void
    ad?: AdsEntity | null
}

export const AdsFormModal = ({ open, onClose, ad }: AdsFormModalProps) => {
    const [formData, setFormData] = useState({
        image_id: undefined as number | undefined,
        provider_id: null as number | null,
        priority: 1,
        url: '',
        from: '',
        to: '',
    })

    const [createAd, { isLoading: isCreating }] = useCreateAdMutation()
    const [updateAd, { isLoading: isUpdating }] = useUpdateAdMutation()

    useEffect(() => {
        if (ad) {
            setFormData({
                image_id: ad.image_id || undefined,
                provider_id: ad.provider_id || null,
                priority: ad.priority || 1,
                url: ad.url || '',
                from: ad.from ? new Date(ad.from).toISOString().slice(0, 16) : '',
                to: ad.to ? new Date(ad.to).toISOString().slice(0, 16) : '',
            })
        } else {
            setFormData({
                image_id: undefined,
                provider_id: null,
                priority: 1,
                url: '',
                from: '',
                to: '',
            })
        }
    }, [ad, open])

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async () => {
        try {
            const submitData: any = {
                priority: formData.priority,
            }

            if (formData.image_id !== undefined) submitData.image_id = formData.image_id
            if (formData.provider_id !== null && formData.provider_id !== undefined) {
                submitData.provider_id = formData.provider_id
            }
            if (formData.url) submitData.url = formData.url
            if (formData.from) submitData.from = new Date(formData.from).toISOString()
            if (formData.to) submitData.to = new Date(formData.to).toISOString()

            if (ad) {
                await updateAd({ id: ad.id, data: submitData }).unwrap()
            } else {
                await createAd(submitData).unwrap()
            }
            onClose()
        } catch (error) {
            console.error('Failed to save ad:', error)
            alert('Failed to save ad. Please check the console for details.')
        }
    }

    const isLoading = isCreating || isUpdating

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{ad ? 'Edit Ad' : 'Create Ad'}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <MediaUploadField
                        value={formData.image_id}
                        onChange={(imageId) => handleChange('image_id', imageId)}
                        label="Ad Image"
                    />

                    <TextField
                        label="Priority"
                        type="number"
                        value={formData.priority}
                        onChange={(e) =>
                            handleChange('priority', parseInt(e.target.value) || 1)
                        }
                        required
                        fullWidth
                        inputProps={{ min: 1 }}
                    />

                    <ProviderSelect
                        value={formData.provider_id}
                        onChange={(providerId) => handleChange('provider_id', providerId)}
                        label="Provider (Optional)"
                        fullWidth
                    />

                    <TextField
                        label="URL (Optional)"
                        value={formData.url}
                        onChange={(e) => handleChange('url', e.target.value)}
                        fullWidth
                        placeholder="https://example.com"
                    />

                    <TextField
                        label="Start Date (Optional)"
                        type="datetime-local"
                        value={formData.from}
                        onChange={(e) => handleChange('from', e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="End Date (Optional)"
                        type="datetime-local"
                        value={formData.to}
                        onChange={(e) => handleChange('to', e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isLoading}
                    startIcon={isLoading && <CircularProgress size={20} />}
                >
                    {ad ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
