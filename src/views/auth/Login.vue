<template>
    <form @submit.prevent="handleSubmit">
        <h1>Login</h1>
        <input type="email" placeholder="E-mail" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Login</button>
        <button v-if="isPending" disabled>Loading</button>          <!-- isPending'i tüm composable'larda aynı şekilde kullandık -->
    </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../../composables/useLogin'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        
        const { error, login, isPending } = useLogin()

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)      // useLogin composable'ının içindeki login'de email ve password tanımlanmıştı
            
            if (!error.value) {
                console.log("user logged in")
                router.push({ name: 'Home' })
            }
        }

        return { email, password, error, handleSubmit, isPending }
    }
}
</script>

<style>

</style>