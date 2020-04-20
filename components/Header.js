import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};

const StyledHeader = styled.header`
        border-bottom: 1px solid ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        width: 100%;
        height: 80vh;
        /* background-image: url('/static/foto1.jpg'); */
        background-size: cover;
        background-attachment: fixed;
        background-position: 100% 100%;
        @media (min-width: 1300px) {
            grid-template-columns: 1fr;
            justify-content: center;
        }
`;

const Header = props => (
    <StyledHeader>
        <img src={props.src}/>
    </StyledHeader>
)

export default Header;