import service from "../util/axios"

export const login= (mail,password)=>{
    return service.post("/user/login",{
        mail,
        password
    })
}

export const register= (userName,userEmail,password)=>{
    return service.post("/user/register",{
        userName,
        userEmail,
        password
    })
}


