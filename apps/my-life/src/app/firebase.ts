// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBMCeUmdJKHIkdg1eHsW6KSZULLPS61Y64',
  authDomain: 'mylife-2d000.firebaseapp.com',
  projectId: 'mylife-2d000',
  storageBucket: 'mylife-2d000.appspot.com',
  messagingSenderId: '565706500657',
  appId: '1:565706500657:web:e8e8cf3e917bcecd1dc310',
  measurementId: 'G-YJDCWWKCTC',
}

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const firestore = getFirestore(app)
export const auth = getAuth(app)
