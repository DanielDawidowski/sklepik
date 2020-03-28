import SingleEvent from '../components/SingleEvent';


const Event = props => (
    <div>
        <SingleEvent id={props.query.id}/>
    </div>
)

export default Event;