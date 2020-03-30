import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_EVENTS_QUERY } from './Events';


const DELETE_EVENT_MUTATION = gql`
    mutation DELETE_EVENT_MUTATION($id: ID!) {
        deleteEvent(id: $id) {
            id
        }
    }
`;

class DeleteEvent extends Component {
    update = (cache, payload) => {
        // manually update the cache on the client, so it matches the server
        // 1. Read the cache for the items we want
        const data = cache.readQuery({ query: ALL_EVENTS_QUERY });
        console.log(data, payload);
        // 2. Filter the deleted itemout of the page
        data.events = data.events.filter(event => event.id !== payload.data.deleteEvent.id);
        // 3 Put the items back!
        cache.writeQuery({ query: ALL_EVENTS_QUERY, data });
    }
    
    render() {
        return(
            <Mutation 
                mutation={DELETE_EVENT_MUTATION} 
                variables={{
                    id: this.props.id
                }}
                update={this.update}
            >
                {( deleteEvent, { error } ) => (
                    <button onClick={() => {
                        if(confirm('Czy napewno chcesz usunąć ten wyjazd ?')) {
                            deleteEvent().catch(err => {
                                alert(err.message)
                            });
                        }
                    }}>{this.props.children}</button>
                )}
            </Mutation>
        ) 
    }
}

export default DeleteEvent;