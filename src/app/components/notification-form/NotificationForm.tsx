import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  type CreateCustomNotificationDto,
  type NotificationType,
  type UserRole,
} from '../../common/dtos/notification/create-custom-notification.dto';
import { useCreateCustomNotificationMutation } from '../../features/notification/api/notificationApiSlice';
import { useGetUsersQuery } from '../../features/user/api/userApiSlice';
import './style.css';

const NOTIFICATION_TYPES: NotificationType[] = [
  'CUSTOM',
  'APPOINTMENT_CREATED',
  'APPOINTMENT_UPDATED',
  'REQUEST_CREATED',
  'REQUEST_UPDATED',
];

const USER_ROLES: UserRole[] = ['USER', 'PROVIDER', 'ADMIN'];

interface NotificationFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

type NotificationFormValues = {
  type: NotificationType;
  title?: string;
  body?: string;
};

type UserOption = {
  id: number;
  name: string;
};

export default function NotificationForm({ onSuccess, onError }: NotificationFormProps) {
  const [userSearch, setUserSearch] = useState('');
  const [payloadText, setPayloadText] = useState('{}');
  const [payloadError, setPayloadError] = useState('');
  const [recipientError, setRecipientError] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [useGlobal, setUseGlobal] = useState(false);

  // Use RTK Query for proper authentication
  const [createNotification, { isLoading: loading }] = useCreateCustomNotificationMutation();

  // Use RTK Query to fetch users with proper authentication
  const { data: usersData, isLoading: loadingUsers, error: usersError } = useGetUsersQuery({
    page: 1,
    perPage: 100
  });

  const users = useMemo(() => {
    if (!usersData?.data) return [];
    return usersData.data.map((user) => ({
      id: user.id,
      name: user.name || `User #${user.id}`,
    }));
  }, [usersData]);

  // Show error if users failed to load
  useEffect(() => {
    if (usersError) {
      const err = new Error('Failed to load users');
      onError?.(err);
    }
  }, [usersError, onError]);

  const { handleSubmit, register, watch, reset, formState: { errors } } = useForm<NotificationFormValues>({
    defaultValues: {
      type: 'CUSTOM',
    },
  });

  const notificationType = watch('type');

  const filteredUsers = useMemo(() => {
    const term = userSearch.trim().toLowerCase();
    if (!term) {
      return users;
    }
    return users.filter((user) => user.name.toLowerCase().includes(term));
  }, [userSearch, users]);

  const onSubmit = async (data: NotificationFormValues) => {
    try {
      setPayloadError('');
      setRecipientError('');

      if (!useGlobal && selectedUsers.length === 0 && selectedRoles.length === 0) {
        throw new Error('Select at least one user or one role, or enable "Send to All Users".');
      }

      let parsedPayload: Record<string, unknown> | undefined;
      const normalizedPayload = payloadText.trim();
      if (normalizedPayload) {
        try {
          const value = JSON.parse(normalizedPayload) as unknown;
          if (value === null || Array.isArray(value) || typeof value !== 'object') {
            throw new Error('Payload must be a JSON object.');
          }
          parsedPayload = value as Record<string, unknown>;
        } catch {
          setPayloadError('Payload must be a valid JSON object (example: {"key":"value"}).');
          return;
        }
      }

      const payload: CreateCustomNotificationDto = {
        type: notificationType,
        title: data.title?.trim() || undefined,
        body: data.body?.trim() || undefined,
        payload: parsedPayload,
        global: useGlobal,
        user_ids: useGlobal ? undefined : selectedUsers.length > 0 ? selectedUsers : undefined,
        roles: selectedRoles.length > 0 ? selectedRoles : undefined,
      };

      // Use RTK Query mutation which includes proper authentication
      await createNotification(payload).unwrap();
      reset();
      setPayloadText('{}');
      setSelectedUsers([]);
      setSelectedRoles([]);
      setUseGlobal(false);
      setRecipientError('');
      setPayloadError('');
      onSuccess?.();
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to create notification');
      if (err.message.includes('Select at least one user')) {
        setRecipientError(err.message);
      }
      onError?.(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="notification-form">
      <div className="form-section">
        <div className="form-section-header">
          <h3>Recipients</h3>
          <span className="section-badge">
            {useGlobal ? 'All Users' : `${selectedUsers.length} Users • ${selectedRoles.length} Roles`}
          </span>
        </div>

        <div className="form-group inline-checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={useGlobal}
              onChange={(e) => setUseGlobal(e.target.checked)}
            />
            Send to All Users
          </label>
          <p className="helper-text">
            Enable this to broadcast notification to everyone.
          </p>
        </div>

        {!useGlobal && (
          <>
            <div className="form-group">
              <label htmlFor="userSearch">Select Users</label>
              <input
                id="userSearch"
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search by name"
                className="form-control"
              />
              <select
                multiple
                className="form-control users-multi-select"
                value={selectedUsers.map(String)}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions).map((option) => Number(option.value));
                  setSelectedUsers(values);
                }}
              >
                {filteredUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <div className="field-footer">
                {loadingUsers && <span className="helper-text">Loading users...</span>}
                {!loadingUsers && (
                  <span className="helper-text">
                    Hold Ctrl/Cmd to select multiple users
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Select Roles</label>
              <div className="roles-container">
                {USER_ROLES.map((role) => (
                  <label key={role} className="role-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRoles([...selectedRoles, role]);
                        } else {
                          setSelectedRoles(selectedRoles.filter((r) => r !== role));
                        }
                      }}
                    />
                    {role}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <h3>Notification Details</h3>
          <span className="section-badge">Type: {notificationType}</span>
        </div>

        <div className="form-group">
          <label htmlFor="type">Notification Type *</label>
          <select {...register('type')} id="type" className="form-control">
            {NOTIFICATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && <span className="error">{errors.type.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            {...register('title')}
            id="title"
            type="text"
            placeholder="Notification title"
            className="form-control"
          />
          <span className="helper-text">Optional title shown in notification payload.</span>
        </div>

        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            {...register('body')}
            id="body"
            placeholder="Notification message"
            className="form-control"
            rows={4}
          />
          <span className="helper-text">Optional body text shown to users.</span>
        </div>

        <div className="form-group">
          <label htmlFor="payload">Custom Payload (JSON)</label>
          <textarea
            id="payload"
            placeholder='{"key": "value"}'
            className="form-control"
            rows={3}
            value={payloadText}
            onChange={(e) => setPayloadText(e.target.value)}
          />
          <span className="helper-text">Any JSON object can be sent as custom payload.</span>
          {payloadError && <span className="error">{payloadError}</span>}
        </div>
      </div>
      {recipientError && <span className="error">{recipientError}</span>}

      <div className="form-actions">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Sending...' : 'Send Notification'}
        </button>
      </div>
    </form>
  );
}
