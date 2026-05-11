import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const data = [
    { name: 'Week 1', sales: 240 },
    { name: 'Week 2', sales: 139 },
    { name: 'Week 3', sales: 980 },
    { name: 'Week 4', sales: 390 },
]

const LineChartCard = () => (
    <Card>
        <CardContent>
            <Typography variant="h6">Weekly Sales</Typography>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#BE4CBA"
                        strokeWidth={'5px'}
                    />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)

export default LineChartCard
