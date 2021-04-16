import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)        // Login butonuna tıkladığımız zaman backend kısmından response alana kadar kısa bir süre geçer. O durumlarda loading veya pending tarzı bir görünüm elde etmek isçin ekledik. Başlangıçta çalışmayacağı için false dedik

const login = async (email, password) => {
    error.value = null
    isPending.value = true          // Response alana kadar loading ibaresi gözükecek

    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        isPending.value = false     // Response alındıktan sonra loading ibaresi kalkacak
        error.value = null
        return res
    }
    catch(err) {
        console.log(err.message)
        error.value = 'Incorrect login credentials'
        isPending.value = false
    }
}

const useLogin = () => {
    return { error, login, isPending }
}

export default useLogin