import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';


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

    uploadFile = async e => {
        console.log('uploading file...');
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sklepik');
        const res = await fetch('https://api.cloudinary.com/v1_1/dandawid/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url,
        });
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
                            
                            <form onSubmit={ async e => this.updateEvent(e, updateEvent)}>
                                <p> Utwórz wyjazd</p>
                                <Error error={error} />
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <label htmlFor="file">
                                        Zdjęcie
                                        <input 
                                            type="file" 
                                            id='file' 
                                            name="file"
                                            placeholder="Zdjęcie" 
                                            onChange={this.uploadFile}
                                            defaultValue={data.event.image} 
                                            required 
                                        />
                                        {this.state.image && <img src={this.state.image} width="200" alt='Upload Preview' />}
                                    </label>

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