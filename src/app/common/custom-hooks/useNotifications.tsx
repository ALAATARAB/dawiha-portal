import type { CreateCustomNotificationDto } from '../dtos/notification/create-custom-notification.dto';

import { useState, useCallback } from 'react';

import { notificationService } from '../services/notification.service';

interface UseNotificationsReturn {
  loading: boolean;
  error: Error | null;
  createNotification: (data: CreateCustomNotificationDto) => Promise<void>;
  clearError: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createNotification = useCallback(async (data: CreateCustomNotificationDto) => {
    try {
      setLoading(true);
      setError(null);
      await notificationService.createCustomNotification(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create notification');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    createNotification,
    clearError,
  };
};
