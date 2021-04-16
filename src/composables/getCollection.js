import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'


const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)         // 2 farklı collection'da farklı errorlar olabileceği için bunu global olarak tanımlamadık. Mesela useSignup.js'de errorlar ortak olarak görüntüleneceği için global şekilde tanımladık

    // Register the firestore collection reference
    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')

    // Real time (Snapshot)
    const unsub = collectionRef.onSnapshot(snap => {
        let results = []

        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        });
        
        // Update values
        documents.value = results
        error.value = null
    }, err => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch the data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    });

    return { error, documents }
}

export default getCollection