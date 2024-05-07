import axiosIns from "@/plugins/axios"

const controlerName = "oauth"

export async function register(user) {
  const res = await axiosIns.post(`${controlerName}/register`, user)

  return res.data
}

export async function loginWithPassword(userNameOrEmail, password) {
  const res = await axiosIns.get(`${controlerName}/loginwithpassword`, {
    params: { userNameOrEmail, password },
  })

  return res.data
}

export async function getUserInfo() {
  const res = await axiosIns.get(`${controlerName}/getuserinfo`)

  return res.data
}

export async function getAccessTokenByCode(provider, code) {
  const res = await axiosIns.get(`${controlerName}/getaccesstokenbycode`, {
    params: { provider, code },
  })

  return res.data
}

export async function getInfoByAccessToken(provider, accessToken) {
  const res = await axiosIns.get(`${controlerName}/getinfobyaccesstoken`, {
    params: { provider, accessToken },
  })

  return res.data
}

export async function loginWithProvider(provider, accessTokenProvider) {
  const res = await axiosIns.get(`${controlerName}/loginwithprovider`, {
    params: { provider, accessTokenProvider },
  })

  return res.data
}

export async function checkInfoUserProvider(userInfo) {
  const res = await axiosIns.post(
    `${controlerName}/checkinfouserprovider`,
    userInfo,
  )

  return res.data
}
