<script setup>
import { requiredValidator } from "@validators"
import { useLanguageStore } from "@/store"
import { watchEffect } from "vue"
import AppTextarea from "@/@core/components/app-form-elements/AppTextarea.vue"

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  isUpdate: {
    type: Boolean,
    required: false,
  },
  dataEdit: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(["update:isDialogVisible", "addItem", "updateItem"])

const languageStore = useLanguageStore()

const name = ref("")
const introduce = ref("")
const refForm = ref()

const closeDialog = () => {
  emit("update:isDialogVisible", false)
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      const data = {
        name: name.value,
        introduce: introduce.value,
      }

      if (!props.isUpdate) {
        emit("addItem", data)
      } else {
        emit("updateItem", data)
      }
    }
  })
}

watchEffect(() => {
  name.value = props.isUpdate ? props.dataEdit.name : ""
  introduce.value = props.isUpdate ? props.dataEdit.introduce : ""
})
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="600"
    max-height="1000"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="closeDialog" />

    <!-- Dialog Content -->
    <VCard
      :title="languageStore.isEn ? 'User Profile' : 'Thông tin người dùng'"
      style="border-radius: 20px"
    >
      <VForm
        ref="refForm"
        @submit.prevent="onSubmit"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <AppTextField
                v-model="name"
                :rules="[requiredValidator]"
                autofocus
                :label="languageStore.isEn ? 'Name' : 'Tên trung tâm'"
              />
            </VCol>

            <!-- email -->
            <VCol cols="12">
              <AppTextarea
                v-model="introduce"
                :rules="[requiredValidator]"
                :label="languageStore.isEn ? 'Introduce' : 'Giới thiệu'"
                type="email"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardText class="d-flex justify-end flex-wrap gap-3">
          <VBtn
            variant="tonal"
            color="secondary"
            @click="closeDialog"
          >
            {{ languageStore.isEn ? "Close" : "Đóng" }}
          </VBtn>
          <VBtn type="submit">
            {{ languageStore.isEn ? "Save" : "Lưu" }}
          </VBtn>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>
