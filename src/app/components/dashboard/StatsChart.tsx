import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const StatsCard = ({ title, value }: any) => (
    <Card sx={{ minWidth: 180 }}>
        <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
                {title}
            </Typography>
            <Typography variant="h5">{value}</Typography>
        </CardContent>
    </Card>
)

export default StatsCard
