import { useEffect, useState } from "react";
import Role from "../../../Models/Role";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CustomerCard from "../CustomerCard/CustomerCard";
import "./SeeCustomers.css";

function SeeCustomers(): JSX.Element {

    useForceLogin(Role.Admin);

    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    useEffect(() => {
        adminService.fetchCustomers().then(customers => setCustomers(customers))
            .catch(err => notificationService.error(err))
    },[])

    return (
        <div className="SeeCustomers">
			{customers.map(c => <CustomerCard key={c.id} customer={c} />)}
        </div>
    );
}

export default SeeCustomers;
