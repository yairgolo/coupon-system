import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Role from "../../../Models/Role";
import { CompanyModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./UpdateCompany.css";

function UpdateCompany(): JSX.Element {

    useForceLogin(Role.Admin);

    const {register, handleSubmit, formState, setValue} = useForm<CompanyModel>();
    let navigate = useNavigate();
    const params = useParams();
    const comId = +params.comId;

    useEffect(() => {
        adminService.getOneCompany(comId)
            .then(company => {
                setValue("id", company.id);
                setValue("name", company.name);
                setValue("email", company.email);
                setValue("password", company.password);
            })
            .catch(err => notificationService.error(err));
    },[])

    async function update(company: CompanyModel) {
        try {
            await adminService.updateCompany(company)
            notificationService.success("company has been updated!")
            navigate("/admin/companies")
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }
    
    return (
        <div className="UpdateCompany Box">
			<form onSubmit={handleSubmit(update)}>
                <h2>Update company</h2>

                <label>ID: </label>
                <input type="number" disabled {...register("id")} />

                <label>Name: </label>
                <input type="text" disabled {...register("name")} />
                
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

                <button className="btn">Update</button>


            </form>
        </div>
    );
}

export default UpdateCompany;
