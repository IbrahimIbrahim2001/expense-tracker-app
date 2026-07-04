import { getDashboard } from "@/api/get-dashboard";
import { dashboard } from "@/types/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";
import { useDashboard } from "../useDashboard";

jest.mock("@/api/get-dashboard");

const mockDashboardData : dashboard = {
    balance: 1000,
    expense: 500,
    income: 1000,
    period: "all",
    totalTransactions: 20
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        {children}
    </QueryClientProvider>
);


describe('useDashboard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it('should return dashboard data on success', async () => {
        (getDashboard as jest.Mock).mockResolvedValue({ success: true, data: mockDashboardData, message: 'Fetched dashboard' });

        const { result } = await renderHook(() => useDashboard(), { wrapper });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
                expect(result.current.data).toEqual(mockDashboardData);
    })
     it('sets isError on API failure', async () => {
            (getDashboard as jest.Mock).mockResolvedValue({ success: false, message: 'Failed to fetch dashboard', data: [] });
    
            const { result } = await renderHook(() => useDashboard(), { wrapper });
    
            await waitFor(() => expect(result.current.isError).toBe(true));
        });
});