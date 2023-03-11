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
    return service.post("/user/register",{
        userName,
        userEmail,
        password
    })
}






