import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import customersService from "../../../Services/CustomersService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CouponCard from "../../SharedArea/CouponCard/CouponCard";
import "./BuyCoupons.css";

function BuyCoupons(): JSX.Element {

    useForceLogin(Role.Customer);


    const [coupons, setCoupons] = useState<CouponModel[]>([])

    useEffect(() => {
        customersService.fetchOtherCoupons()
            .then(coupons => setCoupons(coupons))
            .catch(err => notificationService.error(err));
    }, [])

    async function buyCoupon(couponId: number) {
        try{
            const coupon = await customersService.buyCoupons(couponId);
            notificationService.success(`Coupon ${coupon.title} has been purchased`);
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }
    
    return (
        <div className="BuyCoupons">
			{coupons.map(c => <CouponCard key={c.id} coupon={c} buy={buyCoupon}/>)}
        </div>
    );
}

export default BuyCoupons;
