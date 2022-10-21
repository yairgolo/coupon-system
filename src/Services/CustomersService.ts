import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { authStore } from "../Redux/AuthState";
import { companiesStore } from "../Redux/CompamiesState";
import { buyCouponsAction, customersStore, fetchCouponsAction, fetchOtherCouponsAction } from "../Redux/CustomersState";
import appConfig from "../Utils/Config";
import notificationService from "./NotificationService";

class CustomersService {

    public async fetchMyCoupons(): Promise<CouponModel[]> {
        if(customersStore.getState().coupons.length === 0){
            const response = await axios.get<CouponModel[]>(appConfig.customersMyCouponsUrl + authStore.getState().user.id);
            const coupons = response.data;
            customersStore.dispatch(fetchCouponsAction(coupons));
        }
        return customersStore.getState().coupons;
    }

    public async fetchOtherCoupons(): Promise<CouponModel[]> {
        if(customersStore.getState().otherCoupons.length === 0) {
            const response = await axios.get<CouponModel[]>(appConfig.customersOtherCouponsUrl);
            const coupons = response.data;
            customersStore.dispatch(fetchOtherCouponsAction(coupons))
        }
        return customersStore.getState().otherCoupons;
    }

    public async buyCoupons(couponId: number): Promise<CouponModel> {
        if(customersStore.getState().coupons.find(c => c.id === couponId)) {
            throw new Error("the user has already purchased the coupon!") 
        }        
        const response = await axios.post<CouponModel>(
            appConfig.customersBuyCouponsUrl + authStore.getState().user.id + "/" + couponId);
        const coupon = response.data;
        customersStore.dispatch(buyCouponsAction(coupon));
        return coupon;
    }
}

const customersService = new CustomersService();

export default customersService;