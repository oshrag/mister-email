// import imgUrl from '../assets/imgs/react.png'
import { useEffect } from "react"


export function Home() {


    useEffect(() => {
        document.title = 'MeMail'
    }, [])
    
    return (
        <section className="home">
            <h1>Welcome to our React App</h1>
            {/* <img src={imgUrl} alt="" /> */}
        </section>
    )
}
