/**
 *过滤特殊字符
 *
 * @export
 * @param {*} value
 */
export function stripscript(value) {
	var pattern = new RegExp(
		"[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
	);
	var rs = "";
	for (var i = 0; i < value.length; i++) {
		rs = rs + value.substr(i, 1).replace(pattern, "");
	}
	return rs;
}

/**
 *验证用户名，邮箱
 *
 * @export
 * @param {*} value
 * @returns
 */
export function validateEmail(value) {
	let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
	return reg.test(value) ? true : false;
}
/**
 *验证密码
 *
 * @export
 * @param {*} value
 * @returns
 */
export function validatePass(value) {
	let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	return reg.test(value) ? true : false;
}
/**
 *验证验证码
 *
 * @exportß
 * @param {*} value
 * @returns
 */
export function validateCodes(value) {
	let reg = /^[a-z0-9]{6}$/;
	return reg.test(value) ? true : false;
}
