import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Role from "../../../Models/Role";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CouponCard from "../../SharedArea/CouponCard/CouponCard";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    useForceLogin(Role.Admin);

    const params = useParams();
    const cusId = +params.cusId;
    const navigate = useNavigate();

    const [customer, setCustomer] = useState<CustomerModel>();

    useEffect(() => {
        adminService.getOneCustomer(cusId)
            .then(customer => setCustomer(customer))
            .catch(err => notificationService.error(err))
    },[])

    async function deleteCustomer() {
        try {
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            await adminService.deleteCustomer(customer.id);
            notificationService.success("Customer has been deleted")
            navigate("/admin/customers")
        } catch(err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="CustomerDetails Box">
            {
            customer &&
            <>
                <h3>ID: {customer.id}</h3>
                <h3>First name: {customer.firstName}</h3>
                <h3>Last name: {customer.lastName}</h3>
                <h3>Email: {customer.email}</h3> 
                {customer.coupons.map(c => <CouponCard key={c.id} coupon={c} />)}
                <br />

                <NavLink className="btn" to="/admin/customers">Back</NavLink>

                <span> | </span>
                <NavLink className="btn" to={"/admin/update-customer/" + cusId}>Update</NavLink>
                <span> | </span>
                <NavLink className="btn" to="" onClick={deleteCustomer}>Delete</NavLink>
                <br />
            </>
            }
			
        </div>
    );
}

export default CustomerDetails;
