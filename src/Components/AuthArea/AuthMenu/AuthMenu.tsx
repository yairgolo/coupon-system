import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Role from "../../../Models/Role";
import { BaseUserModel, CompanyModel, CustomerModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<BaseUserModel>();

    let navigate = useNavigate();

    useEffect(() => {

        setUser(authStore.getState().user)

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    // function for log out if the token is expired
    useEffect(() => {
        const logoutId = setInterval(() => {
            if(authStore.getState().token) {
                const token = authStore.getState().token
                const expTime: {exp: number} = jwtDecode(token)
                var date = new Date(expTime.exp * 1000)
                if(date < new Date()) {
                    navigate("/logout")
                    alert("the time is over, please log in again...")
                }
            }
        }, 300000)

        return () => {
            clearInterval(logoutId);
        }

    },[])
    

    function getDetails(): string {
        switch(user.role) {
            case Role.Customer:
                const customer = user as CustomerModel;
                return "Customer: " + customer.firstName + " " + customer.lastName;

            case Role.Company:
                const company = user as CompanyModel;
                return "Company: " + company.name;

            default:
                return "Admin: " + user.email;
        }
    }

    return (
        <div className="AuthMenu">

			{
                !user && <>
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                </>
            }

            {
                user && <>
                    <span>{getDetails()} | </span>
                    <NavLink to="/logout">Logout</NavLink>
                </>
            }

        </div>
    );
}

export default AuthMenu;
