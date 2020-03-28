import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';


const SingleEventStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;

    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`

const SINGLE_EVENT_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            largeImage
            price
            start
            end
        }
    }
`;

class SingleEvent extends Component {
    render() {
        return (
            <Query query={SINGLE_EVENT_QUERY} variables={{
                id: this.props.id
            }}>
                {({ error, loading, data }) => {
                    if(error) return <Error error={error} />
                    if(loading) return <p>Loading...</p>
                    if(!data.event) return <p>No Item Found for {this.props.id}</p>
                    console.log(data)
                    const event = data.event;
                    return (
                        <SingleEventStyles>
                            <Head>
                                <title>Sick Fits | {event.title}</title>
                            </Head>
                            <img src={event.largeImage} alt={event.title} />
                            <div className="details">
                                <h2>Viewing {event.title}</h2>
                                <p>{event.description}</p>
                                <h5>{formatMoney(event.price)}</h5>
                                <p>{event.start}</p>
                                <p>{event.end}</p>
                            </div>
                        </SingleEventStyles>
                    )
                }}
            </Query>
        )
    }
}

export default SingleEvent;
export { SINGLE_EVENT_QUERY };