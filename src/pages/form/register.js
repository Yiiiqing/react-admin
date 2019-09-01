import React from 'react'
import {Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message, InputNumber} from 'antd'
import moment from 'moment';

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea

class FormRegister extends React.Component{
    state = {
        userImg:null
    }
    getBase64 = (img, callback) =>{
        //返回对象
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleSubmit = () =>{
        let userInfo = this.props.form.getFieldsValue();
        //stringfy转字符串
        console.log(JSON.stringify(userInfo))
    }
    handleChange = info => {
    if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
                userImg:imageUrl,
                loading: false,
            }),
        );
    }
    };
  
    handleChange = ({ fileList }) => this.setState({ fileList });
  
    render(){
        //这是从form中解构出来的
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4,
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const rowObject = {
            minRows:4,
            maxRows:6
        }
        return(
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    // rules:[
                                    //     {
                                    //         required:true,
                                    //         message:'用户名不能为空'
                                    //     }
                                    // ]
                                })(
                                    <Input type="password" placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:'1',
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:'18',
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue:'2',
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">风华浪子</Option>
                                        <Option value="3">北大才子</Option>
                                        <Option value="4">凡米智能</Option>
                                        <Option value="5">创业大亨</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest',{
                                    initialValue:['2','10'],
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">跑步</Option>
                                        <Option value="4">爬山</Option>
                                        <Option value="5">乒乓球</Option>
                                        <Option value="6">唱歌</Option>
                                        <Option value="7">看电影</Option>
                                        <Option value="8">美女</Option>
                                        <Option value="9">写诗</Option>
                                        <Option value="10">足球</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMerried',{
                                    valuePropName:'checked',
                                    initialValue:true,
                                })(
                                    <Switch/> 
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    //初始
                                    initialValue:moment('2019-08-29'),
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"/> 
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue:'上海市徐汇区你心里'
                                })(
                                    <TextArea
                                        autosize={rowObject}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    //action是接口
                                    <Upload
                                        listType="picture-card"
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg?<img src={this.state.userImg} alt=""/>:<Icon type="plus"/>}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    //action是接口
                                    <Checkbox>我已阅读<a href="#">协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormRegister)