<template>
    <div class="add-song">
        <button v-if="!showForm" @click="showForm = true">Add Song</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h3>Add a New Song</h3>
            <input type="text" required placeholder="Song title" v-model="title">
            <input type="text" required placeholder="Artist" v-model="artist">
            <div class="button-container">
                <button>Add</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'         // Update işlemi için ekledik

export default {
    props: ['playlist'],
    setup(props) {
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)
        const { updateDoc } = useDocument('playlists', props.playlist.id)

        const handleSubmit = async () => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 1000000)
            }

            console.log(newSong)

            await updateDoc({
                songs: [...props.playlist.songs, newSong]
            })

            title.value = ''
            artist.value = ''
        }

        return { title, artist, showForm, handleSubmit }
    }
}
</script>

<style scoped>
    .add-song {
        text-align: center;
        margin-top: 40px;
    }
    form {
        max-width: 100%;
        text-align: left;
    }
    .button-container {
        text-align: center;
    }
    button {
        font-size: 18px;
    }
</style>