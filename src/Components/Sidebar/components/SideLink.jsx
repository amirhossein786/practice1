import React from "react";
import {Link} from "react-router-dom";

const SideLink = ({href, title}) => {
    return (
        <Link to={href}>
            <li className="flex hover:bg-gray-700 p-2 py-6 flex-col gap-2 text-xl">
                <div className="flex">
                    <span className="">{title}</span>
                </div>
            </li>
        </Link>
    );
};

export default SideLink;