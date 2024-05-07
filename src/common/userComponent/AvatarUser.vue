<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    :color="isDefaultOnline ? 'success' : 'secondary'"
    class="cursor-pointer"
    @click="redirect"
  >
    <VAvatar
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar" />
    </VAvatar>
  </VBadge>
</template>

<script setup>
import { useRouter } from "vue-router"

const props = defineProps({
  avatar: {
    type: String,
    required: true,
  },
  isDefaultOnline: {
    type: Boolean,
    required: false,
  },
  isLink: {
    type: Boolean,
    required: false,
  },
})

const router = useRouter()

const redirect = async () => {
  if (props.isLink) {
    await router.replace("/")
  }
}
</script>
