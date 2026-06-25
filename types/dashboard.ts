export type DashboardPeriod = "daily" | "weekly" | "monthly" | "yearly" | "all"

export interface dashboard {
    period: DashboardPeriod;
    income: number;
    expense: number;
    balance: number;
    totalTransactions: number
}