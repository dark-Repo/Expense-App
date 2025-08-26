import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import './nav.css'
export default function Header() {
    const [loginUser, setLoginUser] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setLoginUser(user);

        }
    }, []);


    const logoutHandler = () => {
        localStorage.removeItem("user");
        message.success("Logout Successfully");
        navigate("/login");
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg  " style={{ height: '7vh' }}>
                <div className="container-fluid mx-5" style={{ alignItems: 'center', display: 'flex' }}>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01" style={{ backgroundcolor: "#0B0F1A" }}>
                        <Link className="navbar-brand " to="/">
                            <h5 className="h5"> Expense Management</h5>
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item d-flex align-items-center" >
                                {" "}
                                <p className="nav-link ">{loginUser && loginUser.name}</p>{" "}
                            </li>
                            <li className="nav-item d-flex align-items-center" >
                                <button className="btn btn-primary" onClick={logoutHandler}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}