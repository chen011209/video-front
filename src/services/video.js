import service from "../util/axios"
// import fileService from "../util/axios"


export const upload= (file)=>{

    const formData = new FormData();
    formData.append('file', file);
    const result =  service.post(
      "/video/uploadfile",
      formData,
      {
        headers: {
            'Content-Type': 'multipart/form-data',
             'token':localStorage.getItem('token'),
        },
      },
      true
    );

    return result


    // return service.post("/video/uploadfile",{
    //     file
    // })
}


// ,{
//     headers: {'Content-Type': 'multipart/form-data'},
// }


export const requestBatchImport =  (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const result =  service.post(
      `/video/uploadfile`,
      formData,
      {
        headers: {
            'token':localStorage.getItem('token')
        },
      },
      true
    );
    // if (result && result.data?.errcode === 0) {
    //   onSuccess && onSuccess();
    // } else if (result.data?.errcode === BATCH_IMPORT_ERR_CODE) {
    //   onError && onError(result.data.errmsg);
    // } else {
    //   httpV1.errorResponse(result);
    //   // 抛出异常，外部调用时针对其他错误码做loading停止处理
    //   throw result;
    // }
  };
  