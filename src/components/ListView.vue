<template>
    <div v-for="playlist in playlists" :key="playlist.id">
        <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id }}">
            <div class="single">
                <div class="thumbnail">
                    <img :src="playlist.coverURL">
                </div>
                <div class="info">
                    <h3>{{ playlist.title }}</h3>
                    <p>Created by {{ playlist.userName }}</p>
                </div>
                <div class="song-number">
                    <p>This playlist has {{ playlist.songs.length }} music</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['playlists']        // Home.vue'dan playlists adında props aldık
}
</script>

<style>
    .single {
        display: flex;
        align-items: center;
        padding: 20px;
        margin: 18px 0;
        border-radius: 10px;
        background: rgb(178, 201, 245);
        transition: all ease 0.2s;
    }
    .single:hover {
        box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
        transform: scale(1.02);         /*  Resmi ön plana çıkartıyormuş gibi gözüken güzel bir efekt verir  */
        transition: all ease 0.2s
    }
    .thumbnail {
        max-width: 100px;
        max-height: 100px;
        overflow: hidden;
        border-radius: 10px;
    }
    img {
        max-width: 100%;
        max-height: 100%;
        display: block;
    }
    .info {
        margin: 0 30px;
    }
    .song-number {
        margin-left: auto;
    }
</style>

