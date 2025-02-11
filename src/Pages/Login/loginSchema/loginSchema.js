import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    mobile: Yup.string()
        .matches(/^(?:\+98|0)?9\d{9}$/, "شماره موبایل نامعتبر است")
        .required("شماره موبایل الزامی است"),
    password: Yup.string()
        .min(4, "رمز عبور حداقل 4 کاراکتر باشد")
        .required("رمز عبور الزامی است"),
});
