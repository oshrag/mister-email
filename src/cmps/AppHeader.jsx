import { Link, NavLink, useNavigate } from 'react-router-dom'

export function AppHeader() {

    const navigate = useNavigate()

    return (
        <header className="app-header">
            <section className="container">
                
                {/* Never use general "Back" */}
                {/* <button onClick={() => navigate(-1)}>Back</button>  */}
                <nav>
                    <NavLink to='/' >Home</NavLink>
                    <NavLink to='/about' >About</NavLink>
                    <NavLink to='/email' >Email</NavLink>
                </nav>
            </section>
        </header>
    )
}
