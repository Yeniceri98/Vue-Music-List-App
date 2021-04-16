<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/logo.jpg" alt="logo">        <!-- @/ yaparsak direkt src klasörüne gider. Bu şekilde de kullanımı vardır-->
            <h1><router-link :to="{ name: 'Home' }">Music List</router-link></h1>
            <div class="links">
                <button>Logout</button>
                <router-link class="btn" :to="{ name: 'Signup' }">Sign up</router-link>
                <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {

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
</style>