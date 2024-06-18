// import imgUrl from '../assets/imgs/react.png'
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Home() {
  useEffect(() => {
    document.title = "MeMail";
  }, []);

  return (
    <section className="home">
      <h1>Welcome to our React App</h1>
      <Link to={"/email/inbox?compose=new&to=help@gmail.com&subject=Help"}>
        help
      </Link>
      {/* <img src={imgUrl} alt="" /> */}
    </section>
  );
}
