<template>
    <div class="user-playlist">
        <h3>My Playlists</h3>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'

export default {    
    setup() {
        const { user } = getUser()

        const { documents: playlists } = getCollection(
            'playlists',
            ['userId', '==', user.value.uid]        // https://firebase.google.com/docs/firestore/query-data/queries  --->  Simple queries kısmında örneği var
        )

        console.log(playlists)

        return { playlists }
    }
}
</script>

<style>

</style>