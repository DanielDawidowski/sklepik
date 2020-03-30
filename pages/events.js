import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from '../components/ErrorMessage';
import Event from '../components/Event';

const ALL_EVENTS_QUERY = gql`
    query ALL_EVENTS_QUERY {
        events {
            id
            title
            description
            price
            start
            end
            image
        }
    }
`;

const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`;

class Events extends React.Component {
    render() {
        return (
            <div>
                <p>Events</p>
                <Query query={ALL_EVENTS_QUERY}>
                    {({ data, error, loading }) => {
                        if(loading) return <p>Loading...</p>
                        if(error) return <p><Error /></p>
                        console.log(data);
                        return (
                            <ItemsList>
                                {data.events.map(event => <Event key={event.id} event={event}/>)}
                            </ItemsList>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default Events;
export { ALL_EVENTS_QUERY };