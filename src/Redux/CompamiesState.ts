import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CompaniesState {
    public coupons: CouponModel[] = [];
}

export enum CompaniesActionType {
    FetchCoupons = "FetchCoupons",
    CreateCoupons = "CreateCoupons",
    UpdateCoupon = "UpdateCoupon",
    DeleteCoupon = "DeleteCoupon"
}

export interface CompaniesAction {
    type: CompaniesActionType;
    payload: any;
}

export function fetchCouponsAction(coupons: CouponModel[]): CompaniesAction {
    return {type: CompaniesActionType.FetchCoupons, payload: coupons};
}

export function createCouponsAction(coupon: CouponModel): CompaniesAction {
    return {type: CompaniesActionType.CreateCoupons, payload: coupon};
}

export function updateCouponsAction(coupon: CouponModel): CompaniesAction {
    return {type: CompaniesActionType.UpdateCoupon, payload: coupon};
}

export function deleteCouponsAction(id: number): CompaniesAction {
    return {type: CompaniesActionType.DeleteCoupon, payload: id};
}

export function CompaniesReducer(currentState = new CompaniesState(), action: CompaniesAction): CompaniesState {
    const newState = {...currentState};

    switch(action.type) {
        case CompaniesActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;

        case CompaniesActionType.CreateCoupons:
            newState.coupons.push(action.payload);
            break;

        case CompaniesActionType.UpdateCoupon:
            const indexToUpdate = newState.coupons.findIndex(c => c.id === action.payload.id);
            if(indexToUpdate >= 0) newState.coupons[indexToUpdate] = action.payload;
            break;

        case CompaniesActionType.DeleteCoupon:
            const indexToDelete = newState.coupons.findIndex(c => c.id === action.payload);
            if(indexToDelete >= 0) newState.coupons.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

export const companiesStore = createStore(CompaniesReducer);