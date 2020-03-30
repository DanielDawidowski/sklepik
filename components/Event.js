import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import DeleteEvent from './DeleteEvent';

class Event extends Component {
    static propTypes = {
        event: PropTypes.object.isRequired,
    }

    render() {
        const { event } = this.props
        return (
            <div>
                {event.image && <img src={event.image} alt={event.title}/>}
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
                <div>
                    <Link href={{
                        pathname: '/update',
                        query: { id: event.id },
                    }}>
                        <a>Edytuj</a>
                    </Link>
                    <DeleteEvent id={event.id} >Usuń</DeleteEvent>
                    <button>Rezerwacja</button>
                </div>
            </div>
        )
    }
}

export default Event;
