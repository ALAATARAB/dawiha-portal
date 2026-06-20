import CampaignIcon from '@mui/icons-material/Campaign'
import CategoryIcon from '@mui/icons-material/Category'
import EventIcon from '@mui/icons-material/Event'
import HistoryIcon from '@mui/icons-material/History'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicationIcon from '@mui/icons-material/Medication'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PeopleIcon from '@mui/icons-material/People'
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman'
import ScheduleIcon from '@mui/icons-material/Schedule'
import StarIcon from '@mui/icons-material/Star'
import TimelineIcon from '@mui/icons-material/Timeline'
import { type Navigation } from '@toolpad/core/AppProvider'

/** Dawiha Admin Portal Navigation - Updated for new API */
export const adminSidebar: Navigation = [
    {
        segment: 'users',
        title: 'Users',
        icon: <PeopleIcon />,
    },
    {
        segment: 'providers',
        title: 'Providers',
        icon: <LocalHospitalIcon />,
    },
    {
        segment: 'provider-ratings',
        title: 'Provider Ratings',
        icon: <StarIcon />,
    },
    {
        segment: 'appointments',
        title: 'Appointments',
        icon: <EventIcon />,
    },
    {
        segment: 'categories',
        title: 'Categories',
        icon: <CategoryIcon />,
    },
    {
        segment: 'histories',
        title: 'Medical Histories',
        icon: <HistoryIcon />,
    },
    {
        segment: 'medicines',
        title: 'Medicines',
        icon: <MedicationIcon />,
    },
    {
        segment: 'medicine-guides',
        title: 'Medicine Guides',
        icon: <MenuBookIcon />,
    },
    {
        segment: 'pregnancies',
        title: 'Pregnancies',
        icon: <PregnantWomanIcon />,
    },
    {
        segment: 'pregnancy-stages',
        title: 'Pregnancy Stages',
        icon: <TimelineIcon />,
    },
    {
        segment: 'provider-schedules',
        title: 'Provider Schedules',
        icon: <ScheduleIcon />,
    },
    {
        segment: 'ads',
        title: 'Ads',
        icon: <CampaignIcon />,
    },
    {
        segment: 'notifications',
        title: 'Notifications',
        icon: <NotificationsIcon />,
    },
]

export const userSidebar: Navigation = [
    {
        segment: 'example',
        title: 'Example',
        icon: <PeopleIcon />,
    },
]
