<script setup>
const productSpecifications = ref([
  {
    specification: "Category",
    value: "Gamepad",
  },
  {
    specification: "Manufacturer",
    value: "",
  },
  {
    specification: "Country of Origin",
    value: "China",
  },
  {
    specification: "Material",
    value: "Leather",
  },
  {
    specification: "Gender",
    value: "Male",
  },
  {
    specification: "Style",
    value: "Gaming",
  },
  {
    specification: "Ships From",
    value: "Hà Nội",
  },
]);

const props = defineProps({
  userAvatar: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
  },
  productStyle: {
    type: String,
  },
  isCorrectWithDesc: {
    type: String,
  },
});
</script>

<template>
  <VCard class="mx-auto" max-width="">
    <VCardTitle class="text-h6 grey lighten-2 pb-0">
      <VAvatar  size="x-small">
        <VImg alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></VImg>
      </VAvatar>
      legenozzy
      <VSpacer></VSpacer>
      <VRating
        v-model="ratingDetailProduct"
        density="compact"
        half-increments
        readonly
        size="x-small"
      />
    </VCardTitle>

    <VCardSubtitle class="pb-0 "
      >2024-04-23 09:57 | Phân loại hàng: TRẮNG ĐEN SỐ 99</VCardSubtitle
    >

    <VCardText class="pt-3">
      <!-- <div>Chất liệu: xì măng</div>
      <div>Màu sắc: dùng với mô tả</div>
      <div>Dùng với mô tả: câu bên trên</div>
      <div>
        giao nhanh, màu đẹp, chất liệu tốt, thoáng khí, mặc mùa này cũng oke.
      </div>
      <div>từ môi cái vụ chủ in nổi ko phải chìm.</div> -->
      <VRow v-for="specific in productSpecifications">
        <VCol cols="2">
          <VCardSubtitle>{{ specific.specification }}</VCardSubtitle>
        </VCol>
        <VCol cols="7">
          <VCardSubtitle>{{
            specific.value ? specific.value : "Updating"
          }}</VCardSubtitle>
        </VCol>
      </VRow>
    </VCardText>

    <VCardActions>
      <VRow>
        <VCol cols="1" class="text-center ml-2">
          <VImg src="https://via.placeholder.com/300"></VImg>
        </VCol>
        <VCol cols="1" class="text-center">
          <VImg src="https://via.placeholder.com/300"></VImg>
        </VCol>
      </VRow>
    </VCardActions>
  </VCard>
</template>

<style scoped></style>
