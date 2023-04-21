import axios from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * This is a TypeScript function that creates an authentication store with a method to add a user
 * profile.
 * @param {any} set - The `set` parameter is a function that is used to update the state of the store.
 * It takes an object as an argument and merges it with the current state of the store. The `set`
 * function is provided by the `create` function of the `zustand` library, which
 */
const authStore = (set: any) => ({
    userProfile: null,
    addUser: (user: any) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null })
})

/* This code creates a persistent store for user authentication using the `zustand` library. The
`create` function creates a new store instance with the provided state and actions. The `persist`
middleware is used to persist the state of the store to local storage. The `authStore` function
defines the initial state and actions for the store, including an `addUser` method to add a user
profile to the store. The resulting `useAuthStore` hook can be used to access the state and actions
of the store in a React component. */
//Hook
const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore