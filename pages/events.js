import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
                            <>
                                {data.events.map(event => <Event key={event.id} event={event}/>)}
                            </>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default Events;
export { ALL_EVENTS_QUERY };