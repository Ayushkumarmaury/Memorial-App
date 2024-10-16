import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';

const Card = () => {

 

const [data, setData] = useState([]);
// console.log(data);

const getUserData = async()=>{
  const res = await axios.get("http://localhost:8005/getdata", {
    headers:{
      "Content-Type":"application/json"
    }
  });


  if(res.data.status === 401 || !res.data){
    console.log("error")
  }else{
    
    setData(res.data.getUser)
    
  }
}


const deleteUser = async(id)=>{

  const res = await axios.delete(`http://localhost:8005/${id}`, {
    headers:{
      "Content-Type":"application/json"
    }
  });


  if(res.data.status === 401 || !res.data){
    console.log("error")
  }else{
    console.log("user deleted");
    
  }

}


//update user data

const data1 = async()=>{

  const {id}  = useParams();
  const res = await axios.get(`http://localhost:8005/update/${id}`);
  if(res.data.status === 401 || !res.data){
    console.log("error")
  }else{
    console.log("user get data");
    
  }

  console.log(id);
}










const updateUser = async(id)=>{

  const res = await axios.put(`http://localhost:8005/update/${id}`, {
    headers:{
      "Content-Type":"application/json"
    }
  });


  if(res.data.status === 401 || !res.data){
    console.log("error")
  }else{
    console.log("user deleted");
    
  }

}



useEffect(() => {
  getUserData();
}, [deleteUser])


const [open1, setOpen1] = useState("close1");

const openFunction1 = () => {
    setOpen1((curr1) => (curr1 == "open1" ? "close1" : "open1"));
  };

  const [open2, setOpen2] = useState("close2");

const openFunction2 = () => {
    setOpen2((curr2) => (curr2 == "open2" ? "close2" : "open2"));
  };





  return (
    <div className='grid h-[100%]   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-20 place-items-center' >

      {
        data.length > 0 ? data.map((element, i)=>{
          return(
            <>
            
            <div className=' p-3   tracking-widest flex-row justify-center items-center'>
              <div className='bg-green-200 p-1 hover:brightness-75 hover:scale-95 border-green-300 flex-row justify-center items-center rounded-lg border-4 ' onClick={()=> openFunction1()} >
                <img src={`/server/uploads/${element.imgpath}`} className=' flex rounded-lg' alt="Image" />
              <h2 className='justify-center  items-center text-center text-xl font-bold py-1 px-1 text-pretty'>{element.fname}</h2>
              </div>
              </div>



              {/* update and delete card */}

              <div
              className="bg-green-400 flex flex-col p-10 w-[30%] gap-y-5 justify-center fixed top-60 left-50 z-20 items-center"
              id={open1}
            >

              <div className='flex flex-col gap-y-5'>
                <button className="bg-red-500 text-[50%] sm:text-lg text-center  rounded-lg p-1 hover:bg-red-600" type="submit" onClick={()=> {openFunction2(),
                   ()=>data1(element._id)
                }} >
                  Update
                </button>
                <button className="bg-red-500 text-[50%] sm:text-lg  rounded-lg  p-1 text-center hover:bg-red-600" type="submit" onClick={()=>deleteUser(element._id)} >
                  Delete
                </button>
                </div>


                <button className="p-1 absolute right-3 top-2 text-center max-w-14 hover:scale-105" onClick={()=> openFunction1()} >
                  ❌
                </button>
             
            </div>



            {/* update form */}


            {/* <div
              className="bg-lime-400  flex justify-center fixed top-60 left-50 z-20 items-center"
              id={open2}
            >
              <form
                action="#"
                className="flex flex-col p-5 gap-y-4 font-bold text-lg relative"
              >
                <h1 className='flex justify-center items-center'>Update Post</h1>
                <label htmlFor="text">Write Something nice!!</label>
                <input type="text" className=" px-2 text-justify" value={data.fname} id="text"   />
                <label htmlFor="text">Upload your Picture</label>
                <input type="file" name="photo" id="file"  value={data.imgpath}  />
                <button className="bg-red-500 p-1 text-center hover:bg-red-600" type="submit" >
                  Save
                </button>
                <button className="p-1 absolute right-3 top-2 text-center max-w-14 hover:scale-105" onClick={()=> openFunction2()}>
                  ❌
                </button>
              </form>
            </div> */}


















            
            </>
          )
        }):""
      }


{/* 
      // <div className=' p-3   tracking-widest flex-row justify-center items-center'>
      //   <div className='bg-green-200 p-1 hover:brightness-75 hover:scale-95 border-green-300 flex-row justify-center items-center rounded-lg border-4 '>
      //     <img src="./images/img1.jpg" className=' flex rounded-lg' alt="" />
      //   <h2 className='justify-center  items-center text-center text-xl font-bold py-1 px-1 text-pretty'>Nice weather to enjoy out side.😀😀</h2>
      //   </div>
      // </div> */}

    
            {/* <div
              className="bg-green-400 flex flex-col p-10 w-[30%] gap-y-5 justify-center fixed top-60 left-50 z-20 items-center"
              id={open1}
            >

              <div className='flex flex-col gap-y-5'>
                <button className="bg-red-500 text-[50%] sm:text-lg text-center  rounded-lg p-1 hover:bg-red-600" type="submit" onClick={()=> openFunction2()} >
                  Update
                </button>
                <button className="bg-red-500 text-[50%] sm:text-lg  rounded-lg  p-1 text-center hover:bg-red-600" type="submit" onClick={()=>deleteUser(element._id)} >
                  Delete
                </button>
                </div>


                <button className="p-1 absolute right-3 top-2 text-center max-w-14 hover:scale-105" onClick={()=> openFunction1()} >
                  ❌
                </button>
             
            </div> */}



              {/* update form */}

            <div
              className="bg-lime-400  flex justify-center fixed top-60 left-50 z-20 items-center"
              id={open2}
            >
              <form
                action="#"
                className="flex flex-col p-5 gap-y-4 font-bold text-lg relative"
              >
                <h1 className='flex justify-center items-center'>Update Post</h1>
                <label htmlFor="text">Write Something nice!!</label>
                <input type="text" className=" px-2 text-justify" name="fname" id="text"   />
                <label htmlFor="text">Upload your Picture</label>
                <input type="file" name="photo" id="file"  />
                <button className="bg-red-500 p-1 text-center hover:bg-red-600" type="submit" >
                  Save
                </button>
                <button className="p-1 absolute right-3 top-2 text-center max-w-14 hover:scale-105" onClick={()=> openFunction2()}>
                  ❌
                </button>
              </form>
            </div>






      
      
    </div>
  )
}

export default Card
