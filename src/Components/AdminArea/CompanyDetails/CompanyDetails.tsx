import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Role from "../../../Models/Role";
import { CompanyModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    useForceLogin(Role.Admin);

    const params = useParams();
    const comId = +params.comId;
    const navigate = useNavigate();

    const [company, setCompany] = useState<CompanyModel>();

    useEffect(() => {
        adminService.getOneCompany(comId)
            .then(company => setCompany(company))
            .catch(err => notificationService.error(err))
    },[])


    async function deleteCompany() {
        try {
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            await adminService.deleteCompany(company.id);
            notificationService.success("Company has been deleted")
            navigate("/admin/companies")
        } catch(err: any) {
            notificationService.error(err);
        }

    }
    return (
        <div className="CompanyDetails Box">
			{
            company &&
            <>
                <h3>ID: {company.id}</h3>
                <h3>Name: {company.name}</h3>
                <h3>Email: {company.email}</h3> 
                <br />

                <NavLink className="btn" to="/admin/companies">Back</NavLink>

                <span> | </span>
                <NavLink className="btn" to={"/admin/update-company/" + comId}>Update</NavLink>
                <span> | </span>
                <NavLink className="btn" to="" onClick={deleteCompany}>Delete</NavLink>            
            </>
            }
        </div>
    );
}

export default CompanyDetails;
