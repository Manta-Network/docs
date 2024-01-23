import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import { ChefGPT } from "@theme/ChefGPT";

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <ChefGPT />
    </>
  );
}
