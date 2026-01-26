import { useEffect, useState } from "react"

export default function GreetingTestPage(){
    const [showDog, setShowDog] = useState(false)

    useEffect(() => {
        const dogy = setTimeout(() => {
            setShowDog(true)
            
        }, 1000);

        return () => clearTimeout(dogy)
    }, [])
    return(
        <div className="bg-gray-200 h-screen w-full flex flex-col justify-center items-center">
            <img 
                src="https://pbs.twimg.com/media/FA_hqFTUUAI2ggj.jpg" 
                className="object-cover h-full" alt="" 
            />
            {
                showDog && (
                    <>
                        <img
             className="absolute w-30 h-30 object-cover bottom-0 shadow-xl rounded-full"
             src="https://media.tenor.com/2mfG8pdR5UgAAAAM/dog-laughing-funny-dog.gif" alt="" />
                    </>
                )
            }
        </div>
    )
}
