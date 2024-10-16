import React, { createContext, useEffect, useState } from "react";
import Card from "./components/Card.jsx";
import { document } from "postcss";
import axios from "axios";
// import { useNavigate } from "react-router-dom";


export const ThemeContext = createContext(null);
export const openClose = createContext(null);

const App = () => {
  const [theme, setTheme] = useState("light-theme");
  const [img, setImg] = useState("./images/dark.png");
  const toggleTheme = () => {
    setTheme((curr) => (curr == "light-theme" ? "dark-theme" : "light-theme"));
    setImg((curr) =>
      curr == "./images/dark.png" ? "./images/light.png" : "./images/dark.png"
    );
  };

  const [open, setOpen] = useState("close");

  const openFunction = () => {
    setOpen((curr) => (curr == "open" ? "close" : "open"));
  };

  const [fname, setFName] = useState("");
  
  
  const [file, setFile] = useState("");

  // const history = useNavigate();

  const setdata = (e)=>{
        const {value} = e.target;

        setFName(value);
        
  }

  const setimgfile = (e)=>{
    setFile(e.target.files[0]);
    
}

//add user data
const addUserData = async (e) => {
  e.preventDefault();

  var formData = new FormData();
  formData.append("photo", file);
  formData.append("fname", fname);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }

  const res = await axios.post("http://localhost:8005/register", formData, config);
  
  if(res.data.status === 401 || !res.data){
    console.log("error")
  }else{
    // history("/")
    window.location.href = "http://localhost:5173"
  }

   
}



  
  return (
    <>
      <ThemeContext.Provider
        value={{ value: {theme, toggleTheme}, value2: {open, openFunction} }}
      >
        <div className="h-[100%]" id={theme}>
          <a href="#" onClick={()=> openFunction()}>
            <div className="fixed w-[55px] h-[55px] top-28 left-5 right-0 z-10">
              <img
                src="./images/plus.png"
                className="w-[55px] h-[55px] left-0"
                alt="plus"
              />
            </div>
          </a>
          <div className="flex justify-around  gap-y-5  py-10">
            <h1 className="text-4xl text-red-500 tracking-widest hover:text-green-600 hover:scale-105 font-bold ">
              Your Memories
            </h1>
            <div>
              <a href="#" onClick={() => toggleTheme()}>
                <img
                  src={img}
                  id="img"
                  className="w-[55px] h-[55px]"
                  alt="darkmode"
                />
              </a>
            </div>

            <div
              className="bg-lime-400  flex justify-center fixed top-60 left-50 z-20 items-center"
              id={open}
            >
              <form
                action="#"
                className="flex flex-col p-5 gap-y-4 font-bold text-lg relative"
              >
                <label htmlFor="text">Write Something nice!!</label>
                <input type="text" className=" px-2 text-justify" name="fname" id="text"  onChange={setdata} />
                <label htmlFor="text">Upload your Picture</label>
                <input type="file" name="photo" id="file" onChange={setimgfile} />
                <button className="bg-red-500 p-1 text-center hover:bg-red-600" type="submit" onClick={addUserData}>
                  Save
                </button>
                <button className="p-1 absolute right-3 top-2 text-center max-w-14 hover:scale-105" onClick={()=> openFunction()}>
                  ❌
                </button>
              </form>
            </div>
          </div>
          <Card />
        </div>
      </ThemeContext.Provider>

     
    </>
  );
};

export default App;
