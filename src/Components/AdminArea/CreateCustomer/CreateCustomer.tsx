import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Role from "../../../Models/Role";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CreateCustomer.css";

function CreateCustomer(): JSX.Element {

    useForceLogin(Role.Admin);

    const {register, handleSubmit, formState} = useForm<CustomerModel>();

    let navigate = useNavigate();

    async function create(customer: CustomerModel) {
        try {
            await adminService.createCustomer(customer);
            notificationService.success("customer has been created!")
            navigate("/admin/customers")
        }
        catch (err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="CreateCustomer Box">
            <form onSubmit={handleSubmit(create)}>
                <h2>Create customer</h2>

                <label>First name: </label>
                <input type="text" {...register("firstName",
                    {required: {value: true, message: "Missing first name"},
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

                <button className="btn">Create</button>


            </form>
			
        </div>
    );
}

export default CreateCustomer;
