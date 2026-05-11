export interface IImageAvatarProps {
    username?: string
    src?: string | null
    upload?: boolean
    onUpload?: (file: File) => void
    width?: string
    height?: string
    borderRadius?: string
}
