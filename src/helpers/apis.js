import axios from "axios";

const BASE_URL = "https://khalij-fars-mobile.liara.run/api/v1";

//# region Products
export const getAllProduct = (page ) => {
    const url = `${BASE_URL}/product/all?page=${page}`;
    return axios.get(url);
}
export const deleteProduct = (productId ,ac_token) => {
    const url = `${BASE_URL}/product?_id=${productId}`;
    return axios.delete(url , {
        headers : {Authorization: `Bearer ${ac_token}`},
    });
}
export const createProduct = (values ,ac_token) => {
    const url = `${BASE_URL}/product`;
    return axios.post(url , values, {
        headers : {Authorization: `Bearer ${ac_token}`},
    });
}
export const addImages = (id, ac_token, images) => {
    const url = `${BASE_URL}/product/add-images?_id=${id}`;
    return axios.put(url, images , {  // ارسال تصاویر به عنوان یک لیست
        headers: { Authorization: `Bearer ${ac_token}` },
    });
};


//#end region


//# Product category region
export const getAllCategories = (page) => {
    const url = `${BASE_URL}/product-category/all?page=${page}`;
    return axios.get(url);
}
//#end region



//# region auth
export const login = (values) => {
    const url = `${BASE_URL}/auth/login`;
    return axios.post(url , values);
}
//# end auth
