import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    // Delete Document
    const deleteDoc = async () => {
        error.value = null
        isPending.value = true

        try {
            const res = await docRef.delete()
            isPending.value = false
            return res   
        } catch(err) {
            console.log(err.message)
            error.value = "Couldn't delete the document"
            isPending.value = false
        }
    }

    // Update Document
    const updateDoc = async (updates) => {
        error.value = null
        isPending.value = true

        try {
            const res = await docRef.update(updates)
            isPending.value = false
            return res   
        } catch(err) {
            console.log(err.message)
            error.value = "Couldn't update the document"
            isPending.value = false
        }
    }

    return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument


// Döküman üzerinde silme ve editleme işlemini yapmak için oluşturduk. useCollection'ın içerisinde döküman ekliyorduk. Silme ve editleme işlemini ayrı bir dosyada yapacağız