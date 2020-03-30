import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import  Head  from 'next/head';
import Link from 'next/link';
import { perPage } from '../config';
import Error from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        eventsConnection {
            aggregate {
                count
            }
        }
    }
`

const Pagination = props => (
    <Query query={PAGINATION_QUERY}>
            {({ data, loading, error }) => {
                if(loading) return <p>Loading...</p>
                if (error) return <Error error={error} />
                const count = data.eventsConnection.aggregate.count;
                const pages = Math.ceil(count / perPage);
                const page = props.page;
                    return (
                        <PaginationStyles>
                            <Head>
                                <title>
                                    Strona  {page} z {pages}
                                </title>
                            </Head>
                            <Link 
                                prefetch
                                href={{
                                    pathname: 'events',
                                    query: { page: page - 1 },
                                }}>
                                <a className="prev" aria-disabled={page <= 1}>Poprzednia</a>
                            </Link>
                            <p>
                                Strona {props.page} z {pages}
                            </p>
                            <p>
                                {count} 
                            </p>
                            <Link 
                                prefetch
                                href={{
                                    pathname: 'events',
                                    query: { page: page + 1 },
                                }}>
                                <a className="prev" aria-disabled={page >= pages}>Następna</a>
                            </Link>
                        </PaginationStyles>
                    )
                } 
            }
    </Query>
)

export default Pagination;