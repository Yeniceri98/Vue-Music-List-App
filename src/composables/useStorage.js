import { ref } from 'vue' 
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()          // getUser composable

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`        // Resimleri Firebase'in içindeki bu directory'ye yükleyecek
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = res.ref.getDownloadURL()
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImage }
}

export default useStorage