import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const data = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 300 },
    { name: 'Mar', users: 200 },
    { name: 'Apr', users: 278 },
]

const BarChartCard = () => (
    <Card>
        <CardContent>
            <Typography variant="h6">Monthly Users</Typography>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#BE4CBA" />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)

export default BarChartCard
