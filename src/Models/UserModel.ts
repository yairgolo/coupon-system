import CouponModel from "./CouponModel";
import Role from "./Role";

export abstract class BaseUserModel {
    public role: Role;
	public id: number;
    public email: string;
    public password: string;
}

export class CustomerModel extends BaseUserModel {
    public firstName: string;
    public lastName: string;
    public coupons: CouponModel[];
}

export class CompanyModel extends BaseUserModel {
    public name: string;
}

export class AdminModel extends BaseUserModel {
}
