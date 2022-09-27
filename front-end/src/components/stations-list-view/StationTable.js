import { OrderButton } from "../OrderButton";
import { StationRow } from "./StationRow";
import { Spinner } from "../Spinner";

export const StationTable = ({
  stations,
  page,
  changeOrder,
  name,
  address,
  count,
}) => {
  const stationsPage =
    stations !== undefined
      ? stations.slice((page - 1) * 50, page * 50)
      : stations;
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr className="flex w-auto justify-center sm:table-row">
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 md:px-6 py-4 text-left "
                  >
                    <div className="m-2">Name</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={name}
                      col={"name"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 md:px-6 py-4 text-left"
                  >
                    <div className="m-2">Address</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={address}
                      col={"address"}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {count === null ? (
                  <tr className="w-full flex justify-center m-4">
                    <td>
                      <Spinner />
                    </td>
                  </tr>
                ) : stationsPage !== undefined ? (
                  stationsPage.map((station) => (
                    <StationRow key={station._id} station={station} />
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
