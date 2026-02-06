import request from "@/utils/request";
import axios from "axios";

const api = {
  existEmail: "/front/user/exist/email",
  registerEmail: "/front/user/register/email",
  sendEmailCode: "/front/verify-code/send",
  emailCodeCheck: "/front/verify-code/check",
  loginEmail: "/front/user/login/email",
  loginGoogle: "/front/user/login/google",
};

export const existEmail = (params: ExistEmailRequestParams) => {
  return request<ExistEmailResponseData>({
    url: api.existEmail,
    method: "get",
    params,
  });
};

export const registerEmail = (params: RegisterEmailRequestParams) => {
  return request<RegisterEmailResponseData>({
    url: api.registerEmail,
    method: "post",
    params,
  });
};

export const sendEmailCode = (params: SendEmailCodeRequestParams) => {
  return request<SendEmailCodeResponseData>({
    url: api.sendEmailCode,
    method: "post",
    params,
  });
};

export const emailCodeCheck = (params: EmailCodeCheckRequestParams) => {
  return request<EmailCodeCheckResponseData>({
    url: api.emailCodeCheck,
    method: "post",
    params,
  });
};

export const loginEmail = (params: LoginEmailRequestParams) => {
  return request<LoginEmailResponseData>({
    url: api.loginEmail,
    method: "post",
    params,
  });
};

export const loginGoogle = (params: LoginGoogleRequestParams) => {
  return request<LoginGoogleResponseData>({
    url: api.loginGoogle,
    method: "post",
    params,
  });
};

export const getGoogleUserInfo = (params: { accessToken: string }) => {
  return axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${params.accessToken}` },
  });
};
