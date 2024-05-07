<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const state = route.query.state
const code = route.query.code

localStorage.setItem("provider", state)
localStorage.setItem("code", code)

window.close()
</script>

<route lang="yaml">
  meta:
    layout: blank
    redirectIfLoggedIn: true
</route>