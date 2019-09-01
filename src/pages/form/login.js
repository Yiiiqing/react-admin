import React from 'react';
import { Card , Form, Input, Button, message, Icon, Checkbox} from 'antd'
const FormItem = Form.Item

class FormLogin extends React.Component{

    handleSubmit = () =>{
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err,values)=>{
            //如果全部通过
            if(!err){
                message.success(`你好,${userInfo.userName},密码为:${userInfo.userPwd}`)
            }
        })
    }
    render(){
        const { getFieldDecorator }= this.props.form;
        return(
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单">
                    <Form style={{width:300}}>

                        <FormItem>
                        {
                            getFieldDecorator('userName',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    },
                                    {
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    },
                                    // {
                                    //     pattern:/^\w+$/g,
                                    //     message:'用户名必须为英文字母或数字'
                                    // }
                                    {
                                        //\w是字母加数字,加\转义
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为英文字母或数字'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type='user'/>} placeholder="请输入用户名"/>
                            )
                        }
                        </FormItem>
                        <FormItem>
                        {
                            getFieldDecorator('userPwd',{
                                initialValue:'',
                                rules:[]
                            })(
                                <Input prefix={<Icon type='lock'/>} type="password" placeholder="请输入密码"/>
                            )
                        }
                            {/* <Input placeholder="请输入密码"/> */}
                        </FormItem>
                        <FormItem>
                        {
                            getFieldDecorator('remember',{
                                //指定name是checked,才能选中
                                valuePropName:'checked',
                                initialValue:true,
                                rules:[]
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )
                        }
                        <a href="#" style={{float:'right'}}>忘记密码</a>

                            {/* <Input placeholder="请输入密码"/> */}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
//注意!!!
//FormLogin是一个对象,通过Form.create()来创建一个新的Form对象,具备功能的

export default Form.create()(FormLogin)