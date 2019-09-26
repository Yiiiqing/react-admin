import React from 'react'
import {Select} from 'antd'
const Option = Select.Option
export default{
    formateDate(time){
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    },
    //分页机制
    //callback 点击下一页触发
    pagination(data,callback){
        //这就是自定义的pagination的内容,是一个对象 
        let page = {
            onChange:(current)=>{
                callback(current)
            },
            //接口要返回这个page
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal:()=>{
                return `共${data.result.total}条`
            },
            showQuickJumper:true
        }
        return page;
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        // let options = [<Option value="0" key="all_key">全部</Option>];
        let options = [];
        data.map((item)=>{
            options.push(
                <Option value={item.id} key={item.id}>{item.name}</Option>
            )
        })
        return options
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
    */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds){
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows,
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem:selectedRows,
            })
        }
    }
}