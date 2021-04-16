<template>
    <form @submit.prevent="handleSubmit">
        <h1>Sign Up</h1>
        <input type="text" placeholder="Display Name" v-model="displayName">
        <input type="email" placeholder="E-mail" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Sign Up</button>
        <button v-if="isPending" disabled>Loading</button>          
    </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../../composables/useSignup'

export default {
    setup() {
        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const { error, signup, isPending } = useSignup()

        const handleSubmit = async () => {                                                  // signup fonksiyonu await'li yapıda olduğu için async yapılmalıdır
            const res = await signup(email.value, password.value, displayName.value)        // Bu sıralama, signup fonksiyonundaki sıralamayla aynı olmazsa hata verir 

            if (!error.value) {
                console.log("user signed up")
            }
        }

        return { displayName, email, password, error, isPending, handleSubmit }
    }
}
</script>

<style>

</style>