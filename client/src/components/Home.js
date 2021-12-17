import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <h1>📈 Personal Finance App 📈</h1>
      <Link to="/Login"><button>Log In</button></Link>
      <Link to="/SignUp"><button>Sign Up</button></Link>
      <Link to="/Dashboard"><button>Dashboard</button></Link>
    </div>
  );
}

export default Home