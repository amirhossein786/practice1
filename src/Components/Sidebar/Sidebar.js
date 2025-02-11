import React, {useState} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import {MdDashboard} from "react-icons/md";
import Logo from "./Logo.png";
import {SideLink} from "../index";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const links = [
        {
            id: 1,
            title: "محصولات",
            href: "/products",
            icon: <MdDashboard/>,
        },
        {
            id: 2,
            title: "دسته بندی محصول",
            href: "/product-category",
            icon: <MdDashboard/>,
        },
        {
            id: 3,
            title: "ورود",
            href: "/login",
            icon: <MdDashboard/>,
        },
    ];

    return (
        <div className="sticky top-0">
            <button
                className="fixed top-4 right-4 z-20 text-white bg-blue-600 p-2 rounded-full md:hidden"
                onClick={toggleSidebar}>
                {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
            </button>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={toggleSidebar}></div>
            )}
            <div
                className={`fixed top-0 right-0 bg-gradient-to-tr from-[#212121] via-[#202233] to-[#212121] h-screen text-white z-20 transform
                ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:translate-x-0
                md:static `}>
                <div>
                    <div className="flex items-center justify-around">
                        <h2 className="text-sm md:text-lg lg:text-xl font-bold text-[#ADADAD]">
                            مدیریت خلیج فارس
                        </h2>
                        <img
                            src={Logo}
                            alt="لوگو"
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"/>
                    </div>
                    <ul className="flex flex-col border-b border-gray-500 py-4">
                        {links.map((link) => (
                            <SideLink key={link.id} href={link.href} title={link.title}/>
                        ))}
                    </ul>
                </div>
                <button className="p-4 text-red-500 text-base px-7">خروج</button>
            </div>
        </div>
    );
}

export default Sidebar;
