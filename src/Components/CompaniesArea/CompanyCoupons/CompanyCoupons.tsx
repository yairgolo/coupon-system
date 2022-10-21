import { SyntheticEvent, useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CouponCard from "../../SharedArea/CouponCard/CouponCard";
import "./CompanyCoupons.css";

function CompanyCoupons(): JSX.Element {

    useForceLogin(Role.Company);

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [originalsCoupons, setOriginalsCoupons] = useState<CouponModel[]>([]);


    useEffect(() => {
        const companyId = authStore.getState().user.id;
        companiesService.fetchCompanyCoupons(companyId)
            .then(coupons => {
                setCoupons([...coupons])
                setOriginalsCoupons([...coupons])
            })
            .catch(err => notificationService.error(err))
    }, [])

    function filterByPrice(args: SyntheticEvent) {
        const input = args.target as HTMLInputElement;
        const maxPrice = +input.value;
        if(input.value === "") {
            setCoupons(originalsCoupons);
        }
        else {
            const filteredCoupons = originalsCoupons.filter(c => c.price <= maxPrice);
            setCoupons(filteredCoupons);
        }
    }

    function filterByCategory(args: SyntheticEvent) {
        const select = args.target as HTMLInputElement;
        const category = select.value;
        if(category === "All") {
            setCoupons(originalsCoupons)
        }
        else {
            const filteredCoupons = originalsCoupons.filter(c => c.category === category);
            setCoupons(filteredCoupons);
        }
        
    }

    
    return (
        <div className="CompanyCoupons">
            <div className="Box">

            <label>Max Price</label>
            <input type="number" onChange={filterByPrice}/>

            <span> &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; </span>

            <label>Category: </label>
            <select defaultValue="" onChange={filterByCategory}>
                <option disabled value="">Select Category...</option>
                <option>All</option>
                <option>Food</option>
                <option>Clothings</option>
                <option>Toys</option>
                <option>Books</option>
                <option>Electricity</option>
                <option>Restaurant</option>
                <option>Vacation</option>
            </select>
            </div>

            <hr />

            {coupons.map(c => <CouponCard key={c.id} coupon={c} />)}
            
        </div>
    );
}

export default CompanyCoupons;
