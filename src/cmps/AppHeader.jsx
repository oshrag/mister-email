import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"


export function AppHeader() {

    const navigate = useNavigate()
    const [isNavOpen, setIsNavOpen] = useState(null)


    useEffect(() => {
        // On click outside of the modal~
        document.addEventListener('click', onCloseModals)
        return () => {
            document.removeEventListener('click', onCloseModals)
        }
    }, [])

    function toggleNavPreview(ev) {
        ev.stopPropagation()
        setIsNavOpen(prev => !prev)
    }

    function onCloseModals() {
        setIsNavOpen(false)
    }



    const visibleClass = isNavOpen ? '' : 'hidden'
    return (
        <header className="app-header">
             <Link to="/">
                <img className="app-header-logo" src="/mister-email/src/assets/images/memaillogo.jpg" />
            </Link>

            {/* <section className="container"> */}
                
                {/* Never use general "Back" */}
                {/* <button onClick={() => navigate(-1)}>Back</button>  */}
                {/* <nav>
                    <NavLink to='/' >Home</NavLink>
                    <NavLink to='/about' >About</NavLink>
                    <NavLink to='/email' >Email</NavLink>
                </nav> */}

                <div title="Appsus apps" onClick={toggleNavPreview} className="app-header-hamburger ">
                    <span className="material-symbols-outlined">apps</span>
                    <nav className={`${visibleClass} header-apps`}>
                        <NavLink className="home" title="Home" to="/">
                            <img src="/mister-email/src/assets/images/home.jpg" alt="home" />
                        </NavLink>
                        <NavLink className="mail" title="Mail" to="/email/inbox">
                            <img src="/mister-email/src/assets/images/mail.jpg" alt="mail" />
                        </NavLink>
                    </nav>
                </div>



            {/* </section> */}
        </header>
    )
}
