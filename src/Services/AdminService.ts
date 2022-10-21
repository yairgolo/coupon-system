import axios from "axios";
import { CompanyModel, CustomerModel } from "../Models/UserModel";
import { adminStore, createCompanyAction, createCustomerAction, deleteCompanyAction, deleteCustomerAction, fetchCompaniesAction, fetchCustomersAction, updateCompanyAction, updateCustomerAction } from "../Redux/AdminState";
import appConfig from "../Utils/Config";

class AdminService {

    public async fetchCustomers(): Promise<CustomerModel[]> {
        if(adminStore.getState().customers.length === 0) {
            const response = await axios.get<CustomerModel[]>(appConfig.getAllCustomers);
            const customers = response.data;
            adminStore.dispatch(fetchCustomersAction(customers))
        }
        return adminStore.getState().customers;
    }
    public async getOneCustomer(id: number): Promise<CustomerModel> {
        if(adminStore.getState().customers.length === 0) {
            const response = await axios.get<CustomerModel>(appConfig.getOneCustomers + id);
            const customer = response.data;
            return customer; 
        }
        const customer = adminStore.getState().customers.find(c => c.id === id);
        return customer;
    }

    public async createCustomer(customer: CustomerModel): Promise<CustomerModel> {
        if(adminStore.getState().customers.find(c => c.email === customer.email)) {
            throw new Error("the customer with email: " + customer.email + " is exists!!") 
        }
        const response = await axios.post<CustomerModel>(appConfig.createCustomer, customer);
        const newCustomer = response.data;
        adminStore.dispatch(createCustomerAction(newCustomer))
        return newCustomer;
    }

    public async updateCustomer(customer: CustomerModel): Promise<void> {
        const response = await axios.put<CustomerModel>(appConfig.updateCustomer, customer);
        const newCustomer = response.data;
        adminStore.dispatch(updateCustomerAction(newCustomer));
    }

    public async deleteCustomer(id: number): Promise<void> {
        await axios.delete<CustomerModel>(appConfig.deleteCustomer + id)
        adminStore.dispatch(deleteCustomerAction(id))
    }

    public async fetchCompanies(): Promise<CompanyModel[]> {
        if(adminStore.getState().companies.length === 0) {
            const response = await axios.get<CompanyModel[]>(appConfig.getAllCompanies);
            const companies = response.data;
            adminStore.dispatch(fetchCompaniesAction(companies))
        }
        return adminStore.getState().companies;
    }

    public async getOneCompany(id: number): Promise<CompanyModel> {
        if(adminStore.getState().companies.length === 0) {
            const response = await axios.get<CompanyModel>(appConfig.getOneCompany + id);
            const company = response.data;
            return company;
        }
        const company = adminStore.getState().companies.find(c => c.id === id);
        return company;
    }

    public async createCompany(company: CompanyModel): Promise<CompanyModel> {
        if(adminStore.getState().companies.find(c => c.email === company.email)) {
            throw new Error("the customer with email: " + company.email + " is exists!!") 
        }
        if(adminStore.getState().companies.find(c => c.name === company.name)) {
            throw new Error("the customer with name: " + company.name + " is exists!!") 
        }
        const response = await axios.post<CompanyModel>(appConfig.createCompany, company);
        const newCompany = response.data;
        adminStore.dispatch(createCompanyAction(newCompany))
        return newCompany;
    }

    public async updateCompany(company: CompanyModel): Promise<void> {      
        if(adminStore.getState().companies.find(c => c.id === company.id)) {
            if(company.name != adminStore.getState().companies.find(c => c.id === company.id).name) {
                throw new Error("you cant update the company name!!") 
            }
        }  
        const response = await axios.put<CompanyModel>(appConfig.updateCompany, company);
        const newCompany = response.data;
        adminStore.dispatch(updateCompanyAction(newCompany));
    }

    public async deleteCompany(id: number): Promise<void> {
        await axios.delete<CompanyModel>(appConfig.deleteCompany + id);
        adminStore.dispatch(deleteCompanyAction(id));
    }

}

const adminService = new AdminService();

export default adminService;