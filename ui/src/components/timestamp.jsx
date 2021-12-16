import Moment from 'react-moment';
import 'moment-timezone';

const Timestamp = (props) => {
    return (
        <Moment fromNow withTitle tz="Europe/London">
          {props.when}
        </Moment>
    );
};

export default Timestamp;
