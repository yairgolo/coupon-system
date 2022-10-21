import Category from "./Category";

class CouponModel {
    id: number;
    title: string;
    companyId: number;
    category: Category;
    description: string;
    startDate: string;
    endDate: string;
    amount: number;
    price: number;
    image: string;
}

export default CouponModel;