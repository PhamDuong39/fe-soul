<script setup>
import { VForm } from "vuetify/components/VForm"
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue"
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant"
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png"
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png"
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png"
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png"
import authV2MaskDark from "@images/pages/misc-mask-dark.png"
import authV2MaskLight from "@images/pages/misc-mask-light.png"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import { requiredValidator, userNameValidator } from "@validators"
import * as oauthAPI from "@/api/oauthAPI"
import { $notification } from "@/plugins/global-plugin"
import typeNotification from "@/constant/typeNotification"
import { useOverlayStore, useUserStore } from "@/store"
import { useLanguageStore } from "@/store/language"

const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true,
)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const refVForm = ref()
const email = ref("cuong")
const password = ref("191023")
const rememberMe = ref(false)
const overlayStore = useOverlayStore()
const languageStore = useLanguageStore()
const userStore = useUserStore()

const login = async () => {
  overlayStore.overlayVisible = true

  const res = await oauthAPI.loginWithPassword(email.value, password.value)

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

const onSubmit = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) await login()
  })
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
          :src="authThemeMask"
          class="auth-footer-mask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
          />

          <h5 class="text-h5 mb-1">
            {{ languageStore.isEn ? "Welcome to" : "Chào mừng đến với" }}
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>!
            👋🏻
          </h5>

          <p class="mb-0">
            {{
              languageStore.isEn
                ? "Please sign-in to your account and start the adventure"
                : "Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu khám phá"
            }}
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :label="
                    languageStore.isEn
                      ? 'Username or Email'
                      : 'Tên người dùng hoặc email'
                  "
                  type="email"
                  autofocus
                  :rules="[requiredValidator, userNameValidator]"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  :label="languageStore.isEn ? 'Password' : 'Mật khẩu'"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  :rules="[requiredValidator]"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="rememberMe"
                    :label="languageStore.isEn ? 'Remember me' : 'Nhớ mật khẩu'"
                  />
                  <a
                    class="text-primary ms-2 mb-1"
                    href="#"
                  >
                    {{
                      languageStore.isEn ? "Forgot Password?" : "Quên mật khẩu?"
                    }}
                  </a>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  {{ languageStore.isEn ? "Login" : "Đăng nhập" }}
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center"
              >
                <span>{{
                  languageStore.isEn
                    ? "New on our platform?"
                    : "Bạn là người dùng mới?"
                }}</span>

                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'register' }"
                >
                  {{
                    languageStore.isEn ? "Create an account" : "Tạo tài khoản"
                  }}
                </RouterLink>
              </VCol>

              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />

                <span class="mx-4">{{
                  languageStore.isEn ? "or" : "hoặc"
                }}</span>

                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  redirectIfLoggedIn: true
</route>
