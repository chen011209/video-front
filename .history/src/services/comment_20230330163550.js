import service from "../util/axios"


export const getCommenList =  (pageNum,pageSize,videoId) => {
    const formData = new FormData();


    const result =  service.get(
      `/comment/popular?pageSize=${pageSize}&pageNum=${pageNum}&videoId=${videoId}`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }

  export const addComment =  (videoId,content) => {
    const formData = new FormData();
    formData.append("videoId",videoId);
    formData.append("content",content);

    const result =  service.post(
      `/comment`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }


  export const likeComment =  (videoId) => {
    const formData = new FormData();

    const result =  service.post(
      `/comment/${videoId}`,
      formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    );
    return result;
  }







