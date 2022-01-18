import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <Link to="/Login"><button>Log In</button></Link>
      <Link className="Link" to="/SignUp"><button>Sign Up</button></Link>
      {localStorage.getItem('Token') && <Link to="/Dashboard"><button>Dashboard</button></Link> }
    </div>
  );
}

export default Home