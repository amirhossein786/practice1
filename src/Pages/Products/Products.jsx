import {useEffect, useState} from "react";
import {getAllProduct} from "../../helpers/apis";
import {Link} from "react-router-dom";
import {Button, Product} from "../../Components";

const formatDate = (dateString) => {
    if (!dateString) return "نامشخص";
    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(new Date(dateString));
};

const Products = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const {data} = await getAllProduct(1)
                if (!data?.data) {
                    console.error("No data received");
                    setProducts([]);
                    return;
                }
                const formattedProducts = data.data.map((product) => ({
                    ...product,
                    createdAt: formatDate(product.createdAt),
                }));
                setProducts(formattedProducts);
            } catch (err) {
                console.error("Error fetching products:", err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const removeProduct = (productId) => {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    };

    return (
        <div className="space-y-14 w-full flex flex-col items-center text-white">
            <div className="flex justify-between w-11/12 mt-16">
                <h1 className="text-2xl font-bold">محصولات</h1>
                <Link to="/product/create">
                    <Button>اضافه کردن محصول</Button>
                </Link>
            </div>

            {isLoading ? (
                <p>در حال بارگذاری...</p>
            ) : products.length === 0 ? (
                <p>هیچ محصولی یافت نشد.</p>
            ) : (
                <table className="bg-table-color rounded-2xl w-11/12 text-white">
                    <thead>
                    <tr className="border-b-2 text-center [&_th]:p-4 [&_th]:w-1/6">
                        <th>عنوان</th>
                        <th>امتیاز</th>
                        <th>قیمت</th>
                        <th>موجودیت</th>
                        <th>تاریخ ایجاد</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product._id}
                            className="border-b last:border-none [&_td]:p-4 border-gray-400 text-center">
                            <Product
                                id={product._id}
                                title={product.titleFa}
                                price={product.price}
                                rate={product.rate}
                                entity={product.entity}
                                createdAt={product.createdAt}
                                removeProduct={removeProduct}
                            />
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Products;
