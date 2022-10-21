import { NavLink } from "react-router-dom";
import { CustomerModel } from "../../../Models/UserModel";
import "./CustomerCard.css";

interface CustomerCardProps {
	customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
    return (
        <div className="CustomerCard Box">
			<div>
                ID: {props.customer.id}<br/>
				First name: {props.customer.firstName}<br />
				Last name: {props.customer.lastName}<br />
                <NavLink to={"/admin/customers/details/" + props.customer.id}>🚹</NavLink>
			</div>
        </div>
    );
}

export default CustomerCard;
