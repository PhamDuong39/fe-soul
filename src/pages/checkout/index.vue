<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <h2> Billing Summary
        </h2>
      </VCol>
      <VCol cols="12" md="6">
        <VForm>
          <AppTextField label="First Name*" class="spacing"/>
          <AppTextField  label="Company Name*" class="spacing"/>
          <AppTextField label="Street Address*" class="spacing"/>
          <AppTextField label="Apartment, floor, etc. (optional)" class="spacing"/>
          <AppTextField label="Town/City*" class="spacing"/>
          <AppTextField label="Phone Number*" class="spacing"/>
          <AppTextField label="Email Address*" class="spacing"/>
          <v-checkbox label="Save this information for faster check-out next time"></v-checkbox>
        </VForm>
      </VCol>
      <VCol cols="12" md="6">
        <VCard>
          <VCardText v-for="item in desserts" :key="item.name">
            <VRow>
              <VCol cols="12" md="2">
                <div>
                  <VImg :aspect-ratio="1" class="bg-white product-img" :src="item.img" width="72" cover></VImg>
                </div>
              </VCol>
              <VCol cols="12" md="8" class="d-flex align-center">
                <div>{{ item.name }}</div>
              </VCol>
              <VCol cols="12" md="2" class="d-flex align-center">
                <div>{{ item.price }}</div>
              </VCol>
            </VRow>
          </VCardText>
          <VDivider></VDivider>
          <VCardText>
            <VRow>
              <VCol cols="12" md="10">
                <div>
                  Subtotal:
                </div>
              </VCol>
              <VCol cols="12" md="2">
                  {{ subtotal }}
              </VCol>
              <VDivider></VDivider>
              <VCol cols="12" md="10">
                <div>
                  Shipping:
                </div>
              </VCol>
              <VCol cols="12" md="2">
                  <div>Free</div>
              </VCol>
              <VDivider></VDivider>
              <VCol cols="12" md="10">
                <div>
                  Total:
                </div>
              </VCol>
              <VCol cols="12" md="2">
                  {{ total }}
              </VCol>
            </VRow>
          </VCardText>
          <VCardText>
            <v-radio-group>
              <v-radio label="Bank" value="bank"></v-radio>
              <v-radio label="Cash on delivery" value="cod"></v-radio>
            </v-radio-group>
            <VRow>
              <VCol md="8">
                <VTextField label="Coupon Code"></VTextField>
              </VCol>
              <VCol md="4">
                <v-btn color="error" @click="applyCoupon">
                  Apply Coupon
                </v-btn>
              </VCol>
            </VRow>
            <VBtn color="error" block @click="placeOrder" style="margin-top: 0.5cm">
              Place Order
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
const desserts = ref([
  {
    name: 'Frozen Yogurt',
    price: 159,
    quantity: 1,
    img: "https://hoangreviews.com/wp-content/uploads/2021/07/may-choi-game.jpg",
  },
  {
    name: 'Ice cream sandwich',
    price: 237,
    quantity: 3,
    img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
  },
  {
    name: 'Eclair',
    price: 160,
    quantity: 2,
    img: "https://cf.shopee.vn/file/ca3c55f9d5d110a6513b67a09ce83824",
  },
  {
    name: 'Cupcake',
    price: 300,
    quantity: 1,
    img: "https://cf.shopee.vn/file/ca3c55f9d5d110a6513b67a09ce83824",
  }
]);
const subtotal = computed(() => {
    return desserts.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
});

const total = computed(() => {
    return subtotal.value;
});
</script>
<style>
.spacing {
  margin-bottom: 0.8cm;
  background-color: #F5F5F5;
}
</style>