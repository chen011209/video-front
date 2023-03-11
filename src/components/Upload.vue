<!-- <template>
  <el-upload
    class="upload-demo"
    ref="upload"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :auto-upload="false"
    list-type="picture"
  >
    <el-button slot="trigger" size="small" type="primary"> 选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
};
</script> -->

<!-- action="http://127.0.0.1:8080/video/uploadfile" -->
<!-- <template>
  <el-upload
    :show-file-list="false"
    :on-success="handleSuccess"
    :http-request="customRequest"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <div v-else>
      <i class="el-icon-plus avatar-uploader-icon"></i>
      <div class="el-upload__text">点击上传封面</div>
    </div>
    <template #tip>
      <div v-if="!imageUrl" class="el-upload__tip">
        只能上传 jpg/png 文件，且不超过 500kb
      </div>
    </template>
  </el-upload>
</template>

<script>
import { ref } from "vue";
const imageUrl = ref("");
const handleSuccess = (response, file) => {
  console.log(response);

  imageUrl.value = URL.createObjectURL(file.raw);
};

const upload = () => {
  console.log("11");
};
</script> -->

<template>
  <div>
    <el-upload
      class="upload-demo"
      :on-success="handleSuccess"
      :http-request="customRequest"
    >
      <el-button slot="trigger">选取上传视频</el-button>
    </el-upload>
  </div>
</template>

<script>
import { requestBatchImport } from "../services/video.js";
export default {
  methods: {
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      // 处理上传成功后的响应
    },

    async customRequest(options) {
      const res = await requestBatchImport(options.file);

      console.log(res);

      // options.file 是待上传的文件
      // options.onProgress 是上传进度回调函数
      // options.onSuccess 是上传成功回调函数
      // options.onError 是上传失败回调函数

      // 在这里可以自定义上传逻辑，比如添加请求头、修改请求体等
      // ...

      // 发送请求
      // 注意：这里要返回一个 Promise 对象
      return new Promise((resolve, reject) => {
        // 发送请求的代码
        // ...
        // 上传成功时调用 resolve() 函数，传递上传成功的响应数据
        // 上传失败时调用 reject() 函数，传递上传失败的错误信息
        // ...
      });
    },
  },
};
</script>

<!-- <template>
  <div>
    <el-upload
      class="upload-demo"
      :action="getUploadUrl"
      :on-success="handleSuccess"
      :data="uploadData"
    >
      <el-button slot="trigger">选取文件</el-button>
      <el-button slot="upload">上传到服务器</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  methods: {
    getUploadUrl(params) {
      // 根据params参数动态生成上传URL
      return "/upload/" + this.userId + "?type=" + params.type;
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      // 处理上传成功后的响应
    }
  },
  data() {
    return {
      userId: "123456",
      uploadData: {
        type: "avatar"
      }
    };
  }
};
</script> -->
