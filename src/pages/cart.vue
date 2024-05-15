<template>
    <VContainer>
        <VForm>
            <VTable height="240px">
                <thead>
                    <tr>
                        <th class="text-left">
                            Product
                        </th>
                        <th class="text-left">
                            Price
                        </th>
                        <th class="text-left">
                            Quantity
                        </th>
                        <th class="text-left">
                            Subtotal
                        </th>
                        <th class="text-left">
    
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.name" class="product-row">
                        <td>
                            <VRow no-gutters align="center">
                                <V-Col cols="auto">
                                    <V-img :aspect-ratio="1" class="bg-white product-img" :src="item.img" width="100"
                                        cover></V-img>
                                </V-Col>
                                <V-Col cols="auto" class="product-name">
                                    {{ item.name }}
                                </V-Col>
                            </VRow>
                        </td>
                        <td>{{ item.price }}</td>
                        <td>
                            <VTextField v-model.number="item.quantity" type="number" min="1"
                                class="quantity-input"></VTextField>
                        </td>
                        <td>{{ item.price * item.quantity }}</td>
                        <td>
                            <IconBtn @click="deleteItem(item.desserts.name)">
                                <VIcon icon="tabler-trash" />
                            </IconBtn>
                        </td>
                    </tr>
                </tbody>
            </VTable>
            <div class="button-container">
                <VBtn variant="outlined" size="large" class="return-button">
                    Return To Shop
                </VBtn>
                <VBtn variant="outlined" size="large" class="update-button">
                    Update Cart
                </VBtn>
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
                            <td class="align-right">{{total}}</td>
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
const desserts = ref([
    {
        name: 'Frozen Yogurt',
        price: 159,
        quantity: 1,
        img: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    },
    {
        name: 'Ice cream sandwich',
        price: 237,
        quantity: 3,
        img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
    },
    {
        name: 'Frozen Yogurt',
        price: 159,
        quantity: 1,
        img: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    },
    {
        name: 'Frozen Yogurt',
        price: 159,
        quantity: 1,
        img: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    },
]);
const subtotal = computed(() => {
    return desserts.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
});
const total = subtotal.value - 200;
</script>

<route lang="yaml">
    meta:
      roles: Admin, User
</route>

<style>
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
</style>