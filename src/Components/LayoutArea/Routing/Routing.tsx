import { Navigate, Route, Routes } from "react-router-dom";
import CompanyDetails from "../../AdminArea/CompanyDetails/CompanyDetails";
import CreateCompany from "../../AdminArea/CreateCompany/CreateCompany";
import CreateCustomer from "../../AdminArea/CreateCustomer/CreateCustomer";
import CustomerDetails from "../../AdminArea/CustomerDetails/CustomerDetails";
import SeeCompanies from "../../AdminArea/SeeCompanies/SeeCompanies";
import SeeCustomers from "../../AdminArea/SeeCustomers/SeeCustomers";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import CompanyCoupons from "../../CompaniesArea/CompanyCoupons/CompanyCoupons";
import CreateCoupons from "../../CompaniesArea/CreateCoupons/CreateCoupons";
import UpdateCoupon from "../../CompaniesArea/UpdateCoupon/UpdateCoupon";
import BuyCoupons from "../../CustomersArea/BuyCoupons/BuyCoupons";
import CustomersCoupon from "../../CustomersArea/CustomersCoupon/CustomersCoupon";
import Home from "../../HomeArea/Home/Home";
import CouponDetails from "../../SharedArea/CouponDetails/CouponDetails";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>

                {/* Login */}
                <Route path="/login" element={<Login />} />
                {/* Logout */}
                <Route path="logout" element={<Logout />} />

                {/* Home */}
                <Route path="/home" element={<Home />}/>

                {/* Customers */}
                <Route path="customers/my-coupons" element={<CustomersCoupon />} />
                <Route path="customers/buy-coupon" element={<BuyCoupons />} />

                {/* Companies */}
                <Route path="/companies/company-coupons" element={<CompanyCoupons />} />
                <Route path="/companies/create-coupon" element={<CreateCoupons />} />
                <Route path="/companies/update-coupon/:coupId" element={<UpdateCoupon />} />

                {/* Admin */}
                <Route path="/admin/customers" element={<SeeCustomers />} />
                <Route path="/admin/customers/details/:cusId" element={<CustomerDetails />} />
                <Route path="admin/create-customer" element={<CreateCustomer />} />
                <Route path="/admin/update-customer/:cusId" element={<UpdateCustomer />} />
                <Route path="/admin/companies" element={<SeeCompanies />} />
                <Route path="/admin/companies/details/:comId" element={<CompanyDetails />} />
                <Route path="/admin/update-company/:comId" element={<UpdateCompany />} />
                <Route path="admin/create-company" element={<CreateCompany />} />


                {/* Coupons */}
                <Route path="/coupons/details/:coupId" element={<CouponDetails />} />


                {/* Default route */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found route */}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
