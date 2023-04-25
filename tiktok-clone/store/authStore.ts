import { BASE_URL } from '@/utils'
import axios from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * This is a TypeScript function that creates an authentication store with methods to add, remove, and
 * fetch users.
 * @param {any} set - The `set` parameter is a function that is used to update the state of the store.
 * It takes an object as an argument, which contains the new values for the state properties that need
 * to be updated. When `set` is called, it merges the new values with the existing state and triggers
 */
const authStore = (set: any) => ({
    userProfile: null,
    allUsers: [],
    addUser: (user: any) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),
    fetchAllUsers: async () => {
        const { data } = await axios.get(`${BASE_URL}/api/users`)
        set({ allUsers: data })
    }
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