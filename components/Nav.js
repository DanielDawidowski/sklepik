import Link from 'next/link';
import User from './User';
import NavStyles from './styles/NavStyles';
import Signout from './Signout';


const Nav = () => (
        <User>
            { ({data}) => {
                const me = data ? data.me : null
                return (
                    <NavStyles>
                        {me && <p>{me.name}</p>}
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                        <Link href="/events">
                            <a>Wyjazdy</a>
                        </Link>
                        {me && (
                            <>
                                <Link href="/create">
                                    <a>Utwórz Wyjazd</a>
                                </Link>
                                <Link href="/orders">
                                    <a>Orders</a>
                                </Link>
                                <Signout />
                            </>
                            )}
                    </NavStyles>
                )
            }}
        </User>
)

export default Nav;