/**
*Reducer 数据处理
*/
import { type } from './../action';

const initialState = {
    menuName:'首页'
}
// reducer接受一个state,和动作,返回新的state
export default (state=initialState, action)=>{
    console.log("state",state)
    console.log("action",action)
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,//通过对象结构,将原有状态结构保留.
                menuName:action.menuName//返回一个新的menuName
            }
        default:
            return {...state,menuName:state.menuName}
    }
}