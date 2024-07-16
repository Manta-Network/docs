import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import AskCookbook from '@cookbookdev/docsbot/react';

export default function Navbar() {
  return (
    <NavbarLayout>
      <NavbarContent />
      <AskCookbook apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxOGM1MzA1MjA1MDZmZmEwMDhjMmUiLCJpYXQiOjE3MDcxODMxODcsImV4cCI6MjAyMjc1OTE4N30.diwQUey2v9RLd7MWuzI4Uw4ayhLKaditIfa062Sc2YQ" />
    </NavbarLayout>
  );
}
