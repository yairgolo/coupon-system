import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";
import { CompanyModel, CustomerModel } from "../Models/UserModel";

export class AdminState {
    public customers: CustomerModel[] = [];
    public companies: CompanyModel[] = [];
}

export enum AdminActionType {
    FetchCustomers = "FetchCustomers",
    CreateCustomer = "CreateCustomer",
    UpdateCustomer = "UpdateCustomer",
    DeleteCustomer = "DeleteCustomer",
    FetchCompanies = "FetchCompanies",
    CreateCompany = "CreateCompany",
    UpdateCompany = "UpdateCompany",
    DeleteCompany = "DeleteCompany"
}

export interface AdminAction {
    type: AdminActionType;
    payload: any;
}

export function fetchCustomersAction(customers: CustomerModel[]): AdminAction {
    return {type: AdminActionType.FetchCustomers, payload: customers};
}

export function createCustomerAction(customer: CustomerModel): AdminAction {
    return {type: AdminActionType.CreateCustomer, payload: customer};
}

export function updateCustomerAction(customer: CustomerModel): AdminAction {
    return {type: AdminActionType.UpdateCompany, payload: customer};
}

export function deleteCustomerAction(id: number): AdminAction {
    return {type: AdminActionType.DeleteCustomer, payload: id};
}

export function fetchCompaniesAction(companies: CompanyModel[]): AdminAction {
    return {type: AdminActionType.FetchCompanies, payload: companies};
}

export function createCompanyAction(company: CompanyModel): AdminAction {
    return {type: AdminActionType.CreateCompany, payload: company};
}

export function updateCompanyAction(company: CompanyModel): AdminAction {
    return {type: AdminActionType.UpdateCompany, payload: company};
}

export function deleteCompanyAction(id: number): AdminAction {
    return {type: AdminActionType.DeleteCompany, payload: id};
}


export function adminReducer(currentState = new AdminState(), action: AdminAction): AdminState {
    const newState = {...currentState};

    switch(action.type) {
        case AdminActionType.FetchCustomers:
            newState.customers = action.payload;
            break;

        case AdminActionType.CreateCustomer:
            newState.customers.push(action.payload);
            break;

        case AdminActionType.UpdateCustomer:
            const indexToUpdateCustomer = newState.customers.findIndex(c => c.id === action.payload.id);
            if(indexToUpdateCustomer >= 0) newState.customers[indexToUpdateCustomer] = action.payload;
            break;

        case AdminActionType.DeleteCustomer:
            const indexToDeleteCustomer = newState.customers.findIndex(c => c.id === action.payload);
            if(indexToDeleteCustomer >= 0) newState.customers.splice(indexToDeleteCustomer, 1);
            break;

        case AdminActionType.FetchCompanies:
            newState.companies = action.payload;
            break;

        case AdminActionType.CreateCompany:
            newState.companies.push(action.payload);
            break;

        case AdminActionType.UpdateCompany:
            const indexToUpdateCompany = newState.companies.findIndex(c => c.id === action.payload.id);
            if(indexToUpdateCompany >= 0) newState.companies[indexToUpdateCompany] = action.payload;
            break;

        case AdminActionType.DeleteCompany:
            const indexToDeleteCompany = newState.companies.findIndex(c => c.id === action.payload);
            if(indexToDeleteCompany >= 0) newState.companies.splice(indexToDeleteCompany, 1);
            break;
    }

    return newState;
}

export const adminStore = createStore(adminReducer);