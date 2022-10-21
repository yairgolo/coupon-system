class Config {

}

class DevelopmentConfig extends Config {
    // public loginUrl = "http://localhost:3001/api/auth/login/"
    public loginUrl = "http://localhost:8080/login"
    public createCoupon = "http://localhost:8080/company/create-coupon"
    public updateCoupon = "http://localhost:8080/company/update-coupon"
    public deleteCoupon = "http://localhost:8080/company/delete-coupon/"
    public getCoupon = "http://localhost:8080/company/get-coupon/"
    public getAllCustomers = "http://localhost:8080/admin/get-all-customers"
    public getOneCustomers = "http://localhost:8080/admin/get-customer/"
    public createCustomer = "http://localhost:8080/admin/create-customer"
    public updateCustomer = "http://localhost:8080/admin/update-customer"
    public deleteCustomer = "http://localhost:8080/admin/delete-customer/"
    public getAllCompanies = "http://localhost:8080/admin/get-all-companies"
    public getOneCompany = "http://localhost:8080/admin/get-company/"
    public createCompany = "http://localhost:8080/admin/create-company"
    public updateCompany = "http://localhost:8080/admin/update-company"
    public deleteCompany = "http://localhost:8080/admin/delete-company/"
    public customersMyCouponsUrl = "http://localhost:8080/customer/get-my-coupons/"
    public customersOtherCouponsUrl = "http://localhost:8080/customer/get-all"
    public customersBuyCouponsUrl = "http://localhost:8080/customer/buy-coupon/"
    public companyCouponsUrl = "http://localhost:8080/company/get-all-coupons/"
}

class ProductionConfig extends Config {
    // public loginUrl = "http://localhost:3001/api/auth/login/"
    public loginUrl = "http://localhost:8080/login"
    public createCoupon = "http://localhost:8080/company/create-coupon"
    public updateCoupon = "http://localhost:8080/company/update-coupon"
    public deleteCoupon = "http://localhost:8080/company/delete-coupon/"
    public getCoupon = "http://localhost:8080/company/get-coupon/"
    public getAllCustomers = "http://localhost:8080/admin/get-all-customers"
    public getOneCustomers = "http://localhost:8080/admin/get-customer/"
    public createCustomer = "http://localhost:8080/admin/create-customer"
    public updateCustomer = "http://localhost:8080/admin/update-customer"
    public deleteCustomer = "http://localhost:8080/admin/delete-customer/"
    public getAllCompanies = "http://localhost:8080/admin/get-all-companies"
    public getOneCompany = "http://localhost:8080/admin/get-company/"
    public createCompany = "http://localhost:8080/admin/create-company"
    public updateCompany = "http://localhost:8080/admin/update-company"
    public deleteCompany = "http://localhost:8080/admin/delete-company/"
    public customersMyCouponsUrl = "http://localhost:8080/customer/get-my-coupons/"
    public customersOtherCouponsUrl = "http://localhost:8080/customer/get-all"
    public customersBuyCouponsUrl = "http://localhost:8080/customer/buy-coupon/"
    public companyCouponsUrl = "http://localhost:8080/company/get-all-coupons/"
}


const appConfig = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default appConfig;