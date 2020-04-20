import React from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { parseISO, format } from 'date-fns';
import { pl } from 'date-fns/locale';

import Error from './ErrorMessage';



const ALL_BOOKINGS_QUERY = gql`
    query ALL_BOOKINGS_QUERY {
        bookings {
            id
            name
            email
            phone
            message
            event
            createdAt
            updatedAt
        }
    }
`;

const BookedList = props => (
  <Query query={ALL_BOOKINGS_QUERY}>
    {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <Error error={error} />
        return (
        <div>
          <h2>Lista </h2>
          <table>
            <thead>
              <tr>
                <th>Imię i Nazwisko</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Wyjazd</th>
                <th>Data Rejestracji</th>
                <th>Wiadomość</th>
              </tr>
            </thead>
            <tbody>{data.bookings && data.bookings.map(booking => 
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>  
                <td>{booking.phone}</td>  
                <td>{booking.event}</td>
                <td>{format(parseISO(booking.createdAt), 'MMMM d, yyyy h:mm a', { locale: pl })}</td>  
                <td>{booking.message}</td>
              </tr> 
            )}</tbody>
          </table>
        </div>
      )}
    }
  </Query>
);


export default BookedList;