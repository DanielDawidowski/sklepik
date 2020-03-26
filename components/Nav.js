import Link from 'next/link';

const Nav = () => (
    <div>
        <Link href="/sell">
            <a>Sell</a>
        </Link>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/events">
            <a>Wyjazdy</a>
        </Link>
    </div>
)

export default Nav;