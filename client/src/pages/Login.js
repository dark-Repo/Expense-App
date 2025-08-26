import { Form, Input, Button, Card, Typography, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/spinner";
import './Login.css'

import bgImage from "./bg.jpg";

const { Title, Text } = Typography;

export default function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post("/user/login", values);
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(data.user));
            message.success("Login Successful");
            navigate("/");
        } catch (error) {
            setLoading(false);
            message.error(error.message);
        }
    };

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
                flexDirection: "column",
                padding: "2rem",
                position: "relative",
                textAlign: "center"
            }}
        >
            {/* Page Header */}
            <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#fff",
                    textShadow: "0 2px 6px rgba(0,0,0,0.6)",
                    marginBottom: "2rem",
                }}
            >
                Expense Management
            </h1>

            {loading && <Spinner />}

            {/* Transparent & Blur Login Card */}
            <Card
                style={{
                    width: 400,
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <Title level={3} style={{ margin: 0, color: "#fff" }}>
                        Welcome Back
                    </Title>
                    <Text style={{ color: "#f0f0f0" }}>Login to continue</Text>
                </div>

                <Form layout="vertical" onFinish={submitHandler}>
                    <Form.Item
                        label={<span style={{ color: "white" }}>Email</span>}
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: "white" }}>Password</span>}
                        name="password"
                        rules={[{ required: true, message: "Please enter your password!" }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{ marginTop: "1rem", borderRadius: "6px" }}
                    >
                        Login
                    </Button>

                    <div style={{ marginTop: "1rem", textAlign: "center" }}>
                        <Text style={{ color: "#fff" }}>
                            Not a user? <Link to="/register">Register here</Link>
                        </Text>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
