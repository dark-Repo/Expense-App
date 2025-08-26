import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, message, Table, DatePicker } from 'antd'
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import moment from "moment";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Spinner from "./../components/spinner"
import Analytics from "../components/Analytics";
import "./HomePage.css"
//import { text } from "express";
const { RangePicker } = DatePicker;



const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [AllTransection, setAlltransection] = useState([])
    const [frequency, setFrequence] = useState("7");
    const [SelectedDate, setSelectedDate] = useState([])
    const [type, setType] = useState('all')
    const [viewData, setViewData] = useState('table')
    const [edit, setEdit] = useState(null)


    //table data
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Refrenece',
            dataIndex: 'refrence'
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div>
                    <EditOutlined onClick={() => {
                        setEdit(record)
                        setShowModal(true)
                    }} />
                    <DeleteOutlined className="mx-2" onClick={() => {
                        handleDelete(record);
                    }} />
                </div>
            )



        }
    ]




    //get call
    const getAllTransection = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            setLoading(true)
            const res = await axios.post('/transections/get-transection',
                {
                    userid: user._id,
                    frequency,
                    SelectedDate,
                    type,
                })
            setLoading(false)
            setAlltransection(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
            message.error("Get Issue With transection")
        }
    }
    //useEffect hook
    useEffect(() => {
        getAllTransection();
    }, [frequency, SelectedDate, type])

    //delete function
    const handleDelete = async (record) => {
        try {
            setLoading(true)
            await axios.post('/transections/delete-transection', { transectionId: record._id })
            setLoading(false)
            message.success("Transection Deleted")

        } catch (error) {
            setLoading(false)
            message.error("Faild to delete Transection")
            console.log(error)
        }
    }

    //form handling
    const handleSubmit = async (value) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            setLoading(true)
            if (edit) {
                await axios.post('/transections/edit-transection',
                    {
                        payload: {
                            ...value, userid: user._id
                        },
                        transectionId: edit._id
                    })
                setLoading(false);
                message.success("Transection Updated")
            } else {
                await axios.post('/transections/add-transection', { ...value, userid: user._id })
                setLoading(false);
                message.success("Transection Added")
            }
            setShowModal(false);
            setEdit(null);

        } catch (error) {
            setLoading(false)
            message.error("Faild to add Transection")
        }
    }

    return (
        <Layout >

            {loading && <Spinner />}
            <div className="filters">
                <div>
                    <h6 className="selectfil" >Select Filter</h6>
                    <Select className="selectfil" value={frequency} onChange={(values) => setFrequence(values)}>
                        <Select.Option value="7">Last 1 Week</Select.Option>
                        <Select.Option value="30">Last 1 Month</Select.Option>
                        <Select.Option value="365">Last 1 Year</Select.Option>
                        <Select.Option value="custom">Other</Select.Option>
                    </Select>
                    {
                        frequency === 'custom' && <RangePicker value={SelectedDate} onChange={(values) => setSelectedDate(values)} />
                    }
                </div>
                <div>
                    <h6 className="selectfil">Select Type</h6>
                    <Select value={type} onChange={(values) => setType(values)}>
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>

                    </Select>
                    {
                        frequency === 'custom' && <RangePicker value={SelectedDate} onChange={(values) => setSelectedDate(values)} />
                    }
                </div>
                <div className="switch-icon ">
                    <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
                    <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
                </div>
                <div>

                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New</button>
                </div>
            </div>
            <div className="content">
                {
                    viewData === 'table' ?
                        <Table columns={columns} dataSource={AllTransection} />
                        : <Analytics AllTransection={AllTransection} />
                }



            </div>
            <Modal
                open={showModal}
                title={edit ? 'Edit Transection' : 'Add Transection'}

                onCancel={() => setShowModal(false)}
                footer={false}>
                <Form Layout="vertical" onFinish={handleSubmit} initialValues={edit}>
                    <Form.Item label="Amount" name="amount">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="type" name="type">
                        <Select className="sel">
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="fees">Fees</Select.Option>
                            <Select.Option value="tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Refrence" name="refrence">
                        <Input type="text" />

                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input type="text" />
                    </Form.Item>
                    <div className="d-flex justify-content-end" >
                        <button type="submit" className="btn btn-primary">SAVE</button>
                    </div>
                </Form>
            </Modal>

        </Layout>
    );
};

export default HomePage;