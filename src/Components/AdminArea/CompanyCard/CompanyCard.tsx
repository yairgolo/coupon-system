import { NavLink } from "react-router-dom";
import { CompanyModel } from "../../../Models/UserModel";
import "./CompanyCard.css";

interface CompanyCardProps {
	company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard Box">
			ID: {props.company.id}<br/>
			Name: {props.company.name}<br />
			Email: {props.company.email}<br />
            <div><NavLink to={"/admin/companies/details/" + props.company.id}>🏢</NavLink></div>
        </div>
    );
}

export default CompanyCard;
