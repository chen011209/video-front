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

export const register= (userName,userEmail,password)=>{


  const formData = new FormData();
  formData.append('userName', userName);
  formData.append('userEmail', userEmail);
  formData.append('password', password);
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







