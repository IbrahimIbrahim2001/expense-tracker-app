
import { getCurrentUser } from "@/api/get-current-user";
import { useAuthStore } from "@/store/auth-store";
import { getToken } from "./token";

export const initializeAuthSession = async () => {
    const setUser = useAuthStore.getState().setUser;
    const logout = useAuthStore.getState().logout;

    try {
        const token = await getToken();

        if (!token) {
            logout();
            return false;
        }

        const res = await getCurrentUser(token);

        console.log(res);

        if (res.success && res.data) {
            setUser(res.data);
            return true;
        }

        logout();
        return false;
    } catch (error) {
        console.log(error)
        logout();
        return false;
    }
};