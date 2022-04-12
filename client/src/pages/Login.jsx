import React from 'react'

const Login = () => {
    const login = async ()=>{
        window.open('http://localhost:4000/auth/google','_self')
    }   
    
  return (
    <>
    <h1 style={{textAlign:'center'}} >Login with google</h1>
    <button onClick={login} >GOOGLE LOGIN</button>
    </>
  )
}

export default Login