import {Link} from "react-router-dom";

function MenuBar() {
  return (
    <div className='MenuBar'>
      <Link to="/"><h1>Menu Bar</h1></Link>
    </div>
  );
}

export default MenuBar;
