import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';


const CREATE_EVENT_MUTATION = gql`
    mutation CREATE_EVENT_MUTATION(
        $title: String!
        $description: String!
        $image: String
        $largeImage:String
        $price: Int!
        $start: String!
        $end: String!
        $category: String!
    ) {
        createEvent(
            title: $title
            description: $description
            image: $image
            largeImage: $largeImage
            price: $price
            start: $start
            end: $end
            category: $category
        ) {
            id
        }
    }
`;

class CreateEvent extends React.Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0,
        start: '',
        end: '',
        category: '',
    };

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [ name ] : val })
    };

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
            <Mutation mutation={CREATE_EVENT_MUTATION} variables={this.state}>
                {( createEvent, { loading, error }) => (   
                    <form onSubmit={ async e => {
                        e.preventDefault();
                        const res = await createEvent();
                        Router.push({
                            pathname: '/event',
                            query: { id: res.data.createEvent.id }
                        })
                    }}>
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
                                    required 
                                />
                                {this.state.image && <img width="200" src={this.state.image} alt='Upload Preview' />}
                            </label>

                            <label htmlFor="title">
                                Tytuł
                                <input 
                                    type="text" 
                                    id='title' 
                                    name="title"
                                    placeholder="Tytuł" 
                                    onChange={this.handleChange}
                                    value={this.state.title} 
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
                                    value={this.state.price} 
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
                                    value={this.state.start} 
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
                                    value={this.state.end} 
                                    required 
                                />
                            </label>

                            <label htmlFor="category">
                                Mazury czy w Góry
                                <select
                                    id='category' 
                                    name="category"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.category} 
                                    required 
                                >
                                    <option>Mazury</option>
                                    <option>Góry</option>
                                </select>
                            </label>

                            <label htmlFor="description">
                                Opis
                                <textarea
                                    type="text" 
                                    id='description' 
                                    name="description"
                                    placeholder="opis" 
                                    onChange={this.handleChange}
                                    value={this.state.description} 
                                    required 
                                />
                            </label>
                            <button type="submit">Utwórz Wyjazd</button>
                        </fieldset>
                    </form>
                  )}
            </Mutation>
        )
    }
}


export default CreateEvent;
export { CREATE_EVENT_MUTATION };