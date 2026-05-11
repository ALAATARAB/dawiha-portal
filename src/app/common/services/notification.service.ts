import Cookies from 'js-cookie';

import {
    type CreateCustomNotificationDto,
    type NotificationType,
} from '../dtos/notification/create-custom-notification.dto';
import {
    mapActorToAdminUser,
    type AdminUserEntity,
} from '../entities/user/user.entity';
import { getApiV1Url } from '../env-config/env-config';

type NotificationQueryParams = {
    perPage?: number;
    page?: number;
    type?: NotificationType;
    receiver_id?: number;
    is_seen?: boolean;
    is_read?: boolean;
};

type UserNotificationResponse = {
    id?: number;
    first_name?: string;
    last_name?: string;
};

export type NotificationResponseItem = {
    id: number;
    type: NotificationType;
    payload?: Record<string, unknown> | null;
    is_read: boolean;
    is_seen: boolean;
    receiver?: UserNotificationResponse | null;
    created_at: string;
    updated_at: string;
};

type NotificationsListResponse = {
    data?: NotificationResponseItem[];
    meta?: { total?: number };
};

export type NotificationsListEntity = {
    data: NotificationResponseItem[];
    totalCount: number;
};

type GetUsersParams = {
    perPage?: number;
    page?: number;
    name?: string;
};

type UsersListResponse = {
    data?: Record<string, unknown>[];
    meta?: { total?: number };
};

type UsersListEntity = {
    data: AdminUserEntity[];
    totalCount: number;
};

const AUTH_COOKIE_NAME = 'dawiha-admin';

function getAccessToken(): string | null {
    const raw = Cookies.get(AUTH_COOKIE_NAME);
    if (!raw) {
        return null;
    }

    try {
        const parsed = JSON.parse(raw) as { token?: string | null };
        return parsed.token ?? null;
    } catch {
        return null;
    }
}

function buildHeaders(): HeadersInit {
    const token = getAccessToken();
    return {
        'Content-Type': 'application/json',
        ...(token
            ? {
                Authorization: token.toLowerCase().startsWith('bearer ')
                    ? token
                    : `Bearer ${token}`,
            }
            : {}),
    };
}

function withQuery(path: string, params?: Record<string, unknown>): string {
    const url = new URL(getApiV1Url(path));
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
                return;
            }
            url.searchParams.append(key, String(value));
        });
    }
    return url.toString();
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    if (!response.ok) {
        const fallback = `Request failed (${response.status})`;
        try {
            const body = (await response.json()) as { message?: string };
            throw new Error(body.message || fallback);
        } catch {
            throw new Error(fallback);
        }
    }
    if (response.status === 204) {
        return {} as T;
    }
    return (await response.json()) as T;
}

export const notificationService = {
    createCustomNotification: async (data: CreateCustomNotificationDto) =>
        request<unknown>(getApiV1Url('/admin/notifications/custom'), {
            method: 'POST',
            headers: buildHeaders(),
            body: JSON.stringify(data),
        }),

    getNotifications: async (
        params?: NotificationQueryParams
    ): Promise<NotificationsListEntity> => {
        const response = await request<NotificationsListResponse>(
            withQuery('/admin/notifications', params),
            {
                method: 'GET',
                headers: buildHeaders(),
            }
        );

        return {
            data: response.data ?? [],
            totalCount: response.meta?.total ?? 0,
        };
    },

    markAsRead: async (id: number) =>
        request<unknown>(getApiV1Url(`/admin/notifications/read/${id}`), {
            method: 'PATCH',
            headers: buildHeaders(),
        }),

    getUsers: async (params?: GetUsersParams): Promise<UsersListEntity> => {
        const response = await request<UsersListResponse>(
            withQuery('/admin/users', params),
            {
                method: 'GET',
                headers: buildHeaders(),
            }
        );

        return {
            data: (response.data ?? []).map((row) =>
                mapActorToAdminUser(row as Record<string, unknown>)
            ),
            totalCount: response.meta?.total ?? 0,
        };
    },
};
