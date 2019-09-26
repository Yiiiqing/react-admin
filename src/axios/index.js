import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from './../utils/utils'
export default class Axios{
    static requestList(_this,url,params,isMock){
        var data = {
            params:params,
        }
        this.ajax({
            url,
            data,
            isMock
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.item_list.map((item,index) => {
                    item.key = index;
                    return item;
                });
                //该_this为调用该方法的作用域
                _this.setState({
                    list,
                    //设置分页
                    pagination:Utils.pagination(data,(current)=>{
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        })
    }
    //通过jsonp请求天气等
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                //to-do
                if(response.info === 'OK'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }
    static ajax(options){
        let loading;
        //显示loading
        if(options.data && options.data.isShowLoading !== false){
            // 因为在html里放着,直接document获取
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block';
        }
        //是Mock数据
        let baseUrl = ''
        if(options.isMock){
            baseUrl = 'https://www.easy-mock.com/mock/5d6f9857f16efd32ea5f0eec/mockapi';
        }else{
            baseUrl = 'https://www.easy-mock.com/mock/5d6f9857f16efd32ea5f0eec/mockapi';
        }

        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,//超时
                //参数
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if(options.data && options.data.isShowLoading !== false){
                    // 因为在html里放着,直接document获取
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none';
                }
                if(response.status === 200){
                    let res = response.data
                    //拦截器
                    if(res.code === 0){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.message
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        })
    }
}