import service from "../util/axios"

export const upload =  (videoPath,picturePath,title,introdcution) => {
  const formData = new FormData();

  formData.append('videoPath', videoPath);
  formData.append('title', title);
  formData.append('introduction', introdcution);
  formData.append('picturePath', picturePath);
  const result =  service.post(
    `/video/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  );
  return result;
};


export const uploadFile =  (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const result =  service.post(
      `/video/uploadfile`,
      formData,
      true
    );
    return result;
  };
  


  export const getCheckVideoInfo =  (checkVideoId) => {
    const formData = new FormData();

    const result =  service.get(
      `/video/check/videoInfo?checkVideoId=` + checkVideoId,
      formData,
      true
    );
    return result;
  };


  export const getCheckVideoList =  (len) => {

    const formData = new FormData();

    const result =  service.get(
      `/video/checkVideoList?len=` + len,
      formData,
      true
    );
    return result;
  };



  export const checkVideo =  (checkVideoId,status,remark) => {
    const formData = new FormData();
    formData.append("checkVideoId",checkVideoId)
    formData.append("status",status)

    if(remark!=null){
      formData.append("remark",remark)
    }

    const result =  service.post(
      `/video/check`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  };



  export const getPoplularVideoList =  (pageNum,pageSize) => {

    const formData = new FormData();

    const result =  service.get(
      `/video/list/popular?pageSize=${pageSize}&pageNum=${pageNum}`,
      formData,
      true
    );
    return result;
  };


  export const getVideoInfo =  (videoId) => {
    const formData = new FormData();

    const result =  service.get(
      `/video/videoInfo?videoId=` + videoId,
      formData,
      true
    );
    return result;
  }

  export const getScore =  (videoId) =>  {
    const formData = new FormData();

    const result =  service.get(
      `/video/score?videoId=` + videoId,
      formData,
      true
    );
    return result;
  }

  export const getUserVideoInfo =  (videoId) =>  {
    const formData = new FormData();

    const result =  service.get(
      `/video/user/info?videoId=` + videoId,
      formData,
      true
    );
    return result;
  }

  export const setScore =  (videoId,score) => {
    const formData = new FormData();
    formData.append("videoId",videoId)
    formData.append("score",score)

    const result =  service.post(
      `/video/score`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }



  export const collect =  (videoId) => {
    const formData = new FormData();
    formData.append("videoId",videoId)

    const result =  service.post(
      `/video/collect`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }


  export const getRecommendList =  () => {
    const formData = new FormData();


    const result =  service.get(
      `/video/list/recommend`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }


  export const getCollectList =  (pageNum,pageSize) => {
    const formData = new FormData();

    const result =  service.get(
      `/video/collect?pageSize=${pageSize}&pageNum=${pageNum}`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }

  
  export const getHistoryList =  (pageNum,pageSize) => {
    const formData = new FormData();

    const result =  service.get(
      `/video/history?pageSize=${pageSize}&pageNum=${pageNum}`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }


  export const getSearchList =  (pageNum,pageSize,content) => {
    const formData = new FormData();

    const result =  service.get(
      `/video/search?pageSize=${pageSize}&pageNum=${pageNum}&content=${content}`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }


  export const getMyVideoList =  (pageNum,pageSize) => {
    const formData = new FormData();

    const result =  service.get(
      `/video/list/my?pageSize=${pageSize}&pageNum=${pageNum}`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }

  
  export const getVideoList =  (pageNum,pageSize,userId) => {
    const formData = new FormData();

    const result =  service.get(
      `/video/list?pageSize=${pageSize}&pageNum=${pageNum}&userId=${userId}`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }
