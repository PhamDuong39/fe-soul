<script setup>
import { useTheme } from "vuetify"
import * as oauthAPI from "@/api/oauthAPI"
import { useOverlayStore, useUserStore } from "@/store"
import { $notification } from "@/plugins/global-plugin"
import typeNotification from "@/constant/typeNotification"
import { generateGUID } from "@/utils/guid"
import { useLanguageStore } from "@/store/language"

const { global } = useTheme()
const redirectUri = `${import.meta.env.VITE_FRONT_END_URL}return-url-login`
const responseType = "code"
const overlayStore = useOverlayStore()
const accessToken = ref()
const userInfor = ref()
const isFound = ref()
const userStore = useUserStore()
const languageStore = useLanguageStore()

const onClickGoogle = (clientId, scope, provider) => {
  const popup = window.open(
    `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${provider}`,
    "_blank",
    "width=600,height=400",
  )

  const interval = setInterval(async () => {
    if (popup.closed) {
      clearInterval(interval)
      await loginProviders()
    }
  }, 1000)
}

const onClickFacebook = (clientId, scope, provider) => {
  const popup = window.open(
    `https://www.facebook.com/dialog/oauth?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&state=${provider}`,
    "_blank",
    "width=600,height=400",
  )

  const interval = setInterval(async () => {
    if (popup.closed) {
      clearInterval(interval)
      await loginProviders()
    }
  }, 1000)
}

const loginProviders = async () => {
  const code = localStorage.getItem("code")
  const provider = localStorage.getItem("provider")

  localStorage.removeItem("code")
  localStorage.removeItem("provider")

  await getAccessTokenByCode(provider, code)

  if (!accessToken.value) {
    return
  }

  await getInfoByAccessToken(provider, accessToken.value)

  if (!userInfor.value) {
    return
  }

  await checkInfoUserProvider(userInfor.value)

  if (isFound.value == null) {
    return
  }

  if (!isFound.value) {
    await register(userInfor.value)
  }
  await login(provider, accessToken.value)
}

const getAccessTokenByCode = async (provider, code) => {
  accessToken.value = null
  overlayStore.overlayVisible = true

  const res = await oauthAPI.getAccessTokenByCode(provider, code)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    $notification(
      typeNotification.success,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
    accessToken.value = res.data
  } else {
    $notification(
      typeNotification.error,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
  }
}

const getInfoByAccessToken = async (provider, accessToken) => {
  userInfor.value = null
  overlayStore.overlayVisible = true

  const res = await oauthAPI.getInfoByAccessToken(provider, accessToken)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    $notification(
      typeNotification.success,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
    userInfor.value = res.data
  } else {
    $notification(
      typeNotification.error,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
  }
}

const checkInfoUserProvider = async userInfo => {
  isFound.value = null
  overlayStore.overlayVisible = true

  const res = await oauthAPI.checkInfoUserProvider(userInfo)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    $notification(
      typeNotification.success,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
    isFound.value = res.data
  } else {
    $notification(
      typeNotification.error,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
  }
}

const register = async userInfor => {
  const name = userInfor.name.split(" ")

  const user = {
    userName: generateGUID(),
    email: userInfor.email,
    providerId: userInfor.id,
    provider: userInfor.provider,
    avatarUrl: userInfor.avatarUrl,
    lastName: name[0],
    firstName:
      name.length >= 3
        ? name[name.length - 1]
        : name.length === 2
          ? name[1]
          : "",
    MidName: name.length >= 3 ? name.shift().pop().join(" ") : "",
    isAvatarLocal: false,
  }

  overlayStore.overlayVisible = true

  const res = await oauthAPI.register(user)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    $notification(
      typeNotification.success,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
  } else {
    $notification(
      typeNotification.error,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
  }
}

const login = async (provider, accessTokenProvider) => {
  overlayStore.overlayVisible = true

  const res = await oauthAPI.loginWithProvider(provider, accessTokenProvider)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    $notification(
      typeNotification.success,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
    await userStore.login(res.data)
  } else {
    $notification(
      typeNotification.error,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
  }
}

const authProviders = [
  {
    icon: "fa-facebook",
    color: "#4267b2",
    click: onClickFacebook,
    clientId: import.meta.env.VITE_FACEBOOK_CLIENDID,
    scope: "public_profile",
    provider: "Facebook",
  },
  {
    icon: "fa-google",
    color: "#dd4b39",
    click: onClickGoogle,
    clientId: import.meta.env.VITE_GOOGLE_CLIENDID,
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    provider: "Google",
  },
]
</script>

<template>
  <div class="d-flex justify-center flex-wrap gap-3">
    <VBtn
      v-for="link in authProviders"
      :key="link.icon"
      icon
      variant="tonal"
      size="38"
      :color="global.name.value === 'dark' ? link.colorInDark : link.color"
      class="rounded"
      @click="link.click(link.clientId, link.scope, link.provider)"
    >
      <VIcon
        size="18"
        :icon="link.icon"
      />
    </VBtn>
  </div>
</template>
async async async async
