export interface UserState {
    userId?: string;
    token?: string;
    roomId?: string;
    isLoading: boolean;
    error?: string;
    roomData?: object;
    userName?: string;
    isRefreshLoading?: boolean;
    userAvatar?: string;
}
