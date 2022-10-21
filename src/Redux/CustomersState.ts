import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CustomersState {
    public coupons: CouponModel[] = [];
    public otherCoupons: CouponModel[] = [];
}

export enum CustomersActionType {
    FetchCoupons = "FetchCoupons",
    FetchOtherCoupons = "FetchOtherCoupons",
    BuyCoupons = "BuyCoupons"
}

export interface CustomersAction {
    type: CustomersActionType;
    payload: any;
}

export function fetchCouponsAction(coupons: CouponModel[]): CustomersAction {
    return {type: CustomersActionType.FetchCoupons, payload: coupons};
}

export function fetchOtherCouponsAction(coupons: CouponModel[]): CustomersAction {
    return {type: CustomersActionType.FetchOtherCoupons, payload: coupons};
}

export function buyCouponsAction(coupon: CouponModel): CustomersAction {
    return {type: CustomersActionType.BuyCoupons, payload: coupon};
}

export function customersReducer(currentState = new CustomersState(), action: CustomersAction): CustomersState {
    const newState = {...currentState};

    switch(action.type) {
        case CustomersActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;

        case CustomersActionType.FetchOtherCoupons:
            newState.otherCoupons = action.payload;
            break;

        case CustomersActionType.BuyCoupons:
            newState.coupons.push(action.payload);
            break;
    }

    return newState;
}

export const customersStore = createStore(customersReducer);