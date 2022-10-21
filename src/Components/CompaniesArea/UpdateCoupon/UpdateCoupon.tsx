import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./UpdateCoupon.css";

function UpdateCoupon(): JSX.Element {

    useForceLogin(Role.Company);


    const {register, handleSubmit, formState, setValue} = useForm<CouponModel>()
    let navigate = useNavigate();
    const params = useParams();
    const coupId = +params.coupId;

    useEffect(() => {
        companiesService.getOneCoupon(coupId)
            .then(coupon => {
                setValue("title", coupon.title);
                setValue("description", coupon.description);
                setValue("category", coupon.category);
                setValue("startDate", coupon.startDate);
                setValue("endDate", coupon.endDate);
                setValue("amount", coupon.amount);
                setValue("price", coupon.price);
                setValue("image", coupon.image);
            })
            .catch(err => notificationService.error(err));
    },[])

    async function update(coupon: CouponModel) {
        try {
            coupon.id = coupId;
            coupon.companyId = authStore.getState().user.id;
            await companiesService.updateCoupons(coupon)
            notificationService.success("coupon has been updated!")
            navigate("/companies/company-coupons")
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }

    
    return (
        <div className="UpdateCoupon Box">
			<form onSubmit={handleSubmit(update)}>
                <h2>Update Coupon</h2>

                <label>Title: </label>
                <input type="text" {...register("title",
                    {required: {value: true, message: "Missing title"},
                    minLength: {value: 2, message: "name must be minimum 2 chars"},
                    maxLength: {value: 100, message: "name can't exceed 100 chars"}
                })}/>
                <span>{formState.errors?.title?.message}</span>

                <label>Description: </label>
                <input type="text" {...register("description",
                    {required: {value: true, message: "Missing description"},
                    minLength: {value: 2, message: "name must be minimum 2 chars"},
                    maxLength: {value: 100, message: "name can't exceed 100 chars"}
                })}/>
                <span>{formState.errors?.description?.message}</span>

                <label>Category: </label>
                <select defaultValue="" {...register("category",
                    {required: {value: true, message: "Missing category"}}
                    )}>
                    <option value="" disabled>category</option>
                    <option>Food</option>
                    <option>Clothing</option>
                    <option>Toys</option>
                    <option>Books</option>
                    <option>Electricity</option>
                    <option>Restaurant</option>
                    <option>Vacation</option>
                </select>
                <span>{formState.errors?.category?.message}</span>
                <br />
                <br />

                <label>Start Date: </label>
                <input type="date" {...register("startDate",
                    {required: {value: true, message: "Missing start date"}}
                )} />
                <span>{formState.errors?.startDate?.message}</span>


                <label>End Date: </label>
                <input type="date" {...register("endDate",
                    {required: {value: true, message: "Missing end date"}}
                )} />
                <span>{formState.errors?.endDate?.message}</span>

                <label>Amount: </label>
                <input type="number" {...register("amount",
                    {required: {value: true, message: "Missing amount"},
                    min: {value: 0, message: "amount can't be negative"},
                    max: {value: 1000, message: "amount can't exceed 1000"}
                })} />
                <span>{formState.errors?.amount?.message}</span>

                <label>Price: </label>
                <input type="number" step="0.01"{...register("price",
                    {required: {value: true, message: "Missing price"},
                    min: {value: 0, message: "price can't be negative"},
                    max: {value: 1000, message: "price can't exceed 1000"}
                })} />
                <span>{formState.errors?.price?.message}</span>

                <label>Image Url: </label>
                <input type="text" {...register("image",
                    {required: {value: true, message: "Missing image"},
                    minLength: {value: 10, message: "name must be minimum 10 chars"}
                })}/>
                <span>{formState.errors?.image?.message}</span>


                <button className="btn">Update</button>
            </form>
        </div>
    );
}

export default UpdateCoupon;
