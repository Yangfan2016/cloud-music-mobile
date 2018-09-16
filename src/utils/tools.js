export let serialize = obj => {
    if (Object.prototype.toString.call(obj) !== '[object Object]') return "";
    let data = [];
    for (let key in obj) {
        data.push(`${key}=${obj[key]}`);
    }
    return data.join("&");
}
export let reSerialize = str => {
    if (typeof str !== 'string') return {};
    let list = str.split("&");
    let obj = {};
    for (let i = 0; i < list.length; i++) {
        let item = list[i].split("=");
        obj[item[0]] = item[1];
    }
    return obj;
}
/**
 * 防抖动
 * @param {*执行的函数} fn 
 * @param {*延时} delay 
 * @param {*是否立即触发} isImmediate 
 */
export let debounce = (fn, delay=800, isImmediate=false) => {
    let timer = null;

    return function () {
        console.log(this)
        let ctx = this, // 保存作用域
            args = arguments; // 保存参数
        // 初始化清空所有定时器
        if (timer) {
            clearTimeout(timer);
        }
        // 如果是立即触发
        if (isImmediate) {
            if (!timer) { // timer为空时触发操作
                fn.apply(ctx, args);
            }
            // delay时间后置空timer
            timer = setTimeout(_ => {
                timer = null;
            }, delay);
        } else { // delay时间后触发操作
            timer = setTimeout(_ => {
                fn.apply(ctx, args);
            }, delay);
        }
    };
};