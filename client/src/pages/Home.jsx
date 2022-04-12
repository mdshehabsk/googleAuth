import React, { useEffect } from 'react'
import axios from 'axios'
const Home = () => {
    const apiCall = async () => {
        const res = await axios.get('http://localhost:4000', {withCredentials: true})
        console.log(res)
    }
useEffect(() => {
    apiCall()
}, [])
  return (
    <div>Home</div>
  )
}

export default Home