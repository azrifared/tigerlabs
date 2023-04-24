import { FunctionComponent } from 'react';
import { SearchBar } from './SearchBar';
import { RadioButton } from './RadioButton';
import { Table } from './Table';

export const ClaimTable: FunctionComponent = () => {

  return (
    <>
      <SearchBar />
      <RadioButton />
      <Table />
    </>
  );
};
