import type { CreateCustomNotificationDto } from '../dtos/notification/create-custom-notification.dto';

import { useState, useCallback } from 'react';

import { useCreateCustomNotificationMutation } from '../../features/notification/api/notificationApiSlice';

interface UseNotificationsReturn {
  loading: boolean;
  error: Error | null;
  createNotification: (data: CreateCustomNotificationDto) => Promise<void>;
  clearError: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [error, setError] = useState<Error | null>(null);
  const [createMutation, { isLoading }] = useCreateCustomNotificationMutation();

  const createNotification = useCallback(async (data: CreateCustomNotificationDto) => {
    try {
      setError(null);
      await createMutation(data).unwrap();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create notification');
      setError(error);
      throw error;
    }
  }, [createMutation]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading: isLoading,
    error,
    createNotification,
    clearError,
  };
};
