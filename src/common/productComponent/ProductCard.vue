
<script setup>
import { ref } from "vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
  },
});

const hover = ref(false);
</script>

<template>
  <VCard class="product-card my-3">
    <div class="product-image-container">
      <VImg :src="props.image" class="product-image"></VImg>
      <div class="top-right-icons">
        <VBtn size="x-small" color="black" icon="tabler-heart"></VBtn>
        <VBtn size="x-small" color="black" icon="tabler-eye"></VBtn>
      </div>
      <div v-if="props.discount" class="discount-tag">{{ props.discount }}</div>
      <div class="bottom-overlay" v-if="hover">
        <VBtn color="black" class="add-to-cart-btn">Add to Cart</VBtn>
      </div>
    </div>
    <VCardTitle class="product-title">{{ props.name }}</VCardTitle>
    <VCardSubtitle class="product-price">{{ props.price }}</VCardSubtitle>
    <VCardActions>
      <VRating :value="3" half-increments></VRating>
    </VCardActions>
  </VCard>
</template>


<style lang="scss" scoped>
.product-card {
  width: 92%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  position: relative;
}

.product-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-price {
  color: red;
}

.product-image-container {
  position: relative;
}

.top-right-icons {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.discount-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: red;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: bold;
}

.bottom-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover .bottom-overlay {
  opacity: 1;
}

.add-to-cart-btn {
  color: white;
  text-transform: uppercase;
}
</style>
