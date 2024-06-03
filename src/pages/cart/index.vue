<template>
    <VContainer>
        <VForm>
            <VCard>
                <VCardTitle class="d-flex justify-space-between">
                    <div class="product">PRODUCT</div>
                    <div class="price">PRICE</div>
                    <div class="quantity">QUANTITY</div>
                    <div class="subtotal">SUBTOTAL</div>
                    <div class="actions"></div>
                </VCardTitle>
            </VCard>
            <VCard class="cart-item d-flex justify-space-between" v-for="item in paginatedItems" :key="item.name">
                <div class="product d-flex align-center">
                    <VRow no-gutters align="center">
                        <VCol cols="auto">
                            <VImg :aspect-ratio="1" class="bg-white product-img" :src="item.img" width="72" cover></VImg>
                        </VCol>
                        <VCol cols="auto" class="product-name">
                            {{ item.name }}
                        </VCol>
                    </VRow>
                </div>
                <div class="price d-flex align-center">{{ item.price }}</div>
                <div class="quantity d-flex align-center">
                    <VTextField v-model.number="item.quantity" type="number" min="1" class="quantity-input"></VTextField>
                </div>
                <div class="subtotal d-flex align-center">{{ item.price * item.quantity }}</div>
                <div class="actions d-flex align-center">
                    <IconBtn @click="deleteItem(item.name)">
                        <VIcon icon="tabler-trash" />
                    </IconBtn>
                </div>
            </VCard>
            <VPagination v-model="currentPage" :length="pageCount" variant="outlined" class="currentPage"/>
            <div class="button-container">
                <VBtn variant="outlined" size="large" class="return-button">Return To Shop</VBtn>
                <VBtn variant="outlined" size="large" class="update-button">Update Cart</VBtn>
            </div>
            <div class="coupon-container">
                <div class="coupon-input">
                    <VTextarea label="Coupon" rows="1" />
                    <VBtn color="error" density="default">Apply Coupon</VBtn>
                </div>
                <VTable class="summary-table">
                    <h2>Cart Total</h2>
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td class="align-right">{{ subtotal }}</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td class="align-right">Free</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td class="align-right">{{ total }}</td>
                        </tr>
                    </tbody>
                    <tr>
                        <td colspan="2" class="button-cell">
                            <VBtn color="error" density="default">Process to checkout</VBtn>
                        </td>
                    </tr>
                </VTable>
            </div>
        </VForm>
    </VContainer>
</template>

<script setup>
import { ref, computed } from 'vue';

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
    },
    {
        name: 'Cupcake',
        price: 300,
        quantity: 1,
        img: "https://cf.shopee.vn/file/ca3c55f9d5d110a6513b67a09ce83824",
    },
    {
        name: 'Cupcake',
        price: 300,
        quantity: 1,
        img: "https://cf.shopee.vn/file/ca3c55f9d5d110a6513b67a09ce83824",
    },
    {
        name: 'Cupcake',
        price: 300,
        quantity: 1,
        img: "https://cf.shopee.vn/file/ca3c55f9d5d110a6513b67a09ce83824",
    },
    {
        name: 'Cupcake',
        price: 300,
        quantity: 1,
        img: "https://cf.shopee.vn/file/ca3c55f9d5d110a6513b67a09ce83824",
    },
]);

const itemsPerPage = ref(3);
const currentPage = ref(1);

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return desserts.value.slice(start, end);
});

const pageCount = computed(() => {
    return Math.ceil(desserts.value.length / itemsPerPage.value);
});

const subtotal = computed(() => {
    return desserts.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
});

const total = computed(() => {
    return subtotal.value;
});

function deleteItem(name) {
    const index = desserts.value.findIndex(item => item.name === name);
    if (index !== -1) {
        desserts.value.splice(index, 1);
    }
}
</script>

<route lang="yaml">
meta:
  roles: Admin, User
</route>

<style>
.product,.quantity{
    display: flex;
    align-items: center;
}
.price,  .subtotal, .actions {
    display: flex;
    align-items: center;
    justify-content: center;
}

.product {
    width: 500px;
    height: 72px;
    text-align: left;
}

.price, .subtotal {
    width: 150px;
    height: 72px;
    text-align: left;
}

.quantity {
    width: 150px;
    height: 72px;
    text-align: left;
}

.actions {
    width: 68px;
    height: 72px;
}

.image {
    max-width: 50px !important;
}

.quantity-input {
    width: 100px;
}

.product-img {
    margin-right: 0.5cm;
}

.button-container {
    margin-top: 1cm;
    display: flex;
    justify-content: space-between;
}

.coupon-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1cm;
}

.coupon-input {
    display: flex;
    align-items: flex-start;
}

.summary-table h2 {
    margin-top: 0.5cm;
    margin-left: 0.3cm;
}

.coupon-input>* {
    margin-right: 0.5cm;
}

.summary-table {
    width: 30%;
    border: 1px solid #000;
}

.button-cell {
    text-align: center;
    padding-bottom: 0.5cm;
}

.align-right {
    text-align: right;
    padding-right: 0.3cm;
}

.currentPage {
    margin-top: 0.5cm;
}

.cart-item {
    margin-top: 0.5cm;
}
</style>
