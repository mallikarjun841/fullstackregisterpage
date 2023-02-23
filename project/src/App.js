import {connect, useFormik} from 'formik'
import * as Yup from 'yup'
import './App.css';
import { useEffect} from 'react';

function App() {
  

  const initialValues={
    name:"",
    email:"",
    password:"",
  }
                
  const {values,errors,touched,handleSubmit,handleChange,handleBlur}=useFormik({
  initialValues,
  validationSchema:Yup.object({
    name:Yup.string().min(2).max(25).required(),
    email:Yup.string().email().required(),
    password:Yup.string().required().min(5)
  }),

  onSubmit:async(values,action)=>{
    console.log(values)
    const {name,password,email}=values
     const url='http://localhost:5001/userregister/'
     const userdatas={username:name,email,password}
     console.log(userdatas)
     const option={
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(userdatas)
     }
     console.log(option)

     const fetchdata=await fetch(url,option);
     console.log(fetchdata)
    

    console.log("done") 
    action.resetForm()
  }
  })


   const getdata=async()=>{
    console.log("wow")
  
   const make =await fetch("http://localhost:5001/userdetails/")
   const makeresponse=await make.json()
   console.log(makeresponse)
  
   
  }

  useEffect(()=>{ 
    getdata();
  })

  const {name,email,password}=values
  return (
    <div className="App">
      <form className='form' onSubmit={handleSubmit}>
        <input value={name} onChange={handleChange} onBlur={handleBlur} type="text" name="name"/>
        {errors.name && touched.name && <p>{errors.name}</p>}
        <input value={email} onChange={handleChange} onBlur={handleBlur} type="text" name="email"/>
        {errors.email && touched.email && <p>{errors.email}</p>}
        <input value={password}  onChange={handleChange} onBlur={handleBlur} type="password" name="password"/>
        <p>{errors.password && touched.password && errors.password}</p>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
