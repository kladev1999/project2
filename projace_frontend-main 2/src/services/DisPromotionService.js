import axios from "axios";
import authHeader from "./Auth-HeaderService";
const getDisPromotion = () => {
    return axios.get("http://localhost:8080/discountPromotion/getDiscount",{ headers: authHeader()});
}
const getDisPromotionByID = (discount_ID) => {
    return axios.get("http://localhost:8080/discountPromotion/getDiscountByID/" + discount_ID,{ headers: authHeader()});
}

const AddDiscount = (Discount) => {
    return axios.post("http://localhost:8080/discountPromotion/addDiscount", Discount,{ headers: authHeader()})
}

const DeleteDiscount = (discount_ID) => {
    return axios.delete("http://localhost:8080/discountPromotion/deleteMenu/" + discount_ID,{ headers: authHeader()});
}

const UpdateDiscount = (discount_ID, Discount) => {
    return axios.put("http://localhost:8080/discountPromotion/updatePromo/" + discount_ID, Discount,{ headers: authHeader()})
}

const DisPromotionService = {
    getDisPromotion,
    AddDiscount,
    DeleteDiscount,
    UpdateDiscount,
    getDisPromotionByID
}

export default DisPromotionService;