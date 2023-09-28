import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../Images/logo.png";
import { useToast } from "@chakra-ui/react";
import "../Styles/Navbar.css";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "@chakra-ui/react";

let isAuth = JSON.parse(localStorage.getItem("isAuth")) || false;

const Navbar = () => {
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const handlelogoutUser = () => {
        window.localStorage.clear();
        localStorage.removeItem("isAuth");
        localStorage.removeItem("loggedInUser");
        navigate("/");
        toast({
            title: "LogOut SuccessFully.",

            status: "success",
            duration: 4000,
            position: "top",
        });
    };

    return (
        <div className="nav_container">
            <div className="logo_div">
                <Link to="/" className="logo">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            <div className="dropdown-menu">
                <button className="hover-account">
                    <Tooltip hasArrow bg="gray.300" color="black">
                        <FaUserCircle />
                    </Tooltip>
                    {isAuth === true
                        ? localStorage.getItem("loggedInUser")
                        : ""}
                </button>
                {isAuth === false ? (
                    <ul className="all-log">
                        <li className="log">
                            <Link
                                to="/login"
                                smooth={true}
                                offset={-100}
                                duration={500}>
                                Admin
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul onClick={handlelogoutUser} className="all-log">
                        <li className="log">Logout</li>
                    </ul>
                )}
            </div>

            <button
                className="nav_toggle_btn"
                onClick={() => setIsShow(!isShow)}>
                {isShow ? <MdOutlineClose /> : <FaBars />}
            </button>
        </div>
    );
};

export default Navbar;
