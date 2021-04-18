<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist Title" v-model="title">
        <textarea required placeholder="Playlist Description" v-model="description"></textarea>
        
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>

        <div class="error"></div>
        <div class="buttonContainer">
            <button v-if="!isPending">Create</button>
            <button v-else disabled>Saving...</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '../../firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)
        const router = useRouter()

        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('playlists')        // Firebase Firestore'un içinde "playlists" adında collection oluşturacak
        const { user } = getUser()                                  // Kullanıcının id ve name'ini alabilmek için kullanılacak

        const handleSubmit = async () => {
            // file.value'nun true olduğu yani sadece png veya jpg dosyası yüklendiğinde çalışacak
            if (file.value) {           
                isPending.value = true
                
                // Upload Image to Firebase
                await uploadImage(file.value)
                console.log("Image uploaded, URL:", url.value)

                // Adding New Collection in Firebase Firestore
                const res = await addDoc({                  // Aşağıda PlaylistDetails sayfasına yönlendirme yapabilmek için useCollection.js'deki "res" alındı çünkü res'in içinde id vardı
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverURL: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                })

                isPending.value = false
                title.value = ''
                description.value = ''

                if (!error.value) {
                    console.log("Playlist added")

                    router.push({ name: 'PlaylistDetails', params: { id: res.id }})      // id, useCollection'daki "res" den alındı
                }
            }
        }

        // Allowed File Types
        // Seçilen dosya png veya jpeg değilse dosyayı kabul etmemesini sağlayacağız. Bunu alttaki if-else kısmında selectedFİle'ın property'lerinden biri olan "type" a bakarak yapıyoruz
        const types = ['image/png', 'image/jpeg']       
        
        const handleChange = (e) => {
            const selectedFile = e.target.files[0]      // e.target.files'a inspectten bakıldığı zaman FileList objesi görülür ve onun altında 0 vardır. Direkt o kısma erişmek için [0] yazdık
            console.log(selectedFile)                   // Inspect kısmından baktığımız zaman lastModified, name, size, type gibi propety'lerinin olduğunu görürüz 

            // Seçilen dosyanın olup olmadığını kontrol etmek için oluşturuldu. Çünkü dosya seç dedikten sonra iptal desek bile undefined adında dosya seçmişiz gibi gösterir
            // Seçilmiş bir dosya varsa ve dosyanın türü png ya da jpeg ise if bloğu çalışacak
            if (selectedFile && types.includes(selectedFile.type)) {
                file.value = selectedFile
                fileError.value = null
            } else {
                file.value = null
                fileError.value = "Please select an image file (png or jpg)"
            }
        }

        return { title, description, handleSubmit, handleChange, fileError, isPending }
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