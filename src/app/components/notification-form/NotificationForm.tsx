import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  type CreateCustomNotificationDto,
  type NotificationType,
  type PregnancyStatus,
  type UserRole,
} from '../../common/dtos/notification/create-custom-notification.dto';
import type { ProviderType } from '../../common/entities/provider/provider.entity';
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

const PROVIDER_TYPES: ProviderType[] = ['DOCTOR', 'NURSE', 'CLINIC', 'HOSPITAL'];

const PREGNANCY_STATUSES: PregnancyStatus[] = ['ACTIVE', 'CANCELED', 'DONE'];

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
  const [selectedProviderTypes, setSelectedProviderTypes] = useState<ProviderType[]>([]);
  const [pregnancyStatus, setPregnancyStatus] = useState<PregnancyStatus | ''>('');
  const [fromAge, setFromAge] = useState('');
  const [toAge, setToAge] = useState('');
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

      if (
        !useGlobal &&
        selectedUsers.length === 0 &&
        selectedRoles.length === 0 &&
        selectedProviderTypes.length === 0 &&
        !pregnancyStatus &&
        !fromAge.trim() &&
        !toAge.trim()
      ) {
        throw new Error(
          'Select at least one recipient target (users, roles, provider types, pregnancy status, or age range), or enable "Send to All Users".'
        );
      }

      const parsedFromAge = fromAge.trim() ? Number(fromAge) : undefined;
      const parsedToAge = toAge.trim() ? Number(toAge) : undefined;

      if (parsedFromAge !== undefined && (!Number.isFinite(parsedFromAge) || parsedFromAge <= 0)) {
        setRecipientError('From age must be a positive number.');
        return;
      }

      if (parsedToAge !== undefined && (!Number.isFinite(parsedToAge) || parsedToAge <= 0)) {
        setRecipientError('To age must be a positive number.');
        return;
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
        provider_type: selectedProviderTypes.length > 0 ? selectedProviderTypes : undefined,
        pregnancy_status: pregnancyStatus || undefined,
        from_age: parsedFromAge,
        to_age: parsedToAge,
      };

      // Use RTK Query mutation which includes proper authentication
      await createNotification(payload).unwrap();
      reset();
      setPayloadText('{}');
      setSelectedUsers([]);
      setSelectedRoles([]);
      setSelectedProviderTypes([]);
      setPregnancyStatus('');
      setFromAge('');
      setToAge('');
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
            {useGlobal
              ? 'All Users'
              : `${selectedUsers.length} Users • ${selectedRoles.length} Roles • ${selectedProviderTypes.length} Provider Types`}
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

            <div className="form-group">
              <label>Select Provider Types</label>
              <div className="roles-container">
                {PROVIDER_TYPES.map((providerType) => (
                  <label key={providerType} className="role-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedProviderTypes.includes(providerType)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProviderTypes([...selectedProviderTypes, providerType]);
                        } else {
                          setSelectedProviderTypes(
                            selectedProviderTypes.filter((type) => type !== providerType)
                          );
                        }
                      }}
                    />
                    {providerType}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="pregnancyStatus">Pregnancy Status Filter</label>
          <select
            id="pregnancyStatus"
            className="form-control"
            value={pregnancyStatus}
            onChange={(e) => setPregnancyStatus(e.target.value as PregnancyStatus | '')}
          >
            <option value="">Any</option>
            {PREGNANCY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <span className="helper-text">
            Optional filter applied on top of the selected recipients.
          </span>
        </div>

        <div className="form-group">
          <label>Age Range Filter</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="number"
              min={1}
              className="form-control"
              placeholder="From age"
              value={fromAge}
              onChange={(e) => setFromAge(e.target.value)}
            />
            <input
              type="number"
              min={1}
              className="form-control"
              placeholder="To age"
              value={toAge}
              onChange={(e) => setToAge(e.target.value)}
            />
          </div>
          <span className="helper-text">
            Optional minimum and maximum user age filters.
          </span>
        </div>
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
