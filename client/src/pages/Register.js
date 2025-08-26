//import { Route, Routes } from "react-router-dom";
import './Register.css'
import { Form, Input, message } from "antd"
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";

// 👇 Import the same background image
import bgImage from "./bg.jpg";

export default function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    //form submit
    const submitHandler = async (values) => {
        try {
            setLoading(true)
            await axios.post('/user/register', values)

            message.success('registration successful')
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            message.error('invalid username or password')
        }
    }

    //prevent for login user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }
    }, [navigate]);

    return (
        <div
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                flexDirection: "column",
            }}
        >
            {loading && <Spinner />}

            <Form
                layout="vertical"
                onFinish={submitHandler}
                style={{
                    width: 400,
                    padding: "2rem",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "1.5rem",
                        color: "#fff",
                        textShadow: "0 2px 6px rgba(0,0,0,0.6)",
                    }}
                >
                    Sign Up
                </h1>

                <Form.Item
                    label={<span style={{ color: "white" }}>Name</span>}
                    name='name'
                    rules={[{ required: true, message: "Please enter your name!" }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label={<span style={{ color: "white" }}>Email</span>}
                    name='email'
                    rules={[{ required: true, message: "Please enter your email!" }]}
                >
                    <Input type="email" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label={<span style={{ color: "white" }}>Password</span>}
                    name='password'
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input type="password" placeholder="Enter your password" />
                </Form.Item>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1rem",
                    }}
                >
                    <Link to="/login" style={{ color: "white" }}>
                        Already registered? Click here to login
                    </Link>
                    <button className="btn btn-primary">Register</button>
                </div>
            </Form>
        </div>
    )
}
