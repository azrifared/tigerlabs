import React, { useCallback } from 'react';
import { Async } from '@fluentui/react';
import styled from "styled-components";
import { useRecoilState } from 'recoil';
import { searchQueryAtom } from "./store";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
  const debounceHandler = useCallback(Async.prototype.debounce(
    (value: string) => {
      setSearchQuery(value)
    },
    500,
    { trailing: true }
  ), [searchQuery, setSearchQuery])
  
  
  return (
    <InputField
      id="searchBar"
      type="searchBar"
      name="searchBar"
      placeholder="Search by id, holder name or policy number"
      onChange={(ev) => debounceHandler(ev.target.value)}
    />
  )
}

export const InputField = styled.input`
  margin: 10px;
  width: 350px;
  height: 30px;
  padding: 0 5px;
  border: 1px solid lightgray;
  outline: none;
  &:focus {
    outline: none;
    border: 1px solid #24a0ed;
    box-shadow: 0px 0px 1px #24a0ed;
  }
`;
