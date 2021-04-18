<template>
    <h2>Playlist Details</h2>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Playlist Information -->
    <div v-if="playlist" class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverURL">
            </div>
            <h2>{{ playlist.title }}</h2>
            <p>Created by {{ playlist.userName }}</p>
            <p class="description">{{ playlist.description }}</p>
            <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
        </div>
    </div>

    <!-- Song List -->
    <div class="song-list">
        <p>Song list</p>
    </div>
</template>

<script>
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'             // Kullanıcı bilgilerini almak için import ettik. Kullanıcı kendi playlist'ini silebilecek fakat başkasının oluşturduğu playlist'i silemeyecek
import { computed } from 'vue'
import useDocument from '@/composables/useDocument'

export default {
    props: ['id'],
    setup(props) {
        const { error, document: playlist } = getDocument('playlists', props.id)        // document: playlist diyerek document yerine playlist adını kullanabiliriz (Zorunlu değildir)
        const { user } = getUser()
        const { deleteDoc } = useDocument('playlists', props.id)

        // Her seferinde user değişebileceği için computed kullanıyoruz
        // Aşağıdaki 3 koşulu sağladığı takdirde bu fonksiyon true döndürecek yani çalışacak
        const ownership = computed(() => {
            return playlist.value && user.value && user.value.uid == playlist.value.userId
        })

        const handleDelete = async () => {
            await deleteDoc()
        }

        return { error, playlist, ownership, handleDelete }
    }
}
</script>

<style>
    h2 {
        margin: 5px;
    }
    .playlist-details {
        display: grid;
        grid-template-columns: 1fr 2fr;         /*  Sola (Playlist Information) 1, sağa (Song List) 2 yer ayıracak  */
        gap: 80px;
    }
    .cover {
        overflow: hidden;
        border-radius: 20px;
        position: relative;
        padding: 160px;
        margin-top: 10px;
    }
    .cover img {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
    }
    .playlist-info {
        text-align: center;
    }
    .playlist-info h2 {
        text-transform: capitalize;
        font-size: 28px;
        margin-top: 20px;
    }
    .playlist-info p {
        margin-bottom: 20px;
    }
    .username {
        color: #999;
    }
    .description {
        text-align: left;
    }
</style>