import CreateEvent from '../components/CreateEvent';
import PleaseSignIn from '../components/PleaseSignIn';

const Create = props => (
  <div> 
    <PleaseSignIn>
      <CreateEvent />
    </PleaseSignIn>
  </div>
)

export default Create;
