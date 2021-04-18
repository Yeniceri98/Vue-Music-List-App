import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'


const getDocument = (collection, id) => {
    const document = ref(null)
    const error = ref(null)         

    let documentRef = projectFirestore.collection(collection).doc(id)       // Single document

    const unsub = documentRef.onSnapshot(doc => {
        if (doc.data()) {
            document.value = { ...doc.data(), id: doc.id }
            error.value = null
        } else {
            error.value = "This document is not exist"
        }
    }, err => {
        console.log(err.message)
        error.value = 'Could not fetch the data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    });

    return { error, document }
}

export default getDocument