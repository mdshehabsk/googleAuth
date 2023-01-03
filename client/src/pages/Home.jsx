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
async function logoutFn () {
  try {
    const res = await axios.get('http://localhost:4000/auth/logout',{withCredentials:true})
    console.log(res)
  } catch (error) {
    
  }
}
  return (
    <div>
      <button onClick={logoutFn} >Logout</button>
    </div>
  )
}

export default Home