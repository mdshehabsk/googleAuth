import React ,{useEffect}from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Nice = () => {
  let navigate = useNavigate()
    const apiCall = async () => {
        const res = await axios.get('http://localhost:4000/auth/nice', {withCredentials: true})
        if(res.status===202){
            navigate('/login')
        }
        console.log(res)
    }
    useEffect(() => {
        apiCall()
    }, [])
  return (
    <>
      <h1  style={{textAlign:'center'}} >Nice Route</h1>
    </>
  )
}

export default Nice