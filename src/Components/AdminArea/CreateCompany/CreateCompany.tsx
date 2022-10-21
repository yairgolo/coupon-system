import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Role from "../../../Models/Role";
import { CompanyModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CreateCompany.css";

function CreateCompany(): JSX.Element {

    useForceLogin(Role.Admin);

    const {register, handleSubmit, formState} = useForm<CompanyModel>();

    let navigate = useNavigate();

    async function create(company: CompanyModel) {
        try {
            await adminService.createCompany(company);
            notificationService.success("company has been created!")
            navigate("/admin/companies")
        }
        catch (err: any) {
            notificationService.error(err);
        }
    }
    
    return (
        <div className="CreateCompany Box">
			<form onSubmit={handleSubmit(create)}>
                <h2>Create company</h2>

                <label>First name: </label>
                <input type="text" {...register("name",
                    {required: {value: true, message: "Missing name"},
                    minLength: {value: 2, message: "name must be minimum 2 chars"},
                    maxLength: {value: 20, message: "name can't exceed 20 chars"}
                })} />
                <span>{formState.errors?.name?.message}</span>
                
                <label>Email: </label>
                <input type="email" {...register("email",
                    {required: {value: true, message: "Missing email"},
                    minLength: {value: 8, message: "email must be minimum 8 chars"},
                    maxLength: {value: 20, message: "email can't exceed 20 chars"}
                })} />
                <span>{formState.errors?.email?.message}</span>

                
                <label>Password: </label>
                <input type="password" {...register("password",
                    {required: {value: true, message: "Missing password"},
                    minLength: {value: 4, message: "password must be minimum 4 chars"},
                    maxLength: {value: 20, message: "password can't exceed 20 chars"}
                })} />
                <span>{formState.errors?.password?.message}</span>

                <button className="btn">Create</button>


            </form>
        </div>
    );
}

export default CreateCompany;
