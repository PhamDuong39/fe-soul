<script setup>
const props = defineProps({
  iconBtn: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(["confirm"])

const confirm = () => {
  emit("confirm", true)
}
</script>

<template>
  <IconBtn>
    <VMenu
      location="bottom"
      activator="parent"
    >
      <VCard max-width="300">
        <VCardText style="padding-bottom: 0">
          <p>{{ props.text }}</p>
        </VCardText>
        <VCardActions>
          <IconBtn icon="tabler-x" />
          <IconBtn
            icon="tabler-checks"
            @click="confirm"
          />
        </VCardActions>
      </VCard>
    </VMenu>
    <VIcon :icon="props.iconBtn" />
  </IconBtn>
</template>
