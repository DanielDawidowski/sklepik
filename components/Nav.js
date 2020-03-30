import Link from 'next/link';
import User from './User';

const Nav = () => (
    <div>
        <User>
            {({ data: { me } }) => {
                console.log(me);
                if (me) return <p>{me.name}</p>
                return null
            }}
        </User>
        <Link href="/sell">
            <a>Sell</a>
        </Link>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/events">
            <a>Wyjazdy</a>
        </Link>
        <Link href="/signup">
            <a>Zaloguj</a>
        </Link>
    </div>
)

export default Nav;