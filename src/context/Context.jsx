import { createContext, useState } from "react";
import runChat from "../config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {

    // State variables that change after an event
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) =>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord)
        }, 75*index)
    }

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }
    // 1. the following prompt goes to gemini.js and runChat awaits
    // onSent("What is react js") 
    // input is the state variable defined above that changes states onChange event

    const onSent = async(prompt) => {
        // the below events occur one after other
        setResultData("")
        setLoading(true)
        setShowResult(true)
        
        // let response;
        // if (prompt !== undefined){
        //    response = await runChat(prompt);
        //    set recentPrompt(prompt)
        // }
        // else{
        //     setPrevPrompts(prev=>[...prev,input])
        //     setRecentPrompt(input)
        //     response = await runChat(input)
        // }
        
        setRecentPrompt(input)
        setPrevPrompts(prev=>[...prev,input])
        const response = await runChat(input)  
        
        
        // let responseArray = response.split("**");
        // let newResponse = "";
        // for(let i=0; i< responseArray.length; i++)
        // {
        //     if (i == 0 || i%2 !==1){
        //         newResponse += responseArray[i]
        //     }
        //     else{
        //         newResponse += "<b>"+responseArray[i]+"</b>";
        //     }
        // }
        // let newResponse2 = newResponse.split("*").join("</br>")
        // setResultData(newResponse)

        // let newResponseArray = response.split(" ")
        // for(let i = 0; i< newResponseArray.length; i++)
        // {
        //     const nextWord= newResponseArray[i];
        //     delayPara(i,nextWord+" ")
        // }
    
        setResultData(response)
        setLoading(false)
        setInput("")
    }
    


    // We use contextValue to pass above state variables into our components
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;