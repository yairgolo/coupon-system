import axios from "axios";
import { config } from "process";
import CouponModel from "../Models/CouponModel";
import { companiesStore, createCouponsAction, deleteCouponsAction, fetchCouponsAction, updateCouponsAction } from "../Redux/CompamiesState";
import appConfig from "../Utils/Config";

class CompaniesService {

    public async fetchCompanyCoupons(companyId: number): Promise<CouponModel[]> {
        if(companiesStore.getState().coupons.length === 0) {
            const response = await axios.get<CouponModel[]>(appConfig.companyCouponsUrl + companyId);
            const coupons = response.data;
            companiesStore.dispatch(fetchCouponsAction(coupons))
        }
        return companiesStore.getState().coupons;
    }

    public async createCoupons(coupon: CouponModel): Promise<CouponModel> {
        if(companiesStore.getState().coupons.find(c => c.title === coupon.title)) {
            throw new Error("The company has a coupon with the same title!") 
        }
        if(coupon.endDate < coupon.startDate) {
            throw new Error("The start date is before the end date!")             
        }
        const response = await axios.post<CouponModel>(appConfig.createCoupon, coupon);
        const newCoupon = response.data;
        companiesStore.dispatch(createCouponsAction(newCoupon))
        return newCoupon;
    }

    public async updateCoupons(coupon: CouponModel): Promise<CouponModel> {
        const response = await axios.put<CouponModel>(appConfig.updateCoupon, coupon);
        const newCoupon = response.data;
        companiesStore.dispatch(updateCouponsAction(newCoupon))
        return newCoupon;
    }

    public async getOneCoupon(id: number): Promise<CouponModel> {
        if(companiesStore.getState().coupons.length === 0) {
            const response = await axios.get<CouponModel>(appConfig.getCoupon + id);
            const coupon = response.data;
            return coupon;
        }
        const coupon = companiesStore.getState().coupons.find(c => c.id === id);
        return coupon; 
    }

    public async deleteCoupon(id: number): Promise<void> {
        await axios.delete<CouponModel>(appConfig.deleteCoupon + id);
        companiesStore.dispatch(deleteCouponsAction(id))
    }
}

const companiesService = new CompaniesService();

export default companiesService;