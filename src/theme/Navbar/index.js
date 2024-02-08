import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import ChefGPT from "@cookbookdev/docusaurus-chefgpt/theme/SearchBar";
export default function Navbar() {
  return (
    <NavbarLayout>
      <NavbarContent />
      <ChefGPT />
    </NavbarLayout>
  );
}
