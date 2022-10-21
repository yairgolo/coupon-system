import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import "./CouponCard.css";

interface CouponCardProps {
	coupon: CouponModel;
	buy?: (couponId: number) => void;
}

function CouponCard(props: CouponCardProps): JSX.Element {

	// const style = {
	// 	backgroundImage: `url(${props.coupon.image})`,
	// 	width: 200,
	// 	height: 200
	// };

    return (
        <div className="CouponCard Box" >
			<div>
				{props.coupon.title}<br />
				Description: {props.coupon.description}<br />
				Price: {props.coupon.price}
			</div>

			{
			authStore.getState().user.role === Role.Customer 
			 &&
			<div>
                <NavLink to={"/coupons/details/" + props.coupon.id}>
                <img src={props.coupon.image}/>
                </NavLink>
            </div>
			}
			{
			authStore.getState().user.role === Role.Company 
			 &&
			<div>
                <NavLink to={"/coupons/details/" + props.coupon.id}>
                <img src={props.coupon.image}/>
                </NavLink>
            </div>
			}

			{
				props.buy &&
				<div>
					<button onClick={() => props.buy(props.coupon.id)}>🛒</button>
				</div>
			}
        </div>
    );
}

export default CouponCard;
