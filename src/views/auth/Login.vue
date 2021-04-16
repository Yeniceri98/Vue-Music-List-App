<template>
    <form @submit.prevent="handleSubmit">
        <h1>Login</h1>
        <input type="email" placeholder="E-mail" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button>Login</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../../composables/useLogin'

export default {
    setup() {
        const email = ref('')
        const password = ref('')

        const { error, login } = useLogin()

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)      // useLogin composable'ında email ve password tanımlanmıştı
            
            if (!error.value) {
                console.log("user logged in")
            }
        }

        return { email, password, error, handleSubmit }
    }
}
</script>

<style>

</style>