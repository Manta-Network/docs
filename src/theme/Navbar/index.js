import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import AskCookbook from '@cookbookdev/docsbot/react';

export default function Navbar() {
  return (
    <NavbarLayout>
      <NavbarContent />
      <AskCookbook
        apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjVmNGMyZGYyOTM1YTdkOTZhZTlkNWQiLCJpYXQiOjE3MTc1MjMwOTksImV4cCI6MjAzMzA5OTA5OX0.vnNZbSwrGZbt1EISu8zhzHjRLHa_sqoSLefydF1XgP4"
      />
    </NavbarLayout>
  );
}
