import { jwtDecrypt,tokenAlive } from "../../shared/jwtHelper";
import axios from "axios";

const state = () => ({
    authData: {
        token: "",
        refreshToken: "",
        tokenExp: "",
        userId: "",
        userName: "",
    },
    loginStatus:'' as string,
    optVerificationStatus : '' as string
});

//to access state
const getters = {
    getLoginStatus(state:any):string{
        return state.loginStatus;
    },
    getAuthData(state:any){
        return state.authData;
    },
    isTokenActive(state:any) {
        if (!state.authData.tokenExp) {
            return false;
        }
        return tokenAlive(state.authData.tokenExp);
    },
    isOtpVerified(state:any){
        return state.optVerificationStatus
    }
};

  //calling async calls
    const actions = {
        async login({commit}:any,payload:any) {
            console.log(payload);
            //  const data = {
            //   //access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs",
            //   access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im5hcnV0byIsInN1YiI6MSwiaWF0IjoxNjA4MjA2MTc5LCJleHAiOjM2MDE2MDgyMDYxNzl9.YvnHmz3TlgfK51yh4gEU9QcHJNmfoVSYT7nQzTfXaBs",
            //   refresh_token: ""
            //  }
            const newPayload = {
                username:payload.username,
                password:payload.password
            }
            const response = await axios.post("http://localhost:3000/auth/login",newPayload)
            .catch(err => {
            console.log(err)
            })
            if(response && response.data){
                commit('saveTokenData', response.data);
                commit('setLoginStatus','success');
            }else{
                commit('setLoginStatus','failure')
            }
            
    },
    async getOTP({commit}:any,payload:any){
        const newPayload = {
            mobileNumber:payload.phNumber
        }
        console.log("getOTP "+payload.phNumber)
        const response :any = await axios.post("http://localhost:3001/send-verification-otp",newPayload)
        .catch(err =>{
            console.log(err)
        })
        console.log(response)
        console.log(response.data.verification.status)
    },
    async verifyOTP({commit}:any,payload:any){
        const newPayload = {
            mobileNumber:payload.phNumber,
            code:payload.code
        }
        const response :any = await axios.post("http://localhost:3001/verify-otp",newPayload)
        .catch(err =>{
            console.log(err)
        })
        console.log(response)
        console.log(response.data.verification_check.status)
        if(response && response.data){
            commit('saveOtpVerificationStatus',response.data)
        }
    },
    logout({commit}:any,payload:any){
        commit('setLogout','')
    }
};

  //state changer for state
    const mutations = {
    saveTokenData(state:any, data:any) {
        // localStorage.setItem("access_token", data.access_token);
        // localStorage.setItem("refresh_token", data.refresh_token);

        localStorage.setItem("access_token", JSON.stringify(data.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(data.refresh_token));
        
        console.log("Local Storage Access Token:"+localStorage.getItem("access_token"))

        const jwtDecodedValue = jwtDecrypt(data.access_token);
        console.log(jwtDecodedValue)
        const newTokenData = {
            token: data.access_token,
            refreshToken: data.refresh_token,
            tokenExp: jwtDecodedValue.exp,
            userId: jwtDecodedValue.sub,
            userName: jwtDecodedValue.username,
        };
        state.authData = newTokenData; 
        console.log(state.authData)
        },
        setLoginStatus(state:any, value:any){
            state.loginStatus = value;
        },
        saveOtpVerificationStatus(state:any,value:any){
            state.optVerificationStatus = value.verification_check.status
        },
        setLogout(state:any,value:any){
            state.loginStatus = ''
            state.optVerificationStatus = ''
            state.authData.token = ''
            state.authData.refresh_token = ''
            state.authData.tokenExp = ''
            state.authData.userId = ''
            state.authData.userName = ''
            localStorage.clear()
        }
};

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}