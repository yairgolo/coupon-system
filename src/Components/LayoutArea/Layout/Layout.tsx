import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<header>
                <Header />
            </header>
            
            {/* <aside>
            </aside> */}
            

            <main>
                <Routing />
                <Menu />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
