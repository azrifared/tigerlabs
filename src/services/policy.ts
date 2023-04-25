import $api from "@/http";

export interface Policy {
  id: number;
  number: string;
  holder: string;
  status: string;
  finalAmount: string;
}

export class PolicyService {
  static async getPolicies() {
    try {
      const resp = await $api.get<Policy[]>(`/api/v1/policies`)
      return resp.data
    } catch (err: any) {
      console.error('Failed to get policy. ' + err.message)
    }
  }

  static async getPolicy(policyNumber: string) {
    try {
      const resp = await $api.get<Policy[]>(`/api/v1/policies?q=${policyNumber}`)
      return resp.data
    } catch (err: any) {
      console.error('Failed to get policy. ' + err.message)
    }
  }
}