import Link from 'next/link';
import styled from 'styled-components';
import User from './User';
import NavStyles from './styles/NavStyles';
import Signout from './Signout';

const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    height: 7.2vh;
    padding: 1rem;
    z-index: 9999;
    background: linear-gradient(rgba(87, 34, 13, 0.466), rgba(87, 34, 13, 0.466));
    border-bottom:  ${props => props.theme.yellow} 2px solid;
`;



const UserName = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${props => props.theme.yellow};
`;

const Logo = styled.h1`
    font-size: 3rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    a {
        padding: 0.5rem 1rem;
        background: ${props => props.theme.yellow};
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }
    @media (min-width: 1300px) {
        margin: 0;
        text-align: center;
    }
`

const Nav = () => (
        <User>
            { ({data}) => {
                const me = data ? data.me : null
                return (
                    <>
                    <Navigation>
                        <Logo>
                            <Link href="/">
                                <a>Aktywne Obozy</a>
                            </Link>
                        </Logo>
                        <NavStyles>
                            {me && <UserName>{me.name}</UserName>}
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
                                    <Link href="/list">
                                        <a>Lista</a>
                                    </Link>
                                    <Signout />
                                </>
                                )}
                        </NavStyles>
                    </Navigation>
                    </>
                )
            }}
        </User>
)

export default Nav;