import { Form, Input, Button, Card, Typography, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/spinner";
import './Login.css'

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
                /* backgroundColor: "#0B0F1A",*/
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                flexDirection: "column",
            }}
        >
            <h4 className="tit">Expense Management </h4>
            {loading && <Spinner />}
            <Card
                style={{
                    width: 400,
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>

                    <Title level={3} style={{ margin: 0 }}>
                        Welcome Back
                    </Title>
                    <Text type="secondary">Login to continue</Text>
                </div>

                <Form layout="vertical" onFinish={submitHandler}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
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
                        <Text>
                            Not a user? <Link to="/register">Register here</Link>
                        </Text>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
