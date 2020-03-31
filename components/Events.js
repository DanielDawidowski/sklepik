import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Pagination from './Pagination';
import Error from './ErrorMessage';
import Event from './Event';
import { perPage } from "../config";


const ALL_EVENTS_QUERY = gql`
    query ALL_EVENTS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        events(first: $first, skip: $skip) {
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
    margin: 0 auto;
`;

class Events extends Component {
    render() {
        return (
            <div>
                <Pagination page={this.props.page}/>
                <Query 
                    query={ALL_EVENTS_QUERY}
                    variables={{
                        skip: this.props.page * perPage - perPage,
                    }}
                >
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
                <Pagination page={this.props.page}/>
            </div>
        )
    }
}

export default Events;
export { ALL_EVENTS_QUERY };