import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import { BaseUserModel } from "../Models/UserModel";

// 1. state
export class AuthState {
    public token: string = null
    public user: BaseUserModel = null

    public constructor() {
        this.token = localStorage.getItem("token");
        if(this.token) {
            const container: {user: BaseUserModel} = jwtDecode(this.token);
            this.user = container.user;
        }
    }
}

// 2. Action Type
export enum AuthActionType {
    Login,
    Logout
}

// 3. Action
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// 4. Action Creators
export function loginAction(token: string): AuthAction {
    return {type: AuthActionType.Login, payload: token};
}
export function logoutAction(): AuthAction {
    return {type: AuthActionType.Logout};
}

// 5. Reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = {...currentState};
    switch(action.type) {
        case AuthActionType.Login:
            newState.token = action.payload;
            const container: {user: BaseUserModel} = jwtDecode(newState.token)
            newState.user = container.user;            
            localStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token")
            break;
    }

    return newState;
}

// 6. Store
export const authStore = createStore(authReducer);