<template>
  <v-container>
    <v-row class="align-center mb-4">
      <v-col>
        <h2 class="wishlist-title">Wishlist ({{ wishlistItems.length }})</h2>
      </v-col>
      <v-col class="text-right">
        <v-btn class="button move-all-btn" @click="moveAllToBag">Move All To Bag</v-btn>
      </v-col>
    </v-row>

    <v-row >
      <v-col cols="3" v-for="item in wishlistItems" :key="item.name" class="product-card">
        <v-card class="product-card-content">
          <v-img :src="item.img" class="product-img" contain></v-img>
          <v-icon class="delete-icon" @click="deleteWishlistItem(item.name)">mdi-delete</v-icon>
          <v-card-actions class="add-to-cart-section">
            <v-btn color="primary" class="add-to-cart-btn white-text " text>
              <v-icon left class="white--text">mdi-cart</v-icon>
              Add To Cart
            </v-btn>
          </v-card-actions>
          <v-card-title class="product-name">{{ item.name }}</v-card-title>
          <v-card-subtitle style="margin-bottom: 15px;">
            <span class="discount-price">${{ item.discountPrice }}</span>
            <span class="original-price" v-if="item.originalPrice">${{ item.originalPrice }}</span>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="align-center mb-4">
      <v-col>
        <h2 class="just-for-you-title">Just For You</h2>
      </v-col>
      <v-col class="text-right">
        <v-btn class="view-all-btn" @click="viewAll">See All</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3" v-for="item in justForYouItems" :key="item.name" class="product-card just-for-you-card">
        <v-card class="product-card-content">
          <v-img :src="item.img" class="product-img" contain></v-img>
          <v-icon class="view-icon" @click="viewItemDetails(item.name)">mdi-eye</v-icon>
          <v-card-actions class="add-to-cart-section">
            <v-btn color="primary" class="add-to-cart-btn white-text" text>
              <v-icon left class="white--text">mdi-cart</v-icon>
              Add To Cart
            </v-btn>
          </v-card-actions>
          <v-card-title class="product-name">{{ item.name }}</v-card-title>
          <v-card-subtitle>
            <span class="discount-price">${{ item.discountPrice }}</span>
            <span class="original-price" v-if="item.originalPrice">${{ item.originalPrice }}</span>
          </v-card-subtitle>
          <v-card-subtitle class="product-rating" v-if="justForYouItems.includes(item)">

            <span class="stars star-icon" v-html="displayStars(item.ratings)"></span>
            <span class="review-count" v-html="`(${item.ratings.length} )`"></span>
          </v-card-subtitle>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>
<script setup>
import { ref } from 'vue';

const wishlistItems = ref([
  {
    name: 'Gucci duffle bag',
    discountPrice: 960,
    originalPrice: 1180,
    img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
    ratings: [5, 3, 4.8, 2, 1, 1, 1, 0],
  },
  {
    name: 'RGB Liquid CPU Cooler',
    discountPrice: 1960,
    originalPrice: 2500,
    img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
    ratings: [5, 3, 4.8, 2, 1, 1, 1, 0],
  },
  {
    name: 'RGB Liquid CPU Cooler',
    discountPrice: 1960,
    originalPrice: 2500,
    img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
    ratings: [5, 3, 4.8, 2, 1, 1, 1, 0],
  },
  {
    name: 'RGB Liquid CPU Cooler',
    discountPrice: 1960,
    originalPrice: 2500,
    img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
    ratings: [5, 3, 4.8, 2, 1, 1, 1, 0],
  },  

]);


const justForYouItems = ref([
  {
    name: 'ASUS ROG Gaming Laptop',
    discountPrice: 1680,
    originalPrice: 2190,
    img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
    ratings: [5, 4.5, 4.8],
  },
  {
    name: 'IPS LCD Gaming Monitor',
    discountPrice: 1100,
    originalPrice: 1400,
    img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
    ratings: [5, 3, 4.8, 2, 1, 1, 1, 0],
  },
  {
    name: 'ASUS ROG Gaming Laptop',
    discountPrice: 1680,
    originalPrice: 2190,
    img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
    ratings: [5, 4.5, 4.8],
  },
  {
    name: 'ASUS ROG Gaming Laptop',
    discountPrice: 1680,
    originalPrice: 2190,
    img: "https://product.hstatic.net/1000289578/product/may_choi_game_one_xplayer-xgame_1_216e81aab70b4a84907d908622ced9e9_master.jpg",
    ratings: [5, 4.5, 4.8],
  },
]);

function deleteWishlistItem(name) {
  const index = wishlistItems.value.findIndex(item => item.name === name);
  if (index !== -1) {
    wishlistItems.value.splice(index, 1);
  }
}
function calculateAverageRating(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return (sum / ratings.length).toFixed(1);
}

function displayStars(ratings) {
  const averageRating = calculateAverageRating(ratings);
  const roundedRating = Math.round(averageRating);
  return `<span class="star-color">★</span>`.repeat(roundedRating);
}
</script>
<route lang="yaml">
  meta:
    roles: Admin, User
  </route>
<style>
.wishlist-title {
  margin-top: 20px;
}

.product-card {
  margin-bottom: 20px;
}

.product-img {
  height: 200px;
  object-fit: contain;
}

.delete-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 5px;
}

.view-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 5px;
}

.add-to-cart-section {
  background-color: black;
  padding: 0;
  margin-top: 10px;
}

.add-to-cart-btn {
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;

}

.product-name {
  font-size: 17px;
  font-weight: bold;
  margin-top: 10px;
}

.discount-price {
  font-size: 15px;
  color: red;
  font-weight: bold;
  display: inline-block;

}

.original-price {
  font-size: 15px;
  text-decoration: line-through;
  color: #888;
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 6px;
}

.move-all-btn,
.view-all-btn {
  margin-top: 20px;
  margin-bottom: 20px;
}

.just-for-you-title {
  margin-top: 40px;
}

.white-text {
  color: #fff !important;
}

.star-color {
  color: #ffcc00;
}

.star-icon {

  font-size: 20px;
}

.review-count {
  margin-left: 10px;
  font-size: 16px;
}

.product-rating {
  margin-bottom: 15px;
}
</style>
