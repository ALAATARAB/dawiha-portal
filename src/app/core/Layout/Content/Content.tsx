import { Breadcrumbs, Typography, Container, Paper } from '@mui/material'
import Box from '@mui/material/Box'
import { Outlet, useLocation } from 'react-router-dom'

const Content = () => {
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)

    return (
        <Container
            maxWidth="xl"
            disableGutters
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Paper
                elevation={1}
                square
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    backgroundColor: 'background.paper',
                    py: 1,
                    px: 2,
                    borderBottom: 0.1,
                    borderColor: 'transparent',
                    flexShrink: 0,
                }}
            >
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">Home</Typography>
                    {pathnames.map((value, index) => (
                        <Typography color="text.primary" key={index}>
                            {decodeURIComponent(value)}
                        </Typography>
                    ))}
                </Breadcrumbs>
            </Paper>

            <Box
                sx={{
                    pt: 1,
                    px: 1,
                    pb: 2,
                    flex: 1,
                    minHeight: 0,
                }}
            >
                <Outlet />
            </Box>
        </Container>
    )
}

export default Content
