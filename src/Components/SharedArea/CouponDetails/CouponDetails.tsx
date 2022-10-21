import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {

    const params = useParams();
    const coupId = +params.coupId;
    const navigate = useNavigate();

    const [coupon, setCoupon] = useState<CouponModel>();

    useEffect(() => {
        companiesService.getOneCoupon(coupId)
            .then(coupon => setCoupon(coupon))
            .catch(err => notificationService.error(err))
    },[]);

    async function deleteCoupon() {
        try {
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            await companiesService.deleteCoupon(coupon.id);
            notificationService.success("Coupon has been deleted")
            navigate("/companies/company-coupons")
        } catch(err: any) {
            notificationService.error(err);
        }
    }

    
    return (
        <div className="CouponDetails Box">
			{
            coupon && 
            <>
            <h2 className="Box">{coupon.title}</h2>
			<h3>Description: {coupon.description}</h3>
			<h3>Start Date: {coupon.startDate}</h3>
			<h3>End Date: {coupon.endDate}</h3>
			<h3>Category: {coupon.category}</h3>
			<h3>Amount: {coupon.amount}</h3>
			<h3>Price: {coupon.price}</h3>
            <img src={coupon.image}/>

            <br />
            <br />

            {
                authStore.getState().user.role === Role.Customer && 
                <NavLink className="btn" to="/customers/buy-coupon">Back</NavLink>
            }

            {
                authStore.getState().user.role === "Company" &&
                <>
                    <NavLink className="btn" to="/companies/company-coupons">Back</NavLink>
                    <span> | </span>
                    <NavLink className="btn" to={"/companies/update-coupon/" + coupId}>Update</NavLink>
                    <span> | </span>
                    <NavLink className="btn" to="" onClick={deleteCoupon}>Delete</NavLink>
                    
                </>
            }
            </>
            }
        </div>
    );
}

export default CouponDetails;
