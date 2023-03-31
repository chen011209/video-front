<template>
  <div class="flex lg:max-w-4xl max-w-3xl lg:flex-grow register-body">
    <!-- <div
      class="lg:w-1/2 marlene-bg-glass rounded-l-lg invisible lg:visible w-0"
    >
      <div>
        <img src="../assets/picture1.png" alt="" class="-mt-20 w-10/12 ml-8" />
      </div>
    </div> -->
    <div
      style="border: 2px solid black"
      class="lg:bg-white lg:w-1/2 lg:p-8 lg:py-16 lg:px-8 space-y-7 marlene-rounded-r-lg shadow-sm w-max p-8 marlene-bg-glass-ex"
    >
      <div class="space-y-3.5">
        <p class="mb-2 text-primary text-4xl">注册</p>
        <!-- <p class="text-blue-gray">期待与你在新の世界邂逅。</p> -->
      </div>
      <form class="space-y-8">
        <div class="space-y-6">
          <div class="flex space-x-2 block">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              :rules="rules"
              class="demo-ruleForm"
            >
              <div class="container-1">
                <el-form-item prop="name">
                  <el-input
                    v-model="ruleForm.name"
                    type="text"
                    placeholder="用户名"
                    autocomplete="off"
                    class="min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </el-form-item>
                <el-form-item prop="mail">
                  <el-input
                    v-model="ruleForm.mail"
                    placeholder="邮箱"
                    type="email"
                    autocomplete="off"
                    class="min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </el-form-item>

                <el-form-item prop="pass">
                  <el-input
                    v-model="ruleForm.pass"
                    type="password"
                    placeholder="密码"
                    autocomplete="off"
                    class="min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </el-form-item>

                <el-form-item prop="checkPass">
                  <el-input
                    v-model="ruleForm.checkPass"
                    placeholder="再次输入密码"
                    type="password"
                    autocomplete="off"
                    class="min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </el-form-item>

                <el-form-item prop="checkCode">
                  <el-input
                    v-model="ruleForm.checkCode"
                    placeholder="输入验证码"
                    type="text"
                    autocomplete="off"
                    class="min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </el-form-item>

                <el-button @click="getCode()"> 获取验证码 </el-button>
              </div>
            </el-form>
          </div>
          <div class="grid grid-cols-6 gap-4">
            <div class="col-end-7 col-span-2">
              <router-link class="text-primary" to="/login"
                >已有账号?登录</router-link
              >
            </div>
          </div>
        </div>
        <div class="block text-center">
          <el-button
            class="tracking-widest bg-primary min-w-full h-12 focus:bg-secondary hover:bg-secondary text-white rounded-lg text-2xl marlene-btn"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            注 册
          </el-button>
          <el-button v-if="isShow">注册管理员</el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import axios from "axios";
import { ElMessage } from "element-plus";
import { register, getMailCode } from "../services/user.js";
const ruleFormRef = ref<FormInstance>();
var isShow = false;

onMounted(() => {
  if (localStorage.getItem("userType") === "0") {
    isShow = true;
  }

  console.log(localStorage.getItem("userType"));
});

const getCode = async (rule: any, value: any, callback: any) => {
  if (ruleForm.mail == "") {
    ElMessage.error("请输入邮箱");
  } else {
    try {
      const res = await getMailCode(ruleForm.mail);

      if (res.success == true) {
        ElMessage.success("验证码已发送");
      } else {
        ElMessage.error("验证码发送失败");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
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

const validateName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入姓名"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const validateCode = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the code"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  name: "",
  mail: "",
  pass: "",
  checkPass: "",
  checkCode: "",
});

const rules = reactive<FormRules>({
  mail: [{ validator: validateMail, trigger: "blur" }],
  name: [{ validator: validateName, trigger: "blur" }],
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  checkCode: [{ validator: validateCode, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await register(
          ruleForm.name,
          ruleForm.mail,
          ruleForm.pass,
          ruleForm.checkCode
        );

        if (res.success == true) {
          ElMessage({
            showClose: true,
            message: "注册成功",
            type: "success",
          });

          ruleForm.name = "";
          ruleForm.mail = "";
          ruleForm.pass = "";
          ruleForm.checkPass = "";
          ruleForm.checkCode = "";
          // 成功注册
        }
      } catch (error) {
        console.log(error);
      }
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style scoped>
.container-1 {
  display: flex;
  flex-direction: column;
  gap: 30;
  width: 400px;
}

.registerInput {
  height: 39px;
}

.register-body {
  margin: 0 auto;
}
</style>
