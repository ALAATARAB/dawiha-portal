function stringToColor(string: string) {
    let hash = 0
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }

    return color
}

export const getStringToAvatar = (username?: string) => {
    const name = username ?? 'Upload'
    const names = name.split(' ')
    const initials =
        names.length > 1 ? `${names[0][0]}${names[1][0]}` : `${names[0][0]}`
    return {
        sx: {
            bgcolor: username ? stringToColor(name) : '',
        },
        children: username ? initials.toUpperCase() : '',
    }
}
