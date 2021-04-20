<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/logo.jpg" alt="logo">        <!-- @/ yaparsak direkt src klasörüne gider. Bu şekilde de kullanımı vardır-->
            <h1><router-link :to="{ name: 'Home' }">Music List</router-link></h1>
            <div class="links">
                <div v-if="user">
                    <router-link :to="{ name: 'CreatePlayList' }">Create Playlist</router-link>
                    <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
                    <span>Welcome {{ user.displayName }}</span>
                    <button @click="handleLogout">Logout</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{ name: 'Signup' }">Sign up</router-link>
                    <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router';

export default {
    setup() {
        const { logout } = useLogout()
        const { user } = getUser()
        const router = useRouter()

        const handleLogout = async () => {
            await logout()
            console.log("User logged out")
            router.push({ name: 'Login' })
        }

        const handleSignup = async () => {
            router.push({ name: 'Login' })
        }

        return { logout, handleLogout, user, handleSignup }
    }
}
</script>

<style scoped>
    .navbar {
        padding: 16px 10px;
        margin-bottom: 60px;
        background: white;
    }
    nav {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    nav h1 {
        margin-left: 20px;
    }
    nav .links {
        margin-left: auto;
    }
    nav .links a, button {
        margin-left: 16px;
        font-size: 14px;
    }
    nav img {
        max-height: 70px;
        border-radius: 20px;
    }
    span {
        font-size: 14px;
        display: inline-block;
        margin-left: 16px;
        padding-left: 16px;
        border-left: 1px solid white;
    }
</style>