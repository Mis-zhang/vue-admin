<template>
	<div class="login">
		<div class="login-wrap">
			<ul class="menu-tab">
				<li
					:class="{ current: item.current }"
					v-for="(item, index) in menuTab"
					:key="index"
					@click="toggleMenu(item)"
				>
					{{ item.txt }}
				</li>
			</ul>
			<!-- 表单 start -->
			<el-form
				:model="ruleForm"
				status-icon
				:rules="rules"
				ref="ruleForm"
				class="demo-ruleForm login-form"
				size="medium"
			>
				<el-form-item prop="username" class="item-from">
					<label>邮箱</label>
					<el-input
						type="text"
						v-model="ruleForm.username"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item prop="password" class="item-from">
					<label>密码</label>
					<el-input
						type="password"
						v-model="ruleForm.password"
						autocomplete="off"
						minlength="6"
						maxlength="20"
					></el-input>
				</el-form-item>
				<el-form-item
					prop="passwords"
					class="item-from"
					v-show="model === 'register'"
				>
					<label>重复密码</label>
					<el-input
						type="password"
						v-model="ruleForm.passwords"
						autocomplete="off"
						minlength="6"
						maxlength="20"
					></el-input>
				</el-form-item>
				<el-form-item prop="code" class="item-from">
					<label>验证码</label>
					<el-row :gutter="10">
						<el-col :span="15">
							<el-input
								type="text"
								v-model="ruleForm.code"
								minlength="6"
								maxlength="6"
							></el-input>
						</el-col>
						<el-col :span="9">
							<el-button type="success" class="block">获取验证码</el-button>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item>
					<el-button
						type="danger"
						@click="submitForm('ruleForm')"
						class="login-btn block"
						>提交</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import {
	stripscript,
	validateEmail,
	validatePass,
	validateCodes,
} from "../../utils/validate.js";
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
	name: "login",
	setup(props, { refs }) {
		// 验证用户名
		let validateUsername = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入用户名"));
			} else if (!validateEmail(value)) {
				callback(new Error("用户名格式有误"));
			} else {
				callback();
			}
		};
		// 验证密码
		let validatePassword = (rule, value, callback) => {
			// 过滤后的数据
			ruleForm.password = stripscript(value);
			value = ruleForm.password;
			if (value === "") {
				callback(new Error("请输入密码"));
			} else if (!validatePass(value)) {
				callback(new Error("密码为6至20位数字+字母"));
			} else {
				callback();
			}
		};
		// 验证重复密码
		let validatePasswords = (rule, value, callback) => {
			//如果模块值是login的话直接通过
			if (model.value === "login") {
				callback();
			}
			// 过滤后的数据
			ruleForm.passwords = stripscript(value);
			value = ruleForm.passwords;
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value != ruleForm.password) {
				callback(new Error("重复密码不正确"));
			} else {
				callback();
			}
		};
		// 验证验证码
		let validateCode = (rule, value, callback) => {
			//过滤后的数据
			ruleForm.code = stripscript(value);
			value = ruleForm.code;
			if (value === "") {
				return callback(new Error("请输入验证码"));
			} else if (!validateCodes(value)) {
				return callback(new Error("验证码格式有误"));
			} else {
				callback();
			}
		};

		const menuTab = reactive([
			{ txt: "登录", current: true, type: "login" },
			{ txt: "注册", current: false, type: "register" },
		]);
		const model = ref("login");

		const ruleForm = reactive({
			username: "",
			password: "",
			passwords: "",
			code: "",
		});
		const rules = reactive({
			username: [{ validator: validateUsername, trigger: "blur" }],
			password: [{ validator: validatePassword, trigger: "blur" }],
			passwords: [{ validator: validatePasswords, trigger: "blur" }],
			code: [{ validator: validateCode, trigger: "blur" }],
		});

		const toggleMenu = (data) => {
			console.log(data);
			menuTab.forEach((item) => {
				item.current = false;
			});
			data.current = true;
			model.value = data.type;
		};
		const submitForm = (formName) => {
			refs[formName].validate((valid) => {
				if (valid) {
					alert("submit!");
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		};

		onMounted(() => {});

		return {
			menuTab,
			model,
			ruleForm,
			rules,
			toggleMenu,
			submitForm,
		};
	},
};
</script>
<style lang="scss" scoped>
.login {
	background: #344a5f;
	height: 100vh;
}
.login-wrap {
	width: 330px;
	margin: auto;
}
.menu-tab {
	text-align: center;
	li {
		display: inline-block;
		width: 88px;
		line-height: 36px;
		font-size: 14px;
		color: #fff;
		border-radius: 2px;
		cursor: pointer;
	}
	.current {
		background-color: rgba(0, 0, 0, 0.1);
	}
}
.login-form {
	margin-top: 29px;
	label {
		display: block;
		margin-bottom: 3px;
		font-size-adjust: 14px;
		color: #fff;
	}
	.item-from {
		margin-bottom: 13px;
	}
	.block {
		width: 100%;
		display: block;
	}
	.login-btn {
		margin-top: 19px;
	}
}
</style>
