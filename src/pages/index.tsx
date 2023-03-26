import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';


const inter = Inter({ subsets: ['latin'] })




export default function Home() {
  
 

  const [inputValue, setInputValue] = useState("");

  const [loadingState, setLoadingState] = useState(false);

  const [generated, setGenerated] = useState("");

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const generateBio = async (e: any) => {
    e.preventDefault();
   // setGeneratedBios("");
  ////  setLoading(true);

  var text = inputValue.toString();

  setLoadingState(true)



  var prompt = "Look at this social media post -  "+text+" Generate a suitable social media comment for it. It should not be more than 180 characters. Add one appropriate hashtag"
  
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
  
    if (!response.ok) {
      setLoadingState(false)
      throw new Error(response.statusText);
      
    }
  
    let answer = await response.json();
    //setGeneratedBios(answer.choices[0].text);
   // setLoading(false);

   setLoadingState(false)
  
   console.log(answer.choices[0].text)

  
   setGenerated(answer.choices[0].text)
  };

  //set copy to clipboard




  
  return (
    <>
      <Head>
        <title>EngageSoshi</title>
        <meta name="description" content="Meet Soshi, an AI that generates comments from social media posts. Powered by GPT. Built by Ebube Maduike" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" w-screen bg-white ">
        <div className="gradient h-full w-full py-10 sm:py-10">

        <div className="grid lg:grid-cols-2 lg:gap-4 w-full  lg:py-3 lg:px-20 px-5 sm:px-5 grid-cols-1 sm:grid-cols-1">
  
            <div className="w-full  py-3 lg:px-10 lg:border-r-2 lg:border-white mt-5  sm:mt-5">
              <p className="text-4xl text-yellow-300 flex font-bold">EngageSoshi        <img src={'/images/3B9EA239-0E28-49EB-8A31-0C88A2EAA71A_4_5005_c-removebg-preview.png '} alt={''} width={40}  height={40}    />           
</p>
              <p className=" text-white mt-4">Meet Soshi, An AI that generates thoughtful comments for social media posts with AI</p>
              <p className=" text-white mt-4">Copy a text from a social media post, paste it in the text box below and we will generate a perfect comment for it</p>
              
              <textarea onChange={handleInputChange}  className="border-2 border-white bg-0 rounded-lg mt-5 w-full h-64 p-3 text-sm">

              </textarea>

              <input  type="submit" onClick={generateBio} value="Generate" className="p-3 bg-yellow-600 rounded-lg mt-3 border-2 border-yellow-600 cursor-pointer hover:border-2 hover:border-yellow-600 hover:bg-yellow-800" />
              </div>

             {//right part - grid

             
             }

           
              <div className="w-full h-full lg:pl-32  grid place-content-center mt-10 px-10 sm:px-10 ">
              <p className="lg:hidden block sm:block text-center">Your comment will display here. Copy it</p>
               
            { loadingState==true? (   <div className="w-96 h-40 p-4  bg-gray-500 rounded-lg opacity-20 mt-40 grid place-content-center" id="loading-holder">
             { /* <div className="" id="bar-holder">
                <div className="w-full h-2 bg-gray-700 m-2 flashing"></div>
                <div className="w-64 h-2 bg-gray-700 m-2 flashing"></div>
                <div className="w-32 h-2 bg-gray-700 m-2 flashing"></div>
                <div className="w-64 h-2 bg-gray-700 m-2 flashing"></div>
                <div className="w-full h-2 bg-gray-700 m-2 flashing"></div>
                <div className="w-64 h-2 bg-gray-700 m-2 flashing"></div>
                <div className="w-32 h-2 bg-gray-700 m-2 flashing"></div>
                <div className="w-64 h-2 bg-gray-700 m-2 flashing"></div>

  </div>*/}

               <div className="loader" id="loader"></div>

           
               </div>):<div className="p-4 border-2 border-stone-500 w-96 text-white rounded-lg text-sm"> <Typewriter
  
  onInit={(typewriter)=> {

  typewriter
   
  .typeString(generated)
  .start();
  
  }}
  /></div>}

  {//copy to clipboard
}

<CopyToClipboard text={generated}
          onCopy={() => alert("The comment has been copied! Go ahead and paste under that social media post!")}>
          <button className="p-3 bg-black rounded-lg mt-3 border-2 border-yellow-600 cursor-pointer hover:border-2 hover:border-yellow-600 hover:bg-yellow-800">Copy comment</button>
        </CopyToClipboard>
            

                
            



            </div>
       
       
        </div>

        </div>
       
      </main>
    </>
  )
}
