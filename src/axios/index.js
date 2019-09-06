import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd';
export default class Axios{
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
        let baseUrl = 'https://www.easy-mock.com/mock/5d6f9857f16efd32ea5f0eec/mockapi';

        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,
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