<template>
    <h2>Playlist Details</h2>
    <div v-if="error" class="error">{{ error }}</div>
    
    <div v-if="playlist" class="playlist-details">

        <!-- Playlist Information -->
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverURL">
            </div>
            <h2>{{ playlist.title }}</h2>
            <p>Created by {{ playlist.userName }}</p>
            <p class="description">{{ playlist.description }}</p>
            <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
        </div>

        <!-- Song List -->
        <div class="song-list">
            <div v-if="!playlist.songs.length">There is no song in this playlist</div>
            <AddSong v-if="ownership" :playlist="playlist" />    
            <div v-for="song in playlist.songs" :key="song.id" class="single-song">
                <div class="details">
                    <h3>{{ song.title }}</h3>    
                    <p>{{ song.artist }}</p>
                </div>    
                <button v-if="ownership">Delete</button>
            </div>     
            
            <!-- Kullanıcılar sadece kendi playlistlerine ekleme yapabilecek (Kullanıcılar farklı kişinin playlist detayları kısmında AddSong component'ini göremeyecek -->
            <!-- <AddSong /> componentine playlist verilerinin tutulduğu (document) "playlist" prop'unun yolluyoruz. O component'te "songs" array'i oluşturulmuş olacak (Firebase Firestore'da songs arrayi gçrülebilir) -->
        </div>
    </div>
</template>

<script>
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'             // Kullanıcı bilgilerini almak için import ettik. Kullanıcı kendi playlist'ini silebilecek fakat başkasının oluşturduğu playlist'i silemeyecek
import { computed } from 'vue'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import { useRouter } from 'vue-router'
import AddSong from '@/components/AddSong'

export default {
    props: ['id'],
    components: { AddSong },
    setup(props) {
        const { error, document: playlist } = getDocument('playlists', props.id)        // document: playlist diyerek document yerine playlist adını kullanabiliriz (Zorunlu değildir)
        const { user } = getUser()
        const { deleteDoc } = useDocument('playlists', props.id)
        const { deleteImage } = useStorage()        // Silinen playlist'in fotoğrafını, Firebase Firestore'dan da silebilmek için ekledik
        const router = useRouter()

        // Her seferinde user değişebileceği için computed kullanıyoruz
        // Aşağıdaki 3 koşulu sağladığı takdirde bu fonksiyon true döndürecek yani çalışacak
        const ownership = computed(() => {
            return playlist.value && user.value && user.value.uid == playlist.value.userId
        })

        const handleDelete = async () => {
            await deleteImage(playlist.value.filePath)
            await deleteDoc()
            router.push({ name: 'Home' })
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
    .single-song {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed var(--secondary);
        margin-bottom: 20px;
    }
</style>