import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';


const SINGLE_EVENT_QUERY = gql`
    query SINLE_EVENT_QUERY($id: ID!) {
        event(where: { id: $id }) {
            id
            title
            description
            price
        }
    }
`;

const UPDATE_EVENT_MUTATION = gql`
    mutation UPDATE_EVENT_MUTATION(
        $id: ID!,
        $title: String,
        $description: String,
        $price: Int,
        $start: String,
        $end: String,
    ) {
        updateEvent(
            id: $id,
            title: $title,
            description: $description,
            price: $price,
            start: $start,
            end: $end,
        ) {
            id
            title
            description
            price
            start
            end
        }
    }
`;

class UpdateEvent extends React.Component {
    state = {};

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [ name ] : val })
    };

    updateEvent = async (e, updateEventMutation) => {
        e.preventDefault();
        console.log('Updating Item!');
        console.log(this.state);
        const res = await updateEventMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            }
        })
        console.log("updated")
    }


    render() {
        return (
            <Query query={SINGLE_EVENT_QUERY} variables={{
                id: this.props.id
            }}>
                {({ data, loading }) => {
                    if(loading) return <p>Loading ...</p>
                    if(!data.event) return <p>No Event Found for ID {this.props.id}</p>
                    return (
                    <Mutation mutation={ UPDATE_EVENT_MUTATION } variables={this.state}>
                        {( updateEvent, { loading, error }) => (
                            <form onSubmit={ async e => {
                                this.updateEvent(e, updateEvent);
                                Router.push('/events')
                            }}>
                                <p> Edytuj wyjazd</p>
                                <Error error={error} />
                                <fieldset disabled={loading} aria-busy={loading}>

                                    <label htmlFor="title">
                                        Tytuł
                                        <input 
                                            type="text" 
                                            id='title' 
                                            name="title"
                                            placeholder="Tytuł" 
                                            onChange={this.handleChange}
                                            defaultValue={data.event.title} 
                                            required 
                                        />
                                    </label>

                                    <label htmlFor="price">
                                        Cena
                                        <input 
                                            type="number" 
                                            id='price' 
                                            name="price"
                                            placeholder="Cena" 
                                            onChange={this.handleChange}
                                            defaultValue={data.event.price}
                                            required 
                                        />
                                    </label>

                                    <label htmlFor="start">
                                        Start
                                        <input 
                                            type="date" 
                                            id='start' 
                                            name="start"
                                            placeholder="Start" 
                                            onChange={this.handleChange}
                                            defaultValue={data.event.start}
                                            required 
                                        />
                                    </label>

                                    <label htmlFor="end">
                                        Powrót
                                        <input 
                                            type="date" 
                                            id='end' 
                                            name="end"
                                            placeholder="Powrót" 
                                            onChange={this.handleChange}
                                            defaultValue={data.event.end}
                                            required 
                                        />
                                    </label>

                                    <label htmlFor="description">
                                        Opis
                                        <textarea
                                            type="text" 
                                            id='description' 
                                            name="description"
                                            placeholder="opis" 
                                            onChange={this.handleChange}
                                            defaultValue={data.event.description}  
                                            required 
                                        />
                                    </label>
                                    <button type="submit">Zapis{loading ? 'uje' : 'z'}</button>
                                </fieldset>
                            </form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
}


export default UpdateEvent;
export { UPDATE_EVENT_MUTATION };