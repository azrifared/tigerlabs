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
  IColumn
} from '@fluentui/react';
import * as R from 'ramda';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { SelectionMode } from '@fluentui/utilities'
import { RECOIL_ASYNC_STATE } from '@/common/constants';
import Pagination from '@/components/Pagination';
import { Row } from './Row';
import {
  PAGE_SIZE,
  ClaimRowAtom,
  skipCountAtom,
  claimColumnAtom,
  activeColumnAtom
} from './store';

export const Table: FunctionComponent = () => {
  const { state, contents } = useRecoilValueLoadable(ClaimRowAtom);
  const [rows, setRows] = useState(contents)
  const [totalCount, setTotalCount] = useState(0)
  const [skipCount, setSkipCount] = useRecoilState(skipCountAtom)
  const [columns, setColumns] = useRecoilState(claimColumnAtom)
  const [activeColumn, setActiveColumn] = useRecoilState(activeColumnAtom)
  const isLoading = useMemo(() => state === RECOIL_ASYNC_STATE.LOADING, [state])

  const onPageChange = useCallback((page: string) => {
    setSkipCount(Number(page))
  }, [setSkipCount])
  const onColumnHeaderClick = useCallback((ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => {
    const newColumns = R.clone(columns)
    const currColumn: IColumn = newColumns.filter(
      (currCol) => column?.key === currCol.key
    )[0]
    newColumns.forEach((newCol: IColumn) => {
      if (newCol.isSorted) {
        if (newCol === currColumn) {
          newCol.isSortedDescending = !currColumn.isSortedDescending
          currColumn.isSortedDescending = newCol.isSortedDescending
        } else if (newCol.isSorted) {
          newCol.isSortedDescending = false
        }
      }
    })
    if (currColumn.isSorted) {
      setActiveColumn({
        activeColumn: currColumn.key,
        isSortedDescending: currColumn.isSortedDescending ?? false
      })
    }
    setSkipCount(0)
    setColumns(newColumns)
  }, [setColumns, columns, activeColumn])

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
        columns={columns}
        enableShimmer={isLoading}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderRow={(detailsRowProps) => <Row {...detailsRowProps} />}
        onColumnHeaderClick={onColumnHeaderClick}
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
