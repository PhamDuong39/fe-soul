<script setup>
import { useLanguageStore } from "@/store/language"
import { VDataTableServer } from "vuetify/labs/VDataTable"
import { paginationMeta } from "@/utils/showList"
import * as tenantAPI from "@/api/tenantAPI"
import { useOverlayStore } from "@/store"
import typeNotification from "@/constant/typeNotification"
import { $notification } from "@/plugins/global-plugin"
import AppSelect from "@/@core/components/app-form-elements/AppSelect.vue"
import { localeLanguage } from "@/utils/dayjsUtils"
import ExportDataToFile from "@/common/dataComponent/ExportDataToFile.vue"
import AppTextField from "@/@core/components/app-form-elements/AppTextField.vue"
import DialogCreateOrUpdate from "@/views/pages/tenant/DialogCreateOrUpdate.vue"
import ConfirmAction from "@/common/dataComponent/ConfirmAction.vue"
import { onBeforeMount } from "vue"

const languageStore = useLanguageStore()

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  searchOption: {
    searchQuery: "",
  },
})

const data = ref([])
const totalData = ref(0)
const totalPage = ref(0)
const overlayStore = useOverlayStore()
const isDialogVisible = ref(false)
const isUpdate = ref(false)
const dataEdit = ref({})

const fetchData = async () => {
  overlayStore.overlayVisible = true

  const res = await tenantAPI.getData(options.value)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    data.value = res.data.data
    totalData.value = res.data.totalData
    totalPage.value = res.data.totalPage
    options.value.page = res.data.page
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

const headers = computed(() => {
  return [
    {
      title: languageStore.isEn ? "Action" : "Thao tác",
      key: "action",
      align: "center",
    },
    {
      title: languageStore.isEn ? "Name" : "Tên trung tâm",
      key: "name",
      sortable: true,
      align: "center",
    },
    {
      title: languageStore.isEn ? "Introduce" : "Giới thiệu",
      key: "introduce",
      sortable: false,
      align: "center",
    },
    {
      title: languageStore.isEn ? "Date added" : "Ngày được thêm",
      key: "dateAdded",
      sortable: true,
      align: "center",
    },
  ]
})

const headersExport = computed(() => {
  return {
    name: languageStore.isEn ? "Name" : "Tên trung tâm",
    introduce: languageStore.isEn ? "Introduce" : "Giới thiệu",
    dateAdded: languageStore.isEn ? "Date added" : "Ngày được thêm",
  }
})

const exportData = () => {
  return data.value.map(c => {
    const obj = { ...c }

    obj.dateAdded = localeLanguage(languageStore.isEn, obj.dateAdded)

    return obj
  })
}

const addItem = async ỉtemValue => {
  overlayStore.overlayVisible = true

  const res = await tenantAPI.addData(ỉtemValue)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    isDialogVisible.value = false
    await fetchData()
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

const updateItem = async ỉtemValue => {
  overlayStore.overlayVisible = true

  dataEdit.value.name = ỉtemValue.name
  dataEdit.value.introduce = ỉtemValue.introduce

  const res = await tenantAPI.updateData(dataEdit.value)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    isDialogVisible.value = false
    await fetchData()
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

const deleteItem = async ỉtemId => {
  overlayStore.overlayVisible = true

  const res = await tenantAPI.deleteData(ỉtemId)

  overlayStore.overlayVisible = false

  if (res.statusCode === 200) {
    isDialogVisible.value = false
    await fetchData()
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

const openDialog = (isUpdateValue, item) => {
  dataEdit.value = item
  isUpdate.value = isUpdateValue
  isDialogVisible.value = true
}

onBeforeMount( ()=>{
  fetchData()
})
</script>

<template>
  <div>
    <DialogCreateOrUpdate
      :is-dialog-visible="isDialogVisible"
      :is-update="isUpdate"
      :data-edit="dataEdit"
      @update:is-dialog-visible="isDialogVisible = $event"
      @add-item="addItem($event)"
      @update-item="updateItem($event)"
    />

    <VExpansionPanels class="mb-6">
      <VExpansionPanel>
        <VExpansionPanelTitle style="font-size: large; font-weight: 600">
          {{ languageStore.isEn ? "Advanced search" : "Tìm kiếm nâng cao" }}
        </VExpansionPanelTitle>
        <VExpansionPanelText />
      </VExpansionPanel>
    </VExpansionPanels>

    <VCard>
      <VCardText class="d-flex flex-wrap py-4 gap-4">
        <div class="me-3 d-flex gap-3">
          <AppSelect
            v-model="options.itemsPerPage"
            :items="[
              { value: 10, title: '10' },
              { value: 25, title: '25' },
              { value: 50, title: '50' },
              { value: 100, title: '100' },
              { value: -1, title: languageStore.isEn ? 'All' : 'Tất cả' },
            ]"
            style="width: 8rem"
            @update:model-value="fetchData"
          />
        </div>
        <VSpacer />

        <div class="d-flex align-center flex-wrap gap-4">
          <div style="inline-size: 15rem">
            <AppTextField
              v-model="options.searchOption.searchQuery"
              :placeholder="languageStore.isEn ? 'Search' : 'Tìm kiếm'"
              density="compact"
              @change="fetchData"
            />
          </div>

          <ExportDataToFile
            :data="data"
            file-name="My tenant"
            :function-convert="exportData"
            :headers-export="headersExport"
          />

          <VBtn
            prepend-icon="tabler-plus"
            @click="openDialog(false, {})"
          >
            {{ languageStore.isEn ? "Add New" : "Thêm mới" }}
          </VBtn>
        </div>
      </VCardText>
      <VDivider />

      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:sort-by="options.sortBy"
        v-model:group-by="options.groupBy"
        v-model:page="options.page"
        :items="data"
        :items-length="totalData"
        class="rounded-lg"
        :headers="headers"
        @update:sort-by="fetchData"
        @update:group-by="fetchData"
      >
        <template #item.action="{ item }">
          <IconBtn @click="openDialog(true, item.raw)">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <ConfirmAction
            :text="languageStore.isEn ? 'Are you sure you want to delete this tenant?' : 'Bạn có chắc muốn xoá trung tâm nay không?'"
            icon-btn="tabler-trash"
            @confirm="deleteItem(item.raw.id)"
          />
        </template>

        <template #item.dateAdded="{ item }">
          {{ localeLanguage(languageStore.isEn, item.raw.dateAdded) }}
        </template>

        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta(options, totalData, languageStore.isEn) }}
            </p>

            <VPagination
              v-model="options.page"
              :length="totalPage"
              :total-visible="$vuetify.display.xs ? 1 : 5"
              @update:model-value="fetchData"
            >
              <template #prev="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  {{ languageStore.isEn ? "Previous" : "Trước" }}
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  {{ languageStore.isEn ? "Next" : "Sau" }}
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
    </VCard>
  </div>
</template>

<route lang="yaml">
meta:
  roles: Admin
</route>
