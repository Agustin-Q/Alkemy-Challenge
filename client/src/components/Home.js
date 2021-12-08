import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <h1>📈 Personal Finance App 📈</h1>
      <button>Log In</button>
      <Link to="/SignUp"><button>Sign Up</button></Link>
    </div>
  );
}

export default Home