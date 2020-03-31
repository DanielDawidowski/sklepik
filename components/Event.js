import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import DeleteEvent from './DeleteEvent';
import User from './User';


class Event extends Component {
    static propTypes = {
        event: PropTypes.object.isRequired,
    }

    render() {
        const { event } = this.props
        return (
            <User>
                { ({data}) => {
                    const me = data ? data.me : null
                    return (
                        <div>
                            {event.image && <img src={event.image} width="400" height="300" alt={event.title}/>}
                            <Link href={{
                                pathname: '/event',
                                query: { id: event.id }
                            }}>
                                <a>{event.title}</a>
                            </Link>
                            <p>{event.price}</p>
                            <p>{event.description}</p>
                            <p>{event.start}</p>
                            <p>{event.end}</p>
                                {me && (
                                    <>
                                    <Link href={{
                                        pathname: '/update',
                                        query: { id: event.id },
                                    }}>
                                        <a>Edytuj</a>
                                    </Link>
                                    <DeleteEvent id={event.id} >Usuń</DeleteEvent>
                                    
                                    </>
                                )}
                            <button>Rezerwacja</button>
                        </div>
                    )
                }}
            </User>
        )
    }
}

export default Event;
