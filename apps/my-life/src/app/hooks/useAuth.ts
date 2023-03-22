import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from '../firebase'

export function useAuth() {
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const signedIn = user !== null

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setLoaded(true)
      setUser(user)
    })
  }, [])

  async function signIn(mail: string, pass: string) {
    try {
      await signInWithEmailAndPassword(auth, mail, pass)
    } catch (error) {
      console.error(error)
    }
  }
  async function signUp(name: string, mail: string, pass: string) {
    try {
      await createUserWithEmailAndPassword(auth, mail, pass)
    } catch (error) {
      console.error(error)
    }
  }
  async function signOut() {
    try {
      await auth.signOut()
      setUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  return { user, loaded, signedIn, signIn, signUp, signOut }
}
