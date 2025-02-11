import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {Link} from "react-router-dom";
import {Button} from "../../../Components";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {deleteProduct} from "../../../helpers/apis";
import {toast} from "react-toastify";
import {confirmAlert} from 'react-confirm-alert';
import {IoWarningOutline} from "react-icons/io5";

const Product = ({title, price, rate, entity, createdAt, id, removeProduct}) => {
    const removeProductHandler = async () => {
        try {
            const {data, status} = await deleteProduct(id, localStorage.getItem("token"));
            if (status === 200) {
                toast.success(data.messageFa, {icon: "✅", theme: 'colored'});
                removeProduct(id);
            } else {
                toast.error(data.messageFa, {icon: "❌", theme: 'colored'});
            }
        } catch (err) {
            console.log("error", err.message);
        }
    };

    const handleDeleteConfirm = () => {
        confirmAlert({
            customUI: ({onClose}) => (
                <div className="bg-white p-6 rounded-lg shadow-2xl text-center w-80 sm:w-96 animate-fade-in">
                    <div className="flex justify-center">
                        <IoWarningOutline className="text-red-600 text-5xl"/>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mt-4">حذف محصول</h2>
                    <p className="text-gray-600 mt-2">آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟</p>
                    <p className="text-red-500 text-sm mt-1">این عملیات قابل بازگشت نیست!</p>

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg transition-all duration-200 hover:bg-red-700 hover:scale-105"
                            onClick={() => {
                                removeProductHandler();
                                onClose();
                            }}>
                            حذف
                        </button>
                        <button
                            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 hover:bg-gray-400 hover:scale-105"
                            onClick={onClose}>
                            لغو
                        </button>
                    </div>
                </div>
            ),
        });
    };

    return (
        <>
            <td>{title}</td>
            <td className="flex justify-center">
                {Array(5)
                    .fill()
                    .map((_, index) =>
                        index < rate ? (
                            <AiFillStar key={index} className="text-yellow-400 text-lg"/>
                        ) : (
                            <AiOutlineStar key={index} className="text-gray-300 text-lg"/>
                        )
                    )}
            </td>
            <td>{price.toLocaleString()} تومان</td>
            <td>{entity > 0 ? "موجود" : "ناموجود"}</td>
            <td>{createdAt}</td>
            <td className="flex justify-center items-center gap-3 ">
                <Link to={`/product/edit/${id}`}>
                    <Button className="!px-3 !py-3 !rounded-full">
                        <FaRegEdit/>
                    </Button>
                </Link>
                <Button onClick={handleDeleteConfirm} className="!px-3 !py-3 !rounded-full">
                    <MdDelete/>
                </Button>
            </td>
        </>
    );
};

export default Product;
