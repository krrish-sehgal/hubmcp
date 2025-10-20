export interface HubConfig {
  baseUrl: string;
  apiToken: string;
  hubName?: string;
  hubRegion?: string;
  requestTimeout?: number;
}

export interface BalancesResponse {
  [key: string]: unknown;
  onchain?: {
    spendable: number;
    total: number;
  };
  lightning?: {
    totalSpendable: number;
    totalReceivable: number;
    nextMaxSpendable: number;
    nextMaxReceivable: number;
  };
}

export interface MakeInvoiceRequest {
  amount: number; // in msats
  description: string;
}

export interface Transaction {
  [key: string]: unknown;
  type: string;
  invoice?: string;
  paymentHash: string;
  amount: number;
  state: string;
  createdAt: string;
  updatedAt?: string;
  settledAt?: string;
  appId?: string;
  metadata?: object;
  feesPaid?: number;
  failureReason?: string;
}

export interface PayInvoiceRequest {
  amount?: number; // in msats, required for zero-amount invoices
  metadata?: object;
}

export interface ErrorResponse {
  message: string;
}
