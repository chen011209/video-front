import service from "../util/axios"

export const login= (mail,password)=>{

    const formData = new FormData();
    formData.append('mail', mail);
    formData.append('password', password);
    const result =  service.post(
      "/user/login",
      formData,
      {
        headers: {
          'token':"",
          'Content-Type': 'application/json',
        },
      },
      true
    );

    return result


    // return service.post("/user/login",{
    //     mail,
    //     password
    // })
}

export const register= (userName,userEmail,password,checkCode)=>{


  const formData = new FormData();
  formData.append('userName', userName);
  formData.append('userEmail', userEmail);
  formData.append('password', password);
  formData.append('verificationCode', checkCode);
  const result =  service.post(
    "/user/register",
    formData,
    {
      headers: {
        'token':"",
        'Content-Type': 'application/json',
      },
    },
    true
  );

  return result

}

export const logOut= ()=>{

  const formData = new FormData();
  const result =  service.post(
    "/user/logout",
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  );

  return result

}

export const getMyInfo= ()=>{

  const formData = new FormData();
  const result =  service.get(
    "/user/info/my",
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  );

  return result

}


export const getUserInfo= (userId)=>{

  const formData = new FormData();
  const result =  service.get(
    "/user/info?userId="+userId,
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  );

  return result

}

export const uoloadAvatar= (avatarPath)=>{

  const formData = new FormData();
  formData.append('avatarPath', avatarPath);
  const result =  service.post(
    "/user/avatar",
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  );

  return result

}


export const editUser= (userName,signature)=>{

  const formData = new FormData();
  formData.append('userName', userName);
  formData.append('signature', signature);
  const result =  service.post(
    "/user/edit",
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  );

  return result

}



export const getMailCode= (email)=>{


  const formData = new FormData();
  const result =  service.post(
    "/user/sendEmail?emailReceiver=" + email,
    formData,
    {
      headers: {
        'token':"",
        'Content-Type': 'application/json',
      },
    },
    true
  );

  return result

}




