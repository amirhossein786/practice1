import * as Yup from "yup";

export const validationSchema = Yup.object({
        titleFa: Yup.string().required("وارد کردن عنوان فارسی الزامی است"),
        titleEn: Yup.string().required("وارد کردن عنوان انگلیسی الزامی است"),
        descriptionFa: Yup.string().required("توضیحات فارسی را وارد کنید"),
        descriptionEn: Yup.string().required("توضیحات انگلیسی را وارد کنید"),
        price: Yup.number().required("قیمت را وارد کنید").positive("قیمت باید عدد مثبت باشد"),
        categoryId: Yup.string().required("انتخاب دسته‌بندی الزامی است"),
        details: Yup.array()
            .of(
                Yup.object().shape({
                    key: Yup.string().required("عنوان ویژگی اجباری است"),
                    value: Yup.string().required("مقدار ویژگی اجباری است"),
                })
            )
            .min(1, "حداقل یک ویژگی اضافه کنید"),
        entity: Yup.number().required("تعداد موجودی را مشخص کنید"),
    });