<template>
    <div class="home">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="documents">
            <!-- <div v-for="doc in documents" :key="doc.id">{{ doc.title }}</div> -->

            <ListView :playlists="documents" />
        </div>

        <ListView />
    </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '../components/ListView'

export default {
    name: 'Home',
    components: { ListView },
    setup() {
        const { error, documents } = getCollection('playlists')

        return { error, documents }
    }
}
</script>
