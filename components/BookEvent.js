import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';


const BOOK_EVENT_MUTATION = gql`
    mutation BOOK_EVENT_MUTATION(
        $name: String!
        $email: String!
        $phone: Int!
        $message: String!
        $event: String!
    ) {
        createBooking(
            name: $name
            email: $email
            phone: $phone
            message: $message
            event: $event
        ) {
            id
        }
    }
`;

const ALL_EVENTS_QUERY = gql`
    query ALL_EVENTS_QUERY {
        events {
            id
            title
        }
    }
`;

class BookEvent extends React.Component {
    state = {
        name: '',
        email: '',
        phone: 0,
        message: '',
        event: '',
    };

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [ name ] : val })
    };


    render() {
        return (
            <Mutation mutation={BOOK_EVENT_MUTATION} variables={this.state}>
                {( createBooking, { loading, error }) => (   
                    <form onSubmit={ async e => {
                        e.preventDefault();
                        const res = await createBooking();
                        Router.push('/')
                    }}>
                        <Query query={ALL_EVENTS_QUERY}>
                            {({data, loading, error }) => {
                                if (loading) return <p>loading...</p>;
                                    if (error) return <Error erorr={error} />;
                                    console.log(typeof(data.events[0].title))
                                    return (
                                        <>
                                        <p> Utwórz wyjazd</p>
                                        <Error error={error} />
                                        <fieldset disabled={loading} aria-busy={loading}>

                                            <label htmlFor="name">
                                                Imię i Nazwisko
                                                <input 
                                                    type="text" 
                                                    id='name' 
                                                    name="name"
                                                    placeholder="Imię i Nazwisko" 
                                                    onChange={this.handleChange}
                                                    value={this.state.name} 
                                                    required 
                                                />
                                            </label>

                                            <label htmlFor="email">
                                                Email
                                                <input 
                                                    type="email" 
                                                    id='email' 
                                                    name="email"
                                                    placeholder="Email" 
                                                    onChange={this.handleChange}
                                                    value={this.state.email} 
                                                    required 
                                                />
                                            </label>

                                            <label htmlFor="phone">
                                                Numer telefonu
                                                <input 
                                                    type="number" 
                                                    id='phone' 
                                                    name="phone"
                                                    placeholder="Numer telefonu" 
                                                    onChange={this.handleChange}
                                                    value={this.state.phone} 
                                                    required 
                                                />
                                            </label>

                                            <label htmlFor="event">
                                                Mazury czy w Góry
                                                <select 
                                                    id='event' 
                                                    name="event"
                                                    onChange={this.handleChange}
                                                    value={this.state.event} 
                                                    required 
                                                >
                                                <option disabled>--WYBIERZ--</option>           
                                                {data.events.map(event => <option key={event.id}>{event.title}</option>)}       
                                                </select>
                                            </label>

                                            <label htmlFor="message">
                                                Wiadomość
                                                <textarea
                                                    type="text" 
                                                    id='message' 
                                                    name="message"
                                                    placeholder="Wiadomość" 
                                                    onChange={this.handleChange}
                                                    value={this.state.message} 
                                                />
                                            </label>
                                            <button type="submit">Zapisz się</button>
                                        </fieldset>
                                        </>
                                    )   
                                }}
                            </Query>
                        </form>
                    )}
            </Mutation>
        )
    }
}


export default BookEvent;
export { BOOK_EVENT_MUTATION };