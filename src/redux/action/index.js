/**
 * Action 类型
 */
export const type = {
    SWITCH_MENU:'SWITCH_MENU'
}
//定义一个方法,接收一个参数,返回一个类型,和参数
export function switchMenu(menuName) {
    return {
        type:type.SWITCH_MENU,//必须有type,事件类型,是一个什么样的事件
        menuName
    }
}