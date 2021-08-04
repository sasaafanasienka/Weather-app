import { useCallback } from "react"
import auth from "../store/AuthStore"

export const useHttp = () => {

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
 
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-type'] = 'application/json'
            }
            
            const response = await fetch(url, { method, body, headers })
            
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            return data
        } catch (e) {
            throw e
        }
    }, [])
   
    const get = useCallback( async (url) => {

        try {
           
            const response = await fetch(url, { 
                method: 'GET', 
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                } 
            })
            
            const data = await response.json()
            console.log(data)

            if (!response.ok) {
                throw Error(data.message || 'Что-то пошло не так')
            }

            return data
        } catch (e) {
            console.log(e.message)
        }
    }, [])

    return { get, request }
}