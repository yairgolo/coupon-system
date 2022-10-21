import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Role from "../Models/Role";
import { authStore } from "../Redux/AuthState";
import notificationService from "../Services/NotificationService";

function useForceLogin(role: Role) {

    const navigate = useNavigate();

    useEffect(() => {
        const login = role === authStore.getState().user.role;
        if(!login) {
            notificationService.error("You must login first by " + role)
            navigate("/home")
        }
    },[])
}

export default useForceLogin;