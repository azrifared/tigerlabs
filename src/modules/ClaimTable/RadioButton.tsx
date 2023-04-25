import { useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { FILTER_CLAIM_STATUS } from '@/common/constants';
import { filterStatusAtom, skipCountAtom } from './store';

export function RadioButton () {
  const [activeStatus, setActiveStatus] = useRecoilState(filterStatusAtom)
  const [_, setSkipCount] = useRecoilState(skipCountAtom)
  const onFilterChange = useCallback((status:  string) => {
    setActiveStatus(status)
    setSkipCount(0)
  }, [])

  return (
    <Container>
      {FILTER_CLAIM_STATUS.map((status) => {
        if (status === activeStatus) return (
          <ActiveButton key={status}>{status}</ActiveButton>
        )
        return (
          <Button key={status} onClick={() => onFilterChange(status)}>{status}</Button>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  margin: 10px;
  display: flex;
`;

const Button = styled.button`
  border: 1px solid lightgray;
  width: 80px;
  height: 30px;
  background-color: transparent;
  color: rgb(96, 94, 92);
  cursor: pointer;
  font-family: Segoe UI;
  &:hover {
    background-color: #00a2ed;
    color: white;
    outline: none;
    border: none;
  }
`;

const ActiveButton = styled.button`
  background-color: #00a2ed;
  color: white;
  outline: none;
  border: none;
  font-family: Segoe UI;
  width: 80px;
  height: 30px;
`;
