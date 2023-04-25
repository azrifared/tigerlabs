import { FunctionComponent, useState } from 'react';
import styled from '@/components/Theme/styled';
import { SearchBar } from './SearchBar';
import { RadioButton } from './RadioButton';
import { Table } from './Table';
import { PanelButton } from './PanelButton';
import { ClaimSidebar } from '../ClaimSidebar';

export const ClaimTable: FunctionComponent = () => {
  const [isOpen, openPanel] = useState(false);

  return (
    <>
      <SearchBar />
      <Flex>
        <RadioButton />
        <PanelButton openPanel={openPanel} />
      </Flex>
      <ClaimSidebar isOpen={isOpen} openPanel={openPanel} />
      <Table />
    </>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
