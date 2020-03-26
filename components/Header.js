import Nav from './Nav';

const Header = () => (
    <div>
        <div className="bar">
            <a href="/">Sklepik</a>
            <Nav />
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <div>Cart</div>
    </div>
)

export default Header;