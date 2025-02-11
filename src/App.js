import React, {useState} from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Login from "./Pages/Login/Login";
import {CreateProduct, Products, Sidebar} from "./Components";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="grid md:grid-cols-6">
            {!isLoginPage && (
                <div className="md:col-span-1">
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
                </div>
            )}

            <div
                className={`${isLoginPage ? "md:col-span-6" : "md:col-span-5"} bg-gradient-to-br from-[#0F2027]
                 via-[#203A43] to-[#2C5364] text-white`}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login"/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/product/create" element={<CreateProduct/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
