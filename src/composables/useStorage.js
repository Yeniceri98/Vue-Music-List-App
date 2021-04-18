import { ref } from 'vue' 
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()          // getUser composable

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`        // Resimleri Firebase'in içindeki bu directory'ye yükleyecek. NOT: uid, user'ın property'lerinden biridir ve kullanıcının id'sini belirtir. Bu id'ye göre ekleme oluyor
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    const deleteImage = async (path) => {
        const storageRef = projectStorage.ref(path)

        try {
            await storageRef.delete()
        } catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImage, deleteImage }
}

export default useStorage