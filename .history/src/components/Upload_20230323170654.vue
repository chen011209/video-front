<template>
  <div class="flex lg:max-w-4xl max-w-3xl lg:flex-grow login-body">
    <div
      class="lg:bg-white lg:w-1/2 lg:p-8 lg:py-16 lg:px-12 space-y-7 marlene-rounded-l-lg shadow-sm w-max p-8 marlene-bg-glass-ex"
    >
      <form class="space-y-8">
        <div class="space-y-6">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            class="demo-ruleForm"
          >
            <div>
              <el-form-item prop="video">
                <el-upload
                  class="upload-demo"
                  ref="videoRef"
                  :http-request="uploadVideo"
                  v-model="ruleForm.video"
                  :limit="1"
                  accept="video/*"
                >
                  <el-button slot="trigger">选取上传视频</el-button>
                </el-upload>
              </el-form-item>

              <el-form-item prop="picture">
                <el-upload
                  class="upload-demo"
                  ref="pictureRef"
                  :http-request="uploadPicture"
                  v-model="ruleForm.picture"
                  :limit="1"
                  accept="image/*"
                >
                  <el-button slot="trigger">选取上传图片</el-button>
                </el-upload>
              </el-form-item>
            </div>

            <el-form-item prop="title">
              <el-input
                class="min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary"
                v-model="ruleForm.title"
                placeholder="标题"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item prop="introduction">
              <el-input
                class="min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary"
                v-model="ruleForm.introduction"
                placeholder="简介"
                autocomplete="off"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="block text-center">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="tracking-widest bg-primary min-w-full h-12 focus:bg-secondary hover:bg-secondary text-white rounded-lg text-2xl marlene-btn"
          >
            上传
          </el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { uploadFile, upload } from "../services/video.js";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

const videoRef = ref(null);
const pictureRef = ref(null);

const ruleFormRef = ref<FormInstance>();

const validateVideo = (rule: any, value: any, callback: any) => {
  if (value === "null") {
    callback(new Error("请上传视频"));
  } else {
    callback();
  }
};

const validatePicture = (rule: any, value: any, callback: any) => {
  if (value === "null") {
    callback(new Error("请上传图片"));
  } else {
    callback();
  }
};

const validateTitle = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入标题"));
  } else {
    callback();
  }
};

const validateIntroduction = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入简介"));
  } else {
    callback();
  }
};

const uploadVideo = async (options) => {
  const res = await uploadFile(options.file);

  console.log(res);

  if (res.success) {
    ruleForm.videoPath = res.data;
    ruleForm.video = "up";
  }

  // options.file 是待上传的文件
  // options.onProgress 是上传进度回调函数
  // options.onSuccess 是上传成功回调函数
  // options.onError 是上传失败回调函数

  // 在这里可以自定义上传逻辑，比如添加请求头、修改请求体等
  // ...

  // 发送请求
  // 注意：这里要返回一个 Promise 对象
  // return new Promise((resolve, reject) => {
  // resolve();
  // 发送请求的代码
  // ...
  // 上传成功时调用 resolve() 函数，传递上传成功的响应数据
  // 上传失败时调用 reject() 函数，传递上传失败的错误信息
  // ...
  // });
};

const uploadPicture = async (options) => {
  const res = await uploadFile(options.file);

  console.log(res);

  if (res.success) {
    ruleForm.picturePath = res.data;
    ruleForm.picture = "up";
  }
};

const ruleForm = reactive({
  title: "",
  introduction: "",
  videoPath: "",
  picturePath: "",
  video: "null",
  picture: "null",
});

const rules = reactive<FormRules>({
  title: [{ validator: validateTitle, trigger: "blur" }],
  introduction: [{ validator: validateIntroduction, trigger: "blur" }],
  video: [{ validator: validateVideo, trigger: "blur" }],
  picture: [{ validator: validatePicture, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await upload(
          ruleForm.videoPath,
          ruleForm.picturePath,
          ruleForm.title,
          ruleForm.introduction
        );

        console.log(res);

        if (res.success == true) {
          ElMessage({
            showClose: true,
            message: "上传成功！请等待管理员审核",
            type: "success",
          });
        }

        videoRef.value.clearFiles();
        pictureRef.value.clearFiles();
        ruleForm.title = "";
        ruleForm.introduction = "";
        ruleForm.videoPath = "";
        ruleForm.picturePath = "";
        ruleForm.video = "";
        ruleForm.picture = "";
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

<style>
.login-body {
  margin: 0 auto;
}
</style>
