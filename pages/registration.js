import BookEvent from '../components/BookEvent';
import Header from '../components/Header';


const Event = props => (
    <div>
        <Header />
        <BookEvent id={props.query.id}/>
    </div>
)

export default Event;