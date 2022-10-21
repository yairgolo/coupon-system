import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Role from "../../../Models/Role";
import { BaseUserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./Menu.css";

function Menu(): JSX.Element {

    const [user, setUser] = useState<BaseUserModel>();

    useEffect(() => {
        setUser(authStore.getState().user)

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })

        return () => {
            unsubscribe();
        }
    }, [])
    
    return (
        <div className="Menu">
            { authStore.getState().user &&
             <>
                            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" htmlFor="menu__toggle">
            <span></span>
            </label>

            <ul className="menu__box">
                { user?.role === Role.Customer &&
                    <>
                        <span>Customer Menu</span>
                        <li><NavLink className="menu__item" to="customers/my-coupons">See My Coupons</NavLink></li>
                        <li><NavLink className="menu__item" to="customers/buy-coupon">Buy Coupons</NavLink></li>
                    </>
                }

                {user?.role === Role.Company &&
                    <>
                        <span>Company Menu</span>
                        <li><NavLink className="menu__item" to="/companies/company-coupons">See Coupons</NavLink></li>
                        <li><NavLink className="menu__item" to="/companies/create-coupon">Create Coupon</NavLink></li>
                    </>
                }
                {user?.role === Role.Admin &&
                    <>
                        <span>Admin Menu</span>
                        <li><NavLink className="menu__item" to="admin/customers">See Customers</NavLink></li>
                        <li><NavLink className="menu__item" to="admin/companies">See Companies</NavLink></li>
                        <li><NavLink className="menu__item" to="admin/create-customer">Create Customer</NavLink></li>
                        <li><NavLink className="menu__item" to="admin/create-company">Create Company</NavLink></li>
                    </>}
            </ul>

             </>
            }

			
            {/* { user?.role === Role.Customer &&
                <>
                    <span>Customer Menu</span>
                    <NavLink to="customers/my-coupons">See My Coupons</NavLink>
                    <NavLink to="customers/buy-coupon">Buy Coupons</NavLink>
                </>
                }

            {user?.role === Role.Company &&
                <>
                    <span>Company Menu</span>
                    <NavLink to="/companies/company-coupons">See Coupons</NavLink>
                    <NavLink to="/companies/create-coupon">Create Coupons</NavLink>
                </>
                }
            {user?.role === Role.Admin &&
                <>
                    <span>Admin Menu</span>
                    <NavLink to="admin/customers">See Customers</NavLink>
                    <NavLink to="admin/companies">See Companies</NavLink>
                    <NavLink to="admin/create-customer">Create Customer</NavLink>
                    <NavLink to="admin/create-company">Create Company</NavLink>
                </>} */}
        </div>
    );
}

export default Menu;
