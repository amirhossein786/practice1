import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {Button, CreateBg, UploadImage} from "../../../Components";
import {useEffect, useState} from "react";
import {addImages, createProduct, getAllCategories} from "../../../helpers/apis";
import {validationSchema} from "./validationSchema/createProduct";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const CreateProduct = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data, status} = await getAllCategories(1)
                if (status === 200) {
                    setCategories(data.data)
                }
            } catch (err) {
                console.log("Error fetching data", err.message);
            }
        }
        fetchData()
    }, []);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()
 const [images, setImages] = useState([]);

const handleSubmit = async (values) => {
    try {
        const { data, status } = await createProduct(values, localStorage.getItem("token"));

        if (status === 201) {
            const productId = data.data._id;

            if (images.length > 0) {
                const formData = new FormData();
                images.forEach((img) => formData.append("images", img.file));

                await addImages(productId, localStorage.getItem("token"), formData);
            }

            toast.success("✅ محصول با موفقیت ثبت شد", { theme: "colored" });
            navigate("/products");
        } else {
            toast.error("❌ ایجاد محصول با مشکل مواجه شد", { theme: "colored" });
        }
    } catch (err) {
        console.error("❌ Error creating product:", err.message);
        toast.error("❌ مشکلی در ایجاد محصول پیش آمد", { theme: "colored" });
    }
};
    return (
        <CreateBg title="افزودن محصول جدید">
           <UploadImage onImagesChange={setImages} />

            <Formik
                initialValues={{
                    titleFa: "", titleEn: "", descriptionFa: "", descriptionEn: "", price: "",
                    categoryId: "", details: [{key: "", value: ""}], entity: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({values, isSubmitting}) => (
                    <Form className="space-y-6  p-6 rounded-lg shadow-md text-gray-700 ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="text-gray-800 placeholder:text-gray-800">
                                <label className="block text-sm font-medium mb-1">عنوان محصول (فارسی)</label>
                                <Field name="titleFa"
                                       className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
                                <ErrorMessage name="titleFa" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <div className="text-gray-800 placeholder:text-gray-800">
                                <label className="block text-sm font-medium mb-1">عنوان محصول (انگلیسی)</label>
                                <Field name="titleEn"
                                       className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
                                <ErrorMessage name="titleEn" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                        </div>
                        <div className="text-gray-800 placeholder:text-gray-800">
                            <label className="block text-sm font-medium mb-1">توضیحات (فارسی)</label>
                            <Field as="textarea" name="descriptionFa"
                                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
                            <ErrorMessage name="descriptionFa" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="text-gray-800 placeholder:text-gray-800">
                            <label className="block text-sm font-medium mb-1">توضیحات (انگلیسی)</label>
                            <Field as="textarea" name="descriptionEn"
                                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
                            <ErrorMessage name="descriptionEn" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div>

                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 placeholder:text-gray-800">
                                <div>
                                    <label className="block text-sm font-medium mb-1">قیمت (تومان)</label>
                                    <Field name="price" type="number"
                                           className="w-full p-2 text-gray-800 placeholder:text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">انتخاب دسته‌بندی</label>
                                    <Field
                                        as="select"
                                        placeholder="انتخاب دسته بندی"
                                        name="categoryId"
                                        className="w-full placeholder:text-gray-800 text-gray-800 p-2 border rounded-lg
                                         focus:ring-2 focus:ring-blue-500">
                                        <option value="" className="text-gray-800">یک گزینه را انتخاب کنید</option>
                                        {categories.map((category) => (
                                            <option key={category._id} className="text-gray-800" value={category._id}>
                                                {category.titleFa}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="categoryId" component="div"
                                                  className="text-red-500 text-sm mt-1"/>
                                </div>

                            </div>
                        </div>
                        <div>
                            <FieldArray name="details">
                                {({push, remove}) => (
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">ویژگی‌های محصول</h3>
                                        {values.details.map((_, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 mb-2">
                                                <div className="flex flex-1 flex-col min-w-[200px]">
                                                    <Field
                                                        name={`details.${index}.key`}
                                                        placeholder="عنوان ویژگی"
                                                        className="p-2 border text-gray-800 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                                                    />
                                                    <ErrorMessage
                                                        name={`details.${index}.key`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"/>
                                                </div>
                                                <div className="flex flex-1 flex-col min-w-[200px]">
                                                    <Field
                                                        name={`details.${index}.value`}
                                                        placeholder="مقدار"
                                                        className="p-2 border rounded-lg text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                                                    />
                                                    <ErrorMessage
                                                        name={`details.${index}.value`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="bg-red-500 text-white px-4 py-2.5 rounded-lg">
                                                    ×
                                                </button>
                                            </div>

                                        ))}
                                        <Button
                                            type="button"
                                            onClick={() => push({key: "", value: ""})}
                                            className="mt-2">
                                            افزودن ویژگی
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        <div className="text-gray-800 placeholder:text-gray-800">
                            <label className="block text-sm font-medium mb-1">موجودی</label>
                            <Field name="entity" type="number"
                                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
                            <ErrorMessage name="entity" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <Button type="submit" className="w-full">{isSubmitting ? "در حال ثبت..." : "ثبت"}</Button>
                    </Form>
                )}
            </Formik>
        </CreateBg>
    );
};

export default CreateProduct;
