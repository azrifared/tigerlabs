import {
  atomFamily,
  useSetRecoilState,
  selector,
  atom,
} from "recoil";
import * as R from 'ramda';
import { ClaimService, Claim } from "@/services/claim";
import { tableColumns } from './columns';
import { parse } from "path";

export const PAGE_SIZE = 20

let claimData: Claim[] | undefined;

export const refreshIdAtom = atomFamily({
  key: 'Claim/RefreshIdAtom',
  default: 0,
})

export const useRefreshClaimQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtom(0))
  return () => {
    setRefreshId((id) => id + 1)
  }
}

export const claimColumnAtom = atom({
  key: 'Claim/TableColumn',
  default: tableColumns,
})

export const activeColumnAtom = atom({
  key: 'Claim/ActiveColumn',
  default: {
    activeColumn: '',
    isSortedDescending: false
  },
})

export const searchQueryAtom = atom({
  key: 'Claim/SearchQuery',
  default: '',
})

export const skipCountAtom = atom({
  key: 'Claim/SkipCount',
  default: 0,
})

export const filterStatusAtom = atom({
  key: 'Claim/FilterStatus',
  default: 'All',
})

export const ClaimWithCountSelectionQuery = selector({
  key: 'Claim/CountSelectionQuery',
  get: async ({ get }) => {
    get(refreshIdAtom(0))
    const skip = get(skipCountAtom)
    const selectedColumn = get(activeColumnAtom)
    const searchQuery = get(searchQueryAtom);
    const filterStatus = get(filterStatusAtom)
    const end = skip + PAGE_SIZE;

    if (!claimData) {
      claimData = await ClaimService.getClaims()
    }

    let count = claimData?.length ?? 0
    let data = (claimData || []).map(claim => ({
      ...claim,
      totalAmount: Number(claim.amount) + Number(claim.processingFee)
    })) as any
      
    if (filterStatus !== 'All') {
      data = data.filter((claim: Claim) => claim.status === filterStatus)
      count = data.length
    }

    if (selectedColumn.activeColumn !== '') {
      const { activeColumn, isSortedDescending } = selectedColumn;

      data = data.map((claim: any) => ({
        ...claim,
        amount: parseFloat(claim.amount),
        processingFee: parseFloat(claim.processingFee),
        totalAmount: parseFloat(claim.totalAmount)
      }))

      const ascend = R.ascend<any>(R.prop(activeColumn));
      const descend = R.descend<any>(R.prop(activeColumn));
      if (isSortedDescending) {
        data = R.sort(descend, data);
      } else {
        data = R.sort(ascend, data);
      }
    }

    if (searchQuery !== '') {
      data = data.filter((claim: Claim) => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase()
        const similarWithId = String(claim.id).toLowerCase().includes(lowerCaseSearchQuery)
        const similarWithHolderName = claim.holder.toLowerCase().includes(lowerCaseSearchQuery)
        const similarWithPolicy = claim.policyNumber.toLowerCase().includes(lowerCaseSearchQuery)

        return similarWithId || similarWithHolderName || similarWithPolicy
      })
      count = data.length
    }
    
    data = data.slice(skip, end)

    return [data, count]
  },
})

export const ClaimRowAtom = atom({
  key: 'Client/RowAtom',
  default: selector({
    key: 'Client/RowAtomDefault',
    get: ({ get }) => { 
      const contents = get(ClaimWithCountSelectionQuery)
      return contents
    },
  }),
})

