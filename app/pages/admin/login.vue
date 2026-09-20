<script setup>
const password = ref('')
const error = ref('')

async function login() {
  error.value = ''

  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { password: password.value }
    })
    await navigateTo('/admin/products')
  } catch {
    error.value = 'Неверный пароль'
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <input v-model="password" type="password" placeholder="Пароль">
    <button>Войти</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>