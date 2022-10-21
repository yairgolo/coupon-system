import { Send } from "@mui/icons-material";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { lime } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CredentialsModel>();
    const navigate = useNavigate();
    const color = lime[500];

    async function send(credentials: CredentialsModel) {
        try{
            await authService.login(credentials);
            notificationService.success("Welcome Back!")
            navigate("/home")
        }
        catch(err: any) {
            notificationService.error(err)
        }
    }
    return (
        <div className="Login Box Container">

            <form onSubmit={handleSubmit(send)}>

                <h2>Login to coupon system</h2>

                <div className="role">
                <select defaultValue="" {...register("role",
                    {required: {value: true, message: "Missing role"}})}>
                    <option value="" disabled>User Type</option>
                    <option>Customer</option>
                    <option>Company</option>
                    <option>Admin</option>
                </select>
                </div> 
                <span>{formState.errors?.role?.message}</span>

                <div className="username">
                <a>📧</a>
                <input type="email" placeholder="Email" {...register("email",
                    {required: {value: true, message: "Missing email"}})} />
                </div>
                <span>{formState.errors?.email?.message}</span>

                <div className="password">
                <a>🔒</a>
                <input type="password" placeholder="Password" {...register("password",
                    {required: {value: true, message: "Missing password"}})} />
                </div>
                <span>{formState.errors?.password?.message}</span> <br />
                
                <button className="btn">Login</button>
            </form>
            
        </div>
    );
}

export default Login;
