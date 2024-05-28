// import { Link, Outlet } from 'react-router-dom'

export function AboutUs() {
    return (
        <div className="about">
            <h1>We are all about mister email</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis corrupti,
                sequi dolor tempora error reiciendis provident porro, quod ipsa quisquam
                dignissimos ratione quos a nobis cumque hic sit ipsum aperiam.
            </p>
            
            <nav style={{ marginBlock: '30px' }}>
                {/* <Link to='/about/team' >Team</Link>
                <Link to='/about/vision' >Vision</Link> */}
            </nav>
            {/* <Outlet/> */}
        </div>
    )
}
