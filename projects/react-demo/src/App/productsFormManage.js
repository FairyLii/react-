import {Component} from 'react'
import React from 'react';
import {Button, Form, Input,Row,Col,Table, Space,message, Modal} from "antd";
import '../styles/clientManage.scss'
import ProjectFormComponent from "./components/projectFormComponent";

export default class productsFormManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData:[
                {
                    name: 'liziyu', phone: '15061886760',address: '马连洼北路', id:'1',clientId:'000005',addressId: '000004',phoneId: '000003',
                    time: '2020-11-17 13:30:23', quantity: '12.3', unit: '180', remark: '无',total: '2214'
                }
            ],
            loading: false,
            visibleForm: false,
            currentMsg: {}
        };
        this.formRef = React.createRef();
       // this.componentsMethod = this.componentsMethod.bind(this);
        this.editRow = this.editRow.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    search(){
        message.info('searching!');
    }
    editRow(data){
        this.setState({visibleForm: true,currentMsg: data});
    }
    componentDidMount() {
    }

    onFinish = (value) => {

    };
    submitForm = () => {
        this.componentsMethod.onFinish();

    };
    cancel = ()=>{
        this.setState({visibleForm: false});
    };

    render(){
        const columns = [
            {
                title: '客户名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '数量',
                dataIndex: 'quantity',
                key: 'quantity',
            },
            {
                title: '单价',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: '总价',
                dataIndex: 'total',
                key: 'total',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="primary" size="small" onClick={()=>this.editRow(record)}>编辑</Button> {/*onclick中的必须这么写，避免自动触发*/}
                        <Button type="primary"  danger size="small">删除</Button>
                    </Space>
                ),
            }];

        return (
            <div className="clientManageClass">
                <Form
                    name="basic"
                    ref={this.formRef}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item>
                        <Row gutter={18}>
                            <Col span={8}>
                                <Form.Item
                                    label="客户名称"
                                    name="clientName">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="客户电话"
                                    name="phoneNumber">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item>
                                    <Space size="middle">
                                        <Button type="primary" onClick={this.search}>查询</Button>
                                    </Space>

                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
                <Table columns={columns}
                       loading={this.state.loading}
                       dataSource={this.state.tableData}
                       rowKey={'id'}
                />
                {
                    this.state.visibleForm && <Modal
                        title={'编辑出库单'}
                        visible={this.state.visibleForm}
                        onOk={this.submitForm}
                        onCancel={this.cancel}
                        width='80%'>
                        <ProjectFormComponent
                            onRef={c=>this.componentsMethod=c}
                            currentMsg={this.state.currentMsg}
                            getComponentsMsg={this.cancel}
                        />
                    </Modal>
                }
            </div>
        )
    }

}