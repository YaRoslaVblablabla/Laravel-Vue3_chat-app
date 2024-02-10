<template>
    <RouterView></RouterView>
</template>
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

let router = useRouter()

onMounted(
    router.push('/registration')
)

</script>