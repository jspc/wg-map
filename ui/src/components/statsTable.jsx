import Timestamp from './timestamp';

export default function StatsTable(props) {
    const {data} = props;

    return (
        <>
          <h3>{data && '0.0.0.0' + data.address}</h3>

          <table className="stats">
            <tr>
              <th>
                Sent:
              </th>
              <td>
                {data && data.sent}
              </td>
            </tr>

            <tr>
              <th>
                Received:
              </th>
              <td>
                {data && data.received}
              </td>
            </tr>

            <tr>
              <th>
                Last Updated:
              </th>
              <td>
                {data && <Timestamp when={data.datetime}/>}
              </td>
            </tr>
          </table>
        </>
    );
}
