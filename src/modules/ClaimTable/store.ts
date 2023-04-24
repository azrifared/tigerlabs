import {
  atomFamily,
  useSetRecoilState,
  selector,
  atom,
} from "recoil";
import { ClaimService, Claim } from "@/services/claim";

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

export const claimQuery = selector({
  key: 'Claim/Query',
  get: async ({ get }) => {
    get(refreshIdAtom(0))
    return [];
  },
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
    const end = skip + PAGE_SIZE
    const filterStatus = get(filterStatusAtom)

    if (!claimData) {
      claimData = await ClaimService.getClaims()
    }

    let count = claimData?.length || 0
    let data = (claimData || []).map(claim => ({
      ...claim,
      totalAmount: Number(claim.amount) + Number(claim.processingFee)
    }))
      
    if (filterStatus !== 'All') {
      data = data.filter((claim) => claim.status === filterStatus)
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

