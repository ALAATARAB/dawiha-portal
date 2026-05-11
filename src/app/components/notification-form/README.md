# Notification Form Component

Complete notification management system for sending custom notifications to users or roles.

## Features

- Send notifications to specific users or all users
- Target notifications by user roles
- Multiple notification types (REVIEW, TASK, REQUEST, etc.)
- Custom payload support
- Form validation
- Loading states and error handling

## Installation

The component is already integrated in the project. Import and use it in your pages.

## Usage

### Basic Usage

```tsx
import { NotificationForm } from '@/app/components/notification-form';

export default function MyPage() {
  return (
    <NotificationForm
      onSuccess={() => console.log('Notification sent!')}
      onError={(error) => console.error('Error:', error)}
    />
  );
}
```

### Using the Hook

```tsx
import { useNotifications } from '@/app/common/custom-hooks/useNotifications';
import { CreateCustomNotificationDto } from '@/app/common/dtos/notification/create-custom-notification.dto';

export default function MyComponent() {
  const { loading, error, createNotification } = useNotifications();

  const handleSend = async () => {
    const payload: CreateCustomNotificationDto = {
      type: 'CUSTOM',
      title: 'Hello',
      body: 'This is a test notification',
      global: true,
    };

    try {
      await createNotification(payload);
      console.log('Success!');
    } catch (err) {
      console.error('Failed:', err);
    }
  };

  return (
    <button onClick={handleSend} disabled={loading}>
      {loading ? 'Sending...' : 'Send'}
    </button>
  );
}
```

### Using the Service Directly

```tsx
import { notificationService } from '@/app/common/services/notification.service';

// Create notification
await notificationService.createCustomNotification({
  user_ids: [1, 2, 3],
  type: 'REVIEW',
  title: 'Review Needed',
  body: 'Please review this item',
  payload: { item_id: 123 },
});

// Get notifications
const notifications = await notificationService.getNotifications({
  page: 1,
  perPage: 20,
});

// Mark as read
await notificationService.markAsRead(notificationId);
```

## API Reference

### CreateCustomNotificationDto

```typescript
interface CreateCustomNotificationDto {
  user_ids?: number[];           // Array of user IDs to send to
  roles?: UserRole[];            // Array of roles to send to
  type: NotificationType;        // Notification type (required)
  payload?: Record<string, any>; // Custom data object
  global?: boolean;              // Send to all users
  title?: string;                // Notification title
  body?: string;                 // Notification message
}
```

### Notification Types

- `REVIEW` - Review notification
- `TASK` - Task notification
- `REQUEST` - Request notification
- `SUBSCRIPTION` - Subscription notification
- `PURCHASE_SERVICE` - Service purchase notification
- `PURCHASE_PRODUCT` - Product purchase notification
- `PURCHASE_PLAN` - Plan purchase notification
- `CUSTOM` - Custom notification

### User Roles

- `SUPPORTED` - Supported user
- `SUPPORTER` - Supporter user
- `PROVIDER` - Provider user
- `SUPPLIER` - Supplier user
- `ADMIN` - Admin user
- `CASE_MANAGER` - Case manager user
- `SUPER_ADMIN` - Super admin user

## Component Props

```typescript
interface NotificationFormProps {
  onSuccess?: () => void;           // Called when notification sent successfully
  onError?: (error: Error) => void; // Called when error occurs
}
```

## Examples

### Send to All Users

```tsx
<NotificationForm
  onSuccess={() => alert('Sent to all users!')}
/>
```

Then in the form:
1. Check "Send to All Users"
2. Fill in title and body
3. Click "Send Notification"

### Send to Specific Roles

```tsx
// Using the hook
const { createNotification } = useNotifications();

await createNotification({
  type: 'TASK',
  roles: ['SUPPORTER', 'CASE_MANAGER'],
  title: 'New Task',
  body: 'A new task has been assigned',
});
```

### Send to Specific Users

```tsx
await createNotification({
  type: 'REVIEW',
  user_ids: [1, 2, 3],
  title: 'Review Request',
  body: 'Please review the attached document',
  payload: { document_id: 456 },
});
```

### Send with Custom Payload

```tsx
await createNotification({
  type: 'CUSTOM',
  global: true,
  title: 'Important Update',
  body: 'System maintenance scheduled',
  payload: {
    maintenance_start: '2024-04-27T10:00:00Z',
    maintenance_end: '2024-04-27T12:00:00Z',
    affected_services: ['API', 'Dashboard'],
  },
});
```

## Styling

The component uses CSS classes that can be customized:

- `.notification-form` - Main form container
- `.form-section` - Section grouping
- `.form-group` - Individual form field
- `.form-control` - Input/textarea elements
- `.roles-container` - Roles checkbox grid
- `.btn-primary` - Submit button

## Error Handling

The component handles errors gracefully:

```tsx
<NotificationForm
  onError={(error) => {
    console.error('Notification failed:', error.message);
    // Show toast or alert to user
  }}
/>
```

## Notes

- At least one of `user_ids`, `roles`, or `global` should be provided
- `type` is required
- If `global` is true, `user_ids` and `roles` are ignored
- The form validates required fields before submission
- Loading state prevents multiple submissions
