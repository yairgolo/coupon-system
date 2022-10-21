import { useEffect, useState } from "react";
import Role from "../../../Models/Role";
import { CompanyModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./SeeCompanies.css";

function SeeCompanies(): JSX.Element {

    useForceLogin(Role.Admin);

    const [companies, setCompanies] = useState<CompanyModel[]>([]);

    useEffect(() => {
        adminService.fetchCompanies().then(companies => setCompanies(companies))
            .catch(err => notificationService.error(err))
    },[])
    
    return (
        <div className="SeeCompanies">
			{companies.map(c => <CompanyCard key={c.id} company={c} />)}
        </div>
    );
}

export default SeeCompanies;
