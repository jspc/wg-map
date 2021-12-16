import {
    Grid,
} from '@material-ui/core';

import StatsTable from './statsTable';
import PeerTable from './peerTable';

export default function Table(props) {
    const {data} = props;

    return(
        <>
          <Grid container style={{"marginBottom":"64px"}}>
            <Grid item sm={12} lg={12} xl={12} >
              <h2>Connectivity</h2>
            </Grid>

            <Grid item sm={12} lg={6} xl={6}>
              <StatsTable data={data}/>
            </Grid>

            <Grid item sm={12} lg={6} xl={6}>
              <PeerTable data={data}/>
            </Grid>

          </Grid>
        </>
    );
}
