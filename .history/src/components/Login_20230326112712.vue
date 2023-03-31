<template>
  <div class="flex lg:max-w-4xl max-w-3xl lg:flex-grow login-body">
    <div
      class="lg:bg-white lg:w-1/2 lg:p-8 lg:py-16 lg:px-12 space-y-7 marlene-rounded-l-lg shadow-sm w-max p-8 marlene-bg-glass-ex"
    >
      <p class="mb-2 text-primary text-4xl">登录</p>
      <form class="space-y-8">
        <div class="space-y-6">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item prop="mail">
              <el-input
                class="min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary"
                v-model="ruleForm.mail"
                placeholder="邮箱"
                type="email"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary"
                v-model="ruleForm.password"
                placeholder="密码"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
          </el-form>
          <div class="grid grid-cols-7 gap-4">
            <div class="col-start-1 col-end-4">
              <label class="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="checked-demo"
                  value="false"
                  v-model="ruleForm.isRemember"
                  class="form-tick appearance-none h-4 w-4 border border-gray rounded-md checked:bg-primary checked:border-transparent focus:outline-none bg-white"
                />
                <span class="text-blue-gray font-medium">记住密码</span>
              </label>
            </div>
            <div class="col-end-8">
              <router-link to="/register" class="text-primary"
                >注册</router-link
              >
            </div>
          </div>
        </div>
        <div class="block text-center">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="tracking-widest bg-primary min-w-full h-12 focus:bg-secondary hover:bg-secondary text-white rounded-lg text-2xl marlene-btn"
          >
            登 录
          </el-button>
        </div>
      </form>
    </div>
    <!-- <div
      class="lg:w-1/2 marlene-bg-glass rounded-r-lg invisible lg:visible w-0"
    >
      <div>
        <img src="../assets/picture2.png" alt="" class="-mt-20 w-10/12 ml-8" />
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { reactive, ref } from "vue";

import type { FormInstance, FormRules } from "element-plus";
import router from "../router/router.js";

// import { getCurrentInstance } from "vue";
import Cookies from "js-cookie";
import { login } from "../services/user.js";
import { ElMessage } from "element-plus";

// const proxy = getCurrentInstance()?.proxy!;

onMounted(() => {
  if (Cookies.get("mail")) {
    ruleForm.mail = Cookies.get("mail");
  }

  if (Cookies.get("password")) {
    ruleForm.password = Cookies.get("password");
  }
});

const ruleFormRef = ref<FormInstance>();

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const validateMail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else {
    var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (!verify.test(ruleForm.mail)) {
      callback(new Error("邮箱格式错误"));
    } else {
      callback();
    }
  }
};

const ruleForm = reactive({
  mail: "",
  password: "",
  isRemember: false,
});

const rules = reactive<FormRules>({
  mail: [{ validator: validateMail, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await login(ruleForm.mail, ruleForm.password);

        if (res.success == true) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userType", res.data.userType);

          ElMessage({
            showClose: true,
            message: "登录成功！",
            type: "success",
          });
          location.reload();
          location.href = "http://localhost:3000/home";
          // router.push({ path: "/empty" });
          router.push({ path: "/home" });
        }
      } catch (error) {
        console.log(error);
      }

      if (ruleForm.isRemember) {
        Cookies.set("mail", ruleForm.mail, { expires: 3 });
        Cookies.set("password", ruleForm.password, { expires: 3 });

        console.log(Cookies.get("mail"));
      } else {
        Cookies.remove("mail");
        Cookies.remove("password");
      }
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style>
.login-body {
  margin: 0 auto;
}
</style>
