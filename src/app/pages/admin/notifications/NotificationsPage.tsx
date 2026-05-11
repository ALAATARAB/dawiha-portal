import { useState } from 'react';

import { NotificationForm } from '../../../components/notification-form';
import './style.css';

export default function NotificationsPage() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccess = () => {
    setSuccessMessage('Notification sent successfully!');
    setErrorMessage('');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleError = (error: Error) => {
    setErrorMessage(`Error: ${error.message}`);
    setSuccessMessage('');
  };

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1>Send Custom Notification</h1>
        <p>Create and send notifications to users or roles</p>
      </div>

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-error">
          {errorMessage}
        </div>
      )}

      <NotificationForm
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}
