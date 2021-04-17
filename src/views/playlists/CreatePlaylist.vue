<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist Title" v-model="title">
        <textarea required placeholder="Playlist Description" v-model="description"></textarea>
        
        <label>Upload playlist cover image</label>
        <input type="file">

        <div class="error"></div>
        <div class="buttonContainer">
            <button>Create</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const title = ref('')
        const description = ref('')

        const handleSubmit = () => {
            console.log(title.value, description.value)
        }

        return { title, description, handleSubmit }
    }
}
</script>

<style scoped>
    input[type='file'] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 14px;
        display: block;
        margin-top: 30px;
    }
    .buttonContainer {
        text-align: center;         /*  display: flex; dedikten sonra align-items: center; şeklinde de butonu ortalayabiliriz  */
    }
    button {
        margin-top: 10px;
    }
</style>