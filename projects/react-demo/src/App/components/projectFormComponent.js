import {Component} from 'react'
import React from 'react';
import { Form, Input, Button, DatePicker, Row, Col,  Select, message } from 'antd';
const {TextArea} = Input;
import api from '../../apis/productsForm'
import '../../styles/productsForm.scss';
const Option = Select.Option;
import mathThird from 'number-precision'
import moment from "moment";

export default class ProductsFormComponent extends Component {
    constructor(props) { // 完成了对react数据的初始化，接受两个参数，props和context 想使用必须用super传入参数，写了constructor 必须使用super 否则会出现this指向错误
        super(props);
        this.state = {
            clientList: [],
            defaultClient:'',
            addressList: [],
            phoneNumberList: []
        };
        this.formRef = React.createRef();
        this.onFinish = this.onFinish.bind(this);
        if(props.onRef){//如果父组件传来该方法 则调用方法将子组件this指针传过去
            props.onRef(this)
        }
    }


    componentDidMount() {
        this.getClientsList();
        this.getAddressAboutClient(this.props.currentMsg.clientId);
        this.getPhoneNumberAboutClient(this.props.currentMsg.clientId);
        this.formRef.current.setFieldsValue({
            unitAndQuantity:{
                quantity: this.props.currentMsg.quantity,
                unit: this.props.currentMsg.unit,
            },
            'totalAmount': this.props.currentMsg.total,
            'date': moment(this.props.currentMsg.time),
            'remark': this.props.currentMsg.remark
        })
    }
    submitForm(){
        // 获取校验结果
        this.formRef.current.validateFields().then(res =>{
            const query = {
                addressName: res.addressName,
                clientName: res.clientName,
                phoneNumber: res.phoneNumber,
                remark: res.remark,
                totalAmount: res.totalAmount,
                date: moment(res.date).format('YYYY-MM-DD hh:mm:ss'),
                id: this.props.currentMsg.id,
                unitAndQuantity: res.unitAndQuantity,
                unit: res.unit
            };
            api.submitProductForm(query)
                .then(res => {
                    this.props.getComponentsMsg('yes')
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(()=>{
                });
        }).catch(err =>{
            message.warn('有数据不符合格式或者未填写')
        });
    };
    // 获取客户名称列表
    getClientsList(){
        api.getClientList({})
            .then(res => {
                if (res.status === 200) {
                    this.setState({clientList: res.dataList});
                    this.formRef.current.setFieldsValue({'clientName': this.props.currentMsg.clientId})
                }
            })
            .catch(err => {
                message.error('获取失败');
            })

    };
    // 获取客户地址
    getAddressAboutClient(clientId){
        const query = {
            clientId: clientId
        };
        api.getAddressAboutClientList(query)
            .then(res => {
                if (res.status === 200) {
                    this.setState({addressList: res.dataList});
                    this.formRef.current.setFieldsValue({'addressName': this.props.currentMsg.addressId})
                }
            })
            .catch(err => {
                message.error('获取失败');
            })
    }
    // 根据客户名成获取电话
    getPhoneNumberAboutClient(clientId){
        const query = {
            clientId: clientId
        };
        api.getPhoneNumberAboutClient(query)
            .then(res => {
                if (res.status === 200) {
                    this.setState({phoneNumberList: res.dataList});
                    this.formRef.current.setFieldsValue({'phoneNumber': this.props.currentMsg.phoneId})
                }
            })
            .catch(err => {
                message.error('获取失败');

            })
    }
    onFinish = () => {
        this.submitForm();
    };

    render(){
        const layout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };
        const tailLayout = {
            wrapperCol: {offset: 8, span: 16},
        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        const onChange = (value) =>{
            this.getAddressAboutClient(value);
            this.getPhoneNumberAboutClient(value);
        };
        const changeTotalPrices = (type,e) => {
            const unit =  this.formRef.current.getFieldsValue().unitAndQuantity.unit;
            const quantity =  this.formRef.current.getFieldsValue().unitAndQuantity.quantity;
            if (!isNaN(unit) && !isNaN(quantity)){
                this.formRef.current.setFieldsValue({totalAmount: mathThird.times(unit, quantity)});
            }
        };

        function onSearch(val) {
            console.log('search:', val);
        }
        return (
            <div className="productsForm">
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
                    initialValues={{ remember: true }}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="客户名称"
                        name="clientName"
                        rules={[{ required: true, message: '必填项' }]}
                    >
                        <Select
                            showSearch
                            placeholder="选择客户"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                this.state.clientList.map((item, index)=>{
                                    return (<Option key={index} value={item.id}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="addressName"
                        rules={[{ required: true, message: '必填项' }]}
                    >
                        <Select
                            showSearch
                            placeholder="选择地址"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                this.state.addressList.map((item, index)=>{
                                    return (<Option key={index} value={item.id}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="电话"
                        name="phoneNumber"
                        rules={[{ required: true, message: '必填项' }]}
                    >
                        <Select
                            showSearch
                            placeholder="选择电话"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                this.state.phoneNumberList.map((item, index)=>{
                                    return (<Option key={index} value={item.id}>{item.phone}</Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="时间"
                        name="date"
                        format="YYYY-MM-DD hh:mm:ss"
                        rules={[{ required: true, message: '必填项' }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        label="单价和数量"
                        name="unitAndQuantity"
                    >
                        <Input.Group size="large" >
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Form.Item
                                        name={['unitAndQuantity', 'quantity']}
                                        noStyle
                                        initialValue="0"
                                        rules={[{ required: true, message: '请填入有效数字' },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (!isNaN(value)) {
                                                        return Promise.resolve();
                                                    } else {
                                                        return Promise.reject('必须是数字');
                                                    }
                                                }
                                            })
                                        ]}
                                    >
                                        <Input  onChange={e=>changeTotalPrices('quantity',e)}
                                                name="quantity"
                                                autoComplete="off"
                                                prefix=""
                                                suffix="m³" />

                                    </Form.Item>
                                </Col>
                                <Col span={2}> <div className="formPrice">*</div></Col>
                                <Col span={14}>
                                    <Form.Item
                                        name={['unitAndQuantity', 'unit']}
                                        noStyle
                                        initialValue="180"
                                        rules={[{ required: true, message: '请填入有效数字' },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (!isNaN(value)) {
                                                        return Promise.resolve();
                                                    } else {
                                                        return Promise.reject('必须是数字');
                                                    }
                                                }
                                            })
                                        ]}
                                    >
                                        <Input onChange={e=>changeTotalPrices('unit',e)}
                                               autoComplete="off"
                                               name="unit"
                                               prefix="￥"
                                               suffix="元" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        label="总价"
                        name="totalAmount"
                        rules={[{ required: true, message: '必填项'}]}
                    >
                        <Input prefix="￥" autoComplete="off" suffix="元" />
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <TextArea  autoComplete="off" />
                    </Form.Item>
                </Form>
            </div>
        )
    }

}