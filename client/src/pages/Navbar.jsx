import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();
  return (
    <div className="wrapper">

    <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to= {
                    isAuthenticated ? "/cars" : "/"
                }>
                    PICISJANA
                </Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <div className="left-nav-toggle">
                    <a href="#">
                        { isAuthenticated ? (
                            <>
                                <i className="stroke-hamburgermenu"></i>
                            </>
                        ): (
                        <>        
                        </>
                        )}
                    </a>
                </div>
                { isAuthenticated ? (
                    <>  
                        <form className="navbar-form navbar-left">
                            <input type="text" className="form-control" placeholder="Busca el auto que necesites..." />
                        </form>
                    </>
                    ): (
                    <>        
                    </>
                    )}
                <ul className="nav navbar-nav navbar-right">
                    { isAuthenticated ? (
                    <>
                        <li className="dropdown">
                        <Link >Welcome {user.username} </Link>
                        </li>
                        <li className="dropdown">
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li className="dropdown">
                            <Link to="/" onClick={() => {logout()}}>Logout</Link>
                        </li>
                    </>

                    ): (
                    <>
                        <li className="dropdown">
                            <Link to='/register'>Register</Link>
                        </li>
                        <li className="dropdown">
                            <Link to='/login'>Login</Link>
                        </li>
                    </>
                    )}
                    <li className="dropdown">
                        <Link to="/profile">
                           
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
    { isAuthenticated ? (
        <>
            <aside className="navigation">
                <nav>
                    <ul className="nav luna-nav">
                        <li className="nav-category">
                            Hola,  {user.username} buen día....!
                        </li>
                        <li>
                            <Link to='/cars' >Cars</Link>
                            <Link to='/cars-sale' >Cars Sale</Link>
                        </li>
                    
        
                        <li>
                            <a href="versions.html">
                                <span className="badge pull-right">1</span>
                                Versions
                            </a>
                        </li>
                        <li className="nav-info">
                            <i className="pe pe-7s-shield text-accent"></i>
                            <div className="m-t-xs">
                                <span className="c-white">PICISJANA</span> Hola que tal  {user.username} , espero que tengas un buen dia, te saluda el grupo de FastCar.
                            </div>             
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    ): (
        <>
            
        </>
    )}
    </div>
  );
}

export default Navbar;