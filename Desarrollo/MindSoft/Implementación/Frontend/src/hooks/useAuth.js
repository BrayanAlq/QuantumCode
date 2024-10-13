import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { login, verifyTokenOnServer } from '../services/auth'

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)

  const loginUser = async (username, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await login(username, password)

      if (response.error) {
        throw new Error(response.error)
      }

      setToken(response.jwt)

      await SecureStore.setItemAsync('authToken', response.jwt)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loginUser,
    loading,
    error,
    token
  }
}

export const useVerifyToken = () => {
  const [loading, setLoading] = useState(false)
  const [isOk, setIsOk] = useState(false)

  const verifyToken = async (token) => {
    setLoading(true)
    setIsOk(false)

    try {
      const response = await verifyTokenOnServer(token)

      if (response.error) {
        throw new Error(response.error)
      }

      setIsOk(true)
    } catch (error) {
      setIsOk(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    verifyToken,
    loading,
    isOk
  }
}