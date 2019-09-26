import React from 'react';
import {Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd';
import Utils from '../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option;


class FilterForm extends React.Component{
    //提交
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();//获取表单的值
        this.props.filterSubmit(fieldsValue);//传递到父组件的方法进去
    }
    //重置
    reset = () => {
        this.props.form.resetFields();
    }
    //初始化
    initFormList = () => {
        const { getFieldDecorator } = this.props.form;//帮助实现双向数据绑定
        const formList = this.props.formList;//获得数据
        const formItemList = [];
        if(formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || "";
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type === '时间查询'){
                    const begin_time = <FormItem label={label} key={field}>
                        {/* 用中括号!将field当成变量 */}
                        {getFieldDecorator('begin_time')(
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                    )}
                    </FormItem>
                    formItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={field}>
                    {/* 用中括号!将field当成变量 */}
                    {
                        getFieldDecorator('end_time')(
                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                    )}
                </FormItem>
                formItemList.push(end_time)
                }
                else if(item.type === 'INPUT'){
                    const INPUT = <FormItem label={label} key={field}>
                        {/* 用中括号!将field当成变量 */}
                        {getFieldDecorator([field],{
                            initialValue:initialValue
                        })(
                            <Input type="text" placeholder={placeholder}/>
                    )}
                    </FormItem>
                    formItemList.push(INPUT)
                }
                else if(item.type === 'SELECT'){
                    const SELECT = <FormItem label={label} key={field}>
                        {/* 用中括号!将field当成变量 */}
                        {getFieldDecorator([field],{
                            initialValue:initialValue
                        })(
                        <Select
                            style={{width:width}}
                            placeholder={placeholder}
                        >
                            {Utils.getOptionList(item.list)}
                        </Select>
                    )}
                    </FormItem>
                    formItemList.push(SELECT)
                }
                else if(item.type === 'CHECKBOX'){
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {/* 用中括号!将field当成变量 */}
                        {getFieldDecorator([field],{
                            valuePropName:'checked',
                            initialValue:initialValue //ture || false
                        })(
                            <Checkbox>
                                {label}
                            </Checkbox>
                    )}
                    </FormItem>
                    formItemList.push(CHECKBOX)
                }else if(item.type === 'DATE'){
                    const DATE = <FormItem label={label} key={field}>
                        {/* 用中括号!将field当成变量 */}
                        {
                        getFieldDecorator([field])(
                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                    )}
                    </FormItem>
                    formItemList.push(DATE)
                }
            })
        }
        return formItemList;
    }
    render(){
        return(
            <Form layout="inline">
                {/* 调用封装好的formitem */}
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({})(FilterForm)