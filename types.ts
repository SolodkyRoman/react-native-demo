import {UserState} from "./modules/user/types";

export interface AppState {
    user: UserState
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignUpData {
    email: string;
    password: string;
    name: string;
}