import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "../../Components";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {login} from "../../helpers/apis";
import {toast} from "react-toastify";
import {LoginSchema} from "./loginSchema/loginSchema";


const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const {data, status} = await login(values)
            if (status === 200) {
                toast.success("با موفقیت وارد شدید", {icon: "✅", theme: "colored"})
                localStorage.setItem("token", data.data.accessToken)
                navigate("/products")
            }
        } catch (err) {
            console.log("Error", err.message)
            toast.error("عملیات انجام نشد . لطفا دوباره تلاش کنید", {icon: "✅", theme: "colored"})
        } finally {
            setSubmitting(false)
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen login_bg">
            <div className=" w-full flex backdrop-blur-md justify-center h-screen items-center">
                <div className="bg-white/80 w-4/12 backdrop-blur-2xl p-6 rounded-xl shadow-lg">
                    <h1 className="text-2xl text-black font-bold text-center mb-4">ورود</h1>
                    <Formik
                        initialValues={{mobile: "", password: ""}}
                        validationSchema={LoginSchema}
                        onSubmit={(values, actions) => {
                            const formattedMobile = values.mobile.startsWith("+98")
                                ? values.mobile
                                : `+98${values.mobile.replace(/^0/, '')}`;
                            const afterValues = {mobile: formattedMobile, password: values.password};
                            handleSubmit(afterValues, actions);
                        }}>
                        {({errors, touched, isSubmitting}) => (
                            <Form className="space-y-4 ">
                                <div>
                                    <Field
                                        type="text"
                                        name="mobile"
                                        placeholder="شماره موبایل"
                                        className={`w-full  text-gray-800 placeholder:text-gray-800  p-3 rounded-lg border ${errors.mobile && touched.mobile ?
                                            'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500`}/>
                                    <ErrorMessage name="mobile" component="div" className="text-red-600 text-sm"/>
                                </div>

                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="رمز عبور"
                                        className={`w-full p-3 text-gray-800 placeholder:text-gray-800 rounded-lg border ${errors.password && touched.password ?
                                            'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500`}/>
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 -top-4 left-3 flex items-center text-gray-700 hover:text-gray-900"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <AiFillEyeInvisible className="w-5 h-5"/>
                                        ) : (
                                            <AiFillEye className="w-5 h-5 "/>
                                        )}
                                    </button>

                                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm"/>
                                </div>

                                <div className="flex justify-between items-center">
                                    <Link to="/forgot-password" className="text-indigo-600 text-sm">فراموشی رمز
                                        عبور؟</Link>
                                </div>

                                <Button type="submit"
                                        disabled={isSubmitting}
                                        className="w-full text-white p-3 rounded-lg transition">{isSubmitting ? "در حال ورود..." : "ورود"}</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;
