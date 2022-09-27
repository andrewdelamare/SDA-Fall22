import { TripRow } from "./TripRow";
import { OrderButton } from "../OrderButton";
export const TripTable = ({
  tripList,
  changeOrder,
  depOrder,
  retOrder,
  disOrder,
  durOrder,
  page,
}) => {
  const tripsPage =
    tripList !== undefined
      ? tripList.slice((page - 1) * 50, page * 50)
      : tripList;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-2 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr className="flex sm:table-row">
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                  >
                    <div className="mt-2 sm:m-2"> Departure</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={depOrder}
                      col={"depNm"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left "
                  >
                    <div className="mt-2 sm:m-2"> Return</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={retOrder}
                      col={"retNm"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left "
                  >
                    <div className="mt-2 sm:m-2"> Duration</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={durOrder}
                      col={"duration"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left "
                  >
                    <div className="mt-2 sm:m-2"> Distance</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={disOrder}
                      col={"distance"}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {tripsPage !== undefined ? (
                  tripsPage.map((trip) => (
                    <TripRow key={trip._id} trip={trip} />
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
