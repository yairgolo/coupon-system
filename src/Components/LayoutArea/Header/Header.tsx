import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">

            <NavLink to="/home" className="Home">🏠</NavLink>

            <AuthMenu />

			<h1 className="animate-charcter">Copuon System</h1>

        </div>
    );
}

export default Header;
