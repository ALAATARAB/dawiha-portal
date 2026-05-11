import { type RouteObject } from 'react-router-dom'

// New Dawiha Pages

// Import new feature pages
import AppointmentListPage from '../../../features/appointment/pages/AppointmentListPage'
import HistoryListPage from '../../../features/history/pages/HistoryListPage'
import MedicineListPage from '../../../features/medicine/pages/MedicineListPage'
import MedicineGuideListPage from '../../../features/medicine-guide/pages/MedicineGuideListPage'
import PregnancyListPage from '../../../features/pregnancy/pages/PregnancyListPage'
import PregnancyStageListPage from '../../../features/pregnancy-stage/pages/PregnancyStageListPage'
import ProviderListPage from '../../../features/provider/pages/ProviderListPage'
import ProviderAvailabilityListPage from '../../../features/provider-availability/pages/ProviderAvailabilityListPage'
import Categories from '../../../pages/categories/Categories'
import CreateNotificationPage from '../../../pages/notifications/CreateNotificationPage'
import Notifications from '../../../pages/notifications/Notifications'
import ViewUserDetails from '../../../pages/users/sub-pages/ViewUserDetails'
import Users from '../../../pages/users/Users'

// Import API slices to ensure they're registered
import '../../../features/appointment/api/appointmentApiSlice'
import '../../../features/provider/api/providerApiSlice'
import '../../../features/history/api/historyApiSlice'
import '../../../features/medicine/api/medicineApiSlice'
import '../../../features/medicine-guide/api/medicineGuideApiSlice'
import '../../../features/pregnancy/api/pregnancyApiSlice'
import '../../../features/pregnancy-stage/api/pregnancyStageApiSlice'
import '../../../features/provider-availability/api/providerAvailabilityApiSlice'
import '../../../features/category/api/categoryApiSlice'

export const adminRoutes: RouteObject[] = [
    // Users Management (Default Page)
    { path: '/users', element: <Users /> },
    { path: '/users/:id', element: <ViewUserDetails /> },

    // Providers Management
    { path: '/providers', element: <ProviderListPage /> },

    // Appointments Management
    { path: '/appointments', element: <AppointmentListPage /> },

    // Categories Management
    { path: '/categories', element: <Categories /> },

    // Medical Histories Management
    { path: '/histories', element: <HistoryListPage /> },

    // Medicines Management
    { path: '/medicines', element: <MedicineListPage /> },

    // Medicine Guides Management
    { path: '/medicine-guides', element: <MedicineGuideListPage /> },

    // Pregnancies Management
    { path: '/pregnancies', element: <PregnancyListPage /> },

    // Pregnancy Stages Management
    { path: '/pregnancy-stages', element: <PregnancyStageListPage /> },

    // Provider Availabilities Management
    { path: '/provider-schedules', element: <ProviderAvailabilityListPage /> },

    // Notifications
    { path: '/notifications', element: <Notifications /> },
    { path: '/notifications/create', element: <CreateNotificationPage /> },
    { path: '/notifications/:notificationId/edit', element: <CreateNotificationPage /> },
    { path: '/notifications/:notificationId', element: <CreateNotificationPage /> },
]

export const userRoutes: RouteObject[] = [
    {
        path: '/example',
        element: <h1>example</h1>,
    },
]
