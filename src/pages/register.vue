<script setup>
import { VForm } from "vuetify/components/VForm"
import authV2RegisterIllustrationBorderedDark from "@images/pages/auth-v2-register-illustration-bordered-dark.png"
import authV2RegisterIllustrationBorderedLight from "@images/pages/auth-v2-register-illustration-bordered-light.png"
import authV2RegisterIllustrationDark from "@images/pages/auth-v2-register-illustration-dark.png"
import authV2RegisterIllustrationLight from "@images/pages/auth-v2-register-illustration-light.png"
import authV2MaskDark from "@images/pages/misc-mask-dark.png"
import authV2MaskLight from "@images/pages/misc-mask-light.png"
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue"
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import {
  userNameValidator,
  emailValidator,
  requiredValidator,
  lengthValidator,
} from "@validators"
import * as oauthAPI from "@/api/oauthAPI"
import { $notification } from "@/plugins/global-plugin"
import typeNotification from "@/constant/typeNotification"
import { useOverlayStore, useUserStore } from "@/store"
import { useLanguageStore } from "@/store/language"

const refVForm = ref()
const username = ref("")
const email = ref("")
const password = ref("")
const privacyPolicies = ref(false)
const overlayStore = useOverlayStore()
const languageStore = useLanguageStore()
const userStore = useUserStore()

const register = async () => {
  const user = {
    userName: username.value,
    email: email.value,
    password: password.value,
  }

  overlayStore.overlayVisible = true

  const res = await oauthAPI.register(user)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    $notification(
      typeNotification.success,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
    await login()
  } else {
    $notification(
      typeNotification.error,
      languageStore.isEn ? res.notificationEn : res.notificationVi,
    )
  }
}

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

const imageVariant = useGenerateImageVariant(
  authV2RegisterIllustrationLight,
  authV2RegisterIllustrationDark,
  authV2RegisterIllustrationBorderedLight,
  authV2RegisterIllustrationBorderedDark,
  true,
)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)

const onSubmit = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) await register()
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
            max-width="441"
            :src="imageVariant"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="d-flex align-center justify-center"
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
            {{
              languageStore.isEn
                ? "Adventure starts here 🚀"
                : "Bắt đầu khám phá từ đây 🚀"
            }}
          </h5>
          <p class="mb-0">
            {{
              languageStore.isEn
                ? "Make your app management easy and fun!"
                : "Để việc quản lí ứng dụng trở nên dễ dang và thú vị"
            }}
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <AppTextField
                  v-model="username"
                  autofocus
                  :rules="[requiredValidator, userNameValidator]"
                  :label="languageStore.isEn ? 'Username' : 'Tên người dùng'"
                />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  type="email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  :rules="[requiredValidator, lengthValidator(password, 5)]"
                  :label="languageStore.isEn ? 'Password' : 'Mật khẩu'"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requiredValidator]"
                    inline
                  >
                    <template #label>
                      <span class="me-1">
                        {{ languageStore.isEn ? "I agree to" : "Tôi đồng ý" }}
                        <a
                          href="javascript:void(0)"
                          class="text-primary"
                        >{{
                          languageStore.isEn
                            ? "privacy policy & terms"
                            : "chính sách và điều khoản bảo mật"
                        }}</a>
                      </span>
                    </template>
                  </VCheckbox>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  {{ languageStore.isEn ? "Sign up" : "Đăng ký" }}
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>{{
                  languageStore.isEn
                    ? "Already have an account?"
                    : "Đã có tài khoản?"
                }}</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  {{ languageStore.isEn ? "Sign in instead" : "Đăng nhập" }}
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
