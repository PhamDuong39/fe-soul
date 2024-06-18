<script setup>
import ProductCard from "@/common/productComponent/ProductCard.vue";
import ProductReview from "@/common/productComponent/ProductReview.vue";
import ProductImage2 from "@images/products/Buy DualSense™ Wireless PS5™ Controller_ Midnight Black _ PlayStation® (US) (1).jpg";
import ProductImage3 from "@images/products/Buy DualSense™ Wireless PS5™ Controller_ Midnight Black _ PlayStation® (US).jpg";
import ProductImage1 from "@images/products/PS5 And Xbox Series X Are Likely Going To Keep Playing ‘Price Chicken’ Through June.jpg";
import ProductImage4 from "@images/products/gamepad.jpg";
import ProductImage5 from "@images/products/Кастомный цветной джойстик, игровой контроллер Playstation концепт.jpg";
import { ref } from "vue";

const detailProduct = ref({
  image: ProductImage5,
  name: "Havic HV G-92 Gamepad",
  price: "300",
  rating: 4.5,
  discount: "-20%",
  description:
    "Thắt lưng nam da cao cấp, dây lưng nam mặt khóa tự động sang trọng, nịt da màu đen TLĐ01 Dây Lưng Nam Khóa gạt tự động tiện lợi dễ dàng sử dụng*  MỤC ĐÍCH SỬ DỤNG - Thắt lưng nam có thể đeo đi chơi, dạo phố, dự tiệc đều tạo một phong cách đầy cá tính sang trọng. - Có thể dùng Thắt lưng nam làm món quà tặng anh, em, bạn bè đồng nghiệp trong các dịp sự kiện, sinh nhật đều rất đẹp và ý nghĩa. Tinh xảo và sắc nét được tạo khối và mạ đẹp mắt tạo nên nét sang trọng và đẳng cấp cho món phụ kiện luôn dễ dàng hấp dẫn các quý ông và là điểm sáng tinh tế cho mọi trang phục.",
});

const subImageProducts = ref([
  ProductImage2,
  ProductImage3,
  ProductImage4,
  ProductImage1,
]);

const ratingDetailProduct = ref(detailProduct.value.rating);

const items = ref([
  {
    title: "Account",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Gaming",
    disabled: false,
    href: "breadcrumbs_link_1",
  },
  {
    title: "Havic HV G-92 Gamepad",
    disabled: true,
    href: "breadcrumbs_link_2",
  },
]);

const dealSupports = ref([
  {
    title: "Free Delivery",
    subTitle: "Enter your postal code for Delivery Availability",
    icon: "tabler-truck-delivery",
    border: "4px 4px 0 0",
  },
  {
    title: "Return Delivery",
    subTitle: "Free 30 Days Delivery Returns. Details",
    icon: "tabler-refresh",
    border: "0 0 4px 4px",
  },
]);

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

const relatedItems = ref([
  {
    image: "https://via.placeholder.com/300",
    name: "Havic HV G-92 Gamepad",
    price: "$100",
    rating: "4.5",
    discount: "-20%",
  },
  {
    image: "https://via.placeholder.com/300",
    name: "Havic HV G-92 Gamepad",
    price: "$200",
    rating: "4.5",
    discount: "-20%",
  },
  {
    image: "https://via.placeholder.com/300",
    name: "Havic HV G-92 Gamepad",
    price: "$300",
    rating: "4.5",
    discount: "-20%",
  },
  {
    image: "https://via.placeholder.com/300",
    name: "Havic HV G-92 Gamepad",
    price: "$400",
    rating: "4.5",
  },
]);

const productReviews = ref([
  {
    userAvatar: "",
    userName : "",
    rating : "",
    dateReview: "",
    productCategory: "",
    productStyle: "",
    isCorrectWithDesc: "",
    review: "",
  }
]);

const selectedColor = ref("red");
const selectedSize = ref("S");
const colorsRadio = ["red", "green", "blue"];
const sizesRadio = ["S", "M", "L", "XL"];
</script>

<template>
  <div class="mb-10 mt-10 ml-10">
    <VBreadcrumbs :items="items">
      <template v-slot:title="{ item }">
        {{ item.title.toUpperCase() }}
      </template>
    </VBreadcrumbs>
  </div>

  <VContainer>
    <!-- 👉Product  -->
    <div class="product">
      <VRow>
        <VCol cols="7">
          <div class="image">
            <VRow>
              <VCol cols="4">
                <div
                  v-for="subImage in subImageProducts"
                  class="d-flex align-start flex-column"
                >
                  <VImg
                    class="sub-image mb-4 rounded bg-grey-lighten-2"
                    max-height="138"
                    max-width="170"
                    :src="subImage"
                    cover
                  ></VImg>
                </div>
              </VCol>

              <VCol class="d-flex align-center flex-column" cols="8">
                <VImg
                  class="main-image rounded bg-grey-lighten-2"
                  max-height="600"
                  max-width="500"
                  :src="detailProduct.image"
                  cover
                ></VImg>
              </VCol>
            </VRow>
          </div>
        </VCol>

        <VSpacer />

        <VCol cols="5">
          <div class="description">
            <VCard variant="text">
              <VCardItem class="pt-0">
                <!-- 👉Description  -->
                <VCardTitle> {{ detailProduct.name }} </VCardTitle>

                <div class="d-flex align-center card-review py-5">
                  <VRating
                    v-model="ratingDetailProduct"
                    density="compact"
                    half-increments
                    readonly
                  />
                  <VDivider
                    vertical
                    class="ml-3 mr-3 border-opacity-50 text-body-2"
                  ></VDivider>
                  <VCardText class="px-4 pl-0 py-0 text-body-2">
                    ( 150 Reviews )
                  </VCardText>
                </div>

                <VCardSubtitle class="text-button text-high-emphasis">
                  ${{ detailProduct.price }}
                </VCardSubtitle>

                <VCardText class="px-0 text-body-2">
                  PlayStation 5 Controller Skin High quality vinyl with air
                  channel adhesive for easy bubble free install & mess free
                  removal Pressure sensitive.
                </VCardText>
                <VDivider class="mb-3 border-opacity-50" />

                <!-- 👉Form  -->
                <div class="form mb-6">
                  <VRow>
                    <VCol cols="12">
                      <VRow no-gutters>
                        <!-- 👉 Color -->
                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex align-items-center"
                        >
                          <label class="v-label text-body-2 text-high-emphasis"
                            >Colours:</label
                          >
                        </VCol>

                        <VCol cols="12" md="9">
                          <VRadioGroup v-model="selectedColor" inline>
                            <div>
                              <VRadio
                                v-for="radio in colorsRadio"
                                :key="radio"
                                :label="radio"
                                :color="radio"
                                :value="radio"
                              />
                            </div>
                          </VRadioGroup>
                        </VCol>
                      </VRow>
                    </VCol>

                    <VCol cols="12">
                      <VRow no-gutters>
                        <!-- 👉 Size -->
                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex align-items-center"
                        >
                          <label class="v-label text-body-2 text-high-emphasis"
                            >Size</label
                          >
                        </VCol>

                        <VCol cols="12" md="9">
                          <VRadioGroup v-model="selectedSize" inline>
                            <div>
                              <VRadio
                                v-for="size in sizesRadio"
                                :key="size"
                                :label="size"
                                :color="size"
                                :value="size"
                              />
                            </div>
                          </VRadioGroup>
                        </VCol>
                      </VRow>
                    </VCol>

                    <VCol cols="12">
                      <VRow no-gutters>
                        <!-- 👉 Button Action -->
                        <VCol cols="4" class="d-flex align-items-center">
                          <!-- <VBtn variant="outlined" color="black" rounded-s>
                            <VIcon icon="tabler-minus" />
                          </VBtn> -->
                          <VTextField
                            class="quantity"
                            v-model="quantity"
                            type="number"
                            rounded="0"
                            placeholder="1"
                            min="1"
                          />
                          <!-- <VBtn color="error" rounded-e>
                            <VIcon icon="tabler-plus" />
                          </VBtn> -->
                        </VCol>

                        <VCol cols="6">
                          <VBtn class="w-75 ml-4" rounded="1" color="error">
                            Buy Now
                          </VBtn>
                        </VCol>

                        <VCol cols="1">
                          <VBtn
                            class=""
                            rounded="1"
                            variant="outlined"
                            color="black"
                          >
                            <VIcon icon="tabler-heart" />
                          </VBtn>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>
                </div>

                <!-- 👉Deal -->
                <VList lines="three">
                  <VListItem
                    v-for="deal in dealSupports"
                    :key="deal"
                    :title="deal.title"
                    :subtitle="deal.subTitle"
                    :prepend-icon="deal.icon"
                    :style="{
                      border: '1px solid black',
                      'border-radius': deal.border,
                    }"
                  >
                  </VListItem>
                </VList>
              </VCardItem>
            </VCard>
          </div>
        </VCol>
      </VRow>
    </div>

    <!-- 👉Product Description -->
    <VCard class="mb-6">
      <div class="product-specific">
        <VCardTitle class="my-5">Product Specifications</VCardTitle>
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
      </div>

      <div class="product-desc">
        <VCardTitle class="my-5">Product Description</VCardTitle>
        <VImg
          class="bg-grey-lighten-2"
          max-height="500"
          :src="detailProduct.image"
        ></VImg>
        <VCardText>{{ detailProduct.description }} </VCardText>
      </div>
    </VCard>

    <!-- 👉Product Rating -->
    <VCard>
      <VCardTitle class="my-5">Product Ratings</VCardTitle>
      <div class="review-filter my-5">
        <v-card class="d-flex align-start py-8 mx-5" color="indigo">
          <div class="d-flex align-center flex-column">
            <div class="text-h2">{{ detailProduct.rating }} out of 5</div>

            <v-rating
              :model-value="ratingDetailProduct"
              half-increments
              readonly
            ></v-rating>
            <div class="px-3">3,360 ratings</div>
          </div>

          <v-list
            bg-color="transparent"
            class="d-flex mx-auto"
            density="compact"
          >
            <v-list-item v-for="(rating, i) in 5" :key="i">
              <VBtn variant="outlined" class="mr-1" color="error">
                <template v-slot:prepend>
                  <span>{{ rating }} Star</span>
                </template>

                <template v-slot:append>
                  <div class="rating-values">
                    <span class="d-flex justify-end">
                      ({{ rating * 224 }})
                    </span>
                  </div>
                </template>
              </VBtn>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
      <div class="review-comment">
        <ProductReview />
      </div>
    </VCard>

    <!-- 👉Related -->
    <div class="related">
      <VRow>
        <VCol class="mt-12" cols="12">
          <VRow>
            <VCol class="pl-0" cols="12" md="2">
              <div class="related-title d-flex align-center">
                <VDivider
                  :thickness="12"
                  color="error"
                  vertical
                  class="border-opacity-100"
                ></VDivider>
                <p class="font-weight-medium ma-0 ml-3">Related item</p>
              </div>
            </VCol>
          </VRow>
        </VCol>

        <!-- 👉Items -->
        <VCol cols="12">
          <VRow no-gutters>
            <VCol v-for="item in relatedItems" lg="3" sm="4" xs="6">
              <ProductCard
                :image="item.image"
                :name="item.name"
                :price="item.price"
                :rating="item.rating"
                :discount="item.discount"
              />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </div>
  </VContainer>
</template>

<style lang="scss" scoped>
.product .image .sub-image {
  background-color: lightgray !important;
  min-width: 170px !important;
  min-height: 138px !important;
}

.product .image .main-image {
  background-color: lightgray !important;
  min-width: 500px !important;
  min-height: 600px !important;
}

.product .description .form .quantity {
  border: none !important;
}

.related .related-title {
  border-left: 1px red;
  min-height: 30px !important;
}

.related .related-title p {
  color: red !important;
}
</style>

<route lang="yaml">
meta:
  roles: Admin,User
</route>
