import Events from '../components/Events';

const EventsPage = props => (
  <div>
    <Events page={parseFloat(props.query.page) || 1}/>
  </div>
)

export default EventsPage;