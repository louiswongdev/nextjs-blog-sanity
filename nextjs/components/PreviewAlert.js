import React from 'react';
import { Alert } from 'react-bootstrap';

function PreviewAlert() {
  return (
    <Alert variant="secondary">
      You are in preview mode.{' '}
      <Alert.Link href="/api/exit-preview">Leave preview mode</Alert.Link>
    </Alert>
  );
}

export default PreviewAlert;
