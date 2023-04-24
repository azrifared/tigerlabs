import $api from "@/http";

export interface Claim {
  id: number;
  number: string;
  incidentDate: string;
  createdAt: string;
  amount: string;
  holder: string;
  policyNumber: string;
  insuredItem: string;
  description: string;
  processingFee: string;
  status: string;
}

export class ClaimService {
  static async getClaims() {
    try {
      const resp = await $api.get<Claim[]>('/api/v1/claims')
      return resp.data
    } catch (err: any) {
      console.error('Failed to get claim. ' + err.message)
    }
  }
}