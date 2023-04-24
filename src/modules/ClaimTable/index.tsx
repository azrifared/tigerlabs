import {
  FunctionComponent,
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';
import {
  DetailsListLayoutMode,
  ShimmeredDetailsList,
} from '@fluentui/react'
import moment from 'moment';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { SelectionMode } from '@fluentui/utilities'
import { RECOIL_ASYNC_STATE } from '@/common/constants';
import Pagination from '@/components/Pagination';
import { Row } from './Row';
import { tableColumns } from './columns';
import {
  PAGE_SIZE,
  ClaimRowAtom,
  skipCountAtom
} from './store';

export const ClaimTable: FunctionComponent = () => {
  const { state, contents } = useRecoilValueLoadable(ClaimRowAtom);
  const [rows, setRows] = useState(contents)
  const [totalCount, setTotalCount] = useState(0)
  const [skipCount, setSkipCount] = useRecoilState(skipCountAtom)
  const isLoading = useMemo(() => state === RECOIL_ASYNC_STATE.LOADING, [state])

  const onPageChange = useCallback((page: string) => {
    setSkipCount(Number(page))
  }, [])

  useEffect(() => setSkipCount(0), [])
  useEffect(() => {
    if (!isLoading) {
      const [list, count] = contents || []
      setRows(list || [])
      setTotalCount(count || 0)
    }
  }, [isLoading, contents])

  return (
    <>
      <ShimmeredDetailsList
        items={rows}
        columns={tableColumns}
        enableShimmer={isLoading}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderRow={(detailsRowProps) => <Row {...detailsRowProps} />}
      />
      <Pagination
        count={totalCount}
        pageSize={PAGE_SIZE}
        currentStart={skipCount}
        onChange={onPageChange}
      />
    </>
  );
};
