import {Link} from "react-router-dom";
import { getUserName } from "../helper/helperFunctions";

function MenuBar() {
  return (
    <div className='MenuBar'>
      <span className="material-icons MenuIcon">menu</span>
      <Link to="/"><h1>📈 Personal Finance App 📈</h1></Link>
    </div>
  );
}

export default MenuBar;
