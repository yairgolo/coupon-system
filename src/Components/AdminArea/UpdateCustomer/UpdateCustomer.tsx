import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Role from "../../../Models/Role";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {

    useForceLogin(Role.Admin);

    const {register, handleSubmit, formState, setValue} = useForm<CustomerModel>();
    let navigate = useNavigate();
    const params = useParams();
    const cusId = +params.cusId;

    useEffect(() => {
        adminService.getOneCustomer(cusId)
            .then(customer => {
                setValue("id", customer.id);
                setValue("firstName", customer.firstName);
                setValue("lastName", customer.lastName);
                setValue("email", customer.email);
                setValue("password", customer.password);
            })
            .catch(err => notificationService.error(err));
    },[])

    async function update(customer: CustomerModel) {
        try {
            await adminService.updateCustomer(customer)
            notificationService.success("customer has been updated!")
            navigate("/admin/customers")
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }


    return (
        <div className="UpdateCustomer Box">
			 <form onSubmit={handleSubmit(update)}>
                <h2>Update customer</h2>

                <label>ID: </label>
                <input type="number" disabled {...register("id")} />

                <label>First name: </label>
                <input type="text" {...register("firstName",
                    {required: {value: true, message: "Missinf first name"},
                    minLength: {value: 2, message: "first name must be minimum 2 chars"},
                    maxLength: {value: 20, message: "first name can't exceed 20 chars"}
                })} />
                <span>{formState.errors?.firstName?.message}</span>
                
                <label>Last name: </label>
                <input type="text" {...register("lastName",
                    {required: {value: true, message: "Missing last name"},
                    minLength: {value: 2, message: "last name must be minimum 2 chars"},
                    maxLength: {value: 20, message: "last name can't exceed 20 chars"}
                })} />
                <span>{formState.errors?.lastName?.message}</span>
                
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

export default UpdateCustomer;
