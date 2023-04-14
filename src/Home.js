import { Link } from 'react-router-dom';



export default function Home() {
  return (
    <>
      <header>
        <Link className="get_started_btn" to="/getstarted"> Get Started </Link>
      </header>
      
      <main className='main_home_page'>
        <h1>Home Page</h1>
      </main>
    </>
  );
}
