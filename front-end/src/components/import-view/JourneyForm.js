import { postTrip } from "../../services/tripService";

export const JourneyForm = ({ handleSubmit, register, errors, setError }) => {
  return (
    <form
      className="flex flex-col w-[300px] self-center"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        await postTrip(data)
          .then(() => {
            setTimeout(() => {
              setError(null);
            }, 10000);
            setError(false);
          })
          .catch(() => {
            setTimeout(() => {
              setError(null);
            }, 10000);
            setError(true);
          });
      })}
    >
      <input type="hidden" id="timezone" name="timezone" value="+03:00"></input>
      <label>Departure: </label>
      <input
        type="datetime-local"
        className="border-2 mx-2 rounded"
        id="departureInput"
        {...register("departure", {
          valueAsDate: true,
          required: "Departure time and date are required",
          type: "datetime-local",
          min: "2021-04-30T21:00",
          max: "2021-07-31T21:00",
        })}
      />
      <p className="text-red-500">{errors.departure?.message}</p>
      <label>Return: </label>
      <input
        type="datetime-local"
        className="border-2 mx-2 rounded"
        id="returnInput"
        {...register("ret", {
          valueAsDate: true,
          required: "Return time and date are required",
          type: "datetime-local",
          min: "2021-04-30T21:00",
          max: "2021-07-31T21:00",
        })}
      />
      <p className="text-red-500">{errors.ret?.message}</p>
      <label>Departure ID: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm rounded"
        {...register("depId", {
          valueAsNumber: true,
          required: "Departure ID is required",
          type: "number",
        })}
      />
      <p className="text-red-500">{errors.depId?.message}</p>
      <label>Return ID: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm rounded"
        {...register("retId", {
          valueAsNumber: true,
          required: "Return ID is required",
          type: "number",
        })}
      />
      <p className="text-red-500">{errors.retId?.message}</p>
      <label>Departure station name: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm rounded"
        {...register("depNm", {
          required: "Departure station name is required",
          type: "text",
          minLength: {
            value: 4,
            message: "Please enter the full name of the departure station",
          },
        })}
      ></input>
      <p className="text-red-500">{errors.depNm?.message}</p>
      <label>Return station name: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm rounded"
        {...register("retNm", {
          required: "Return station name is required",
          type: "text",
          minLength: {
            value: 4,
            message: "Please enter the full name of the return station",
          },
        })}
      />
      <p className="text-red-500">{errors.retNm?.message}</p>
      <label>Distance in meters: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm rounded"
        {...register("distance", {
          valueAsNumber: true,
          required: "Distance is required",
          type: "number",
          min: {
            value: 10,
            message: "The Journey must be longer than 10 meters",
          },
        })}
      />
      <p className="text-red-500">{errors.distance?.message}</p>
      <button
        className="m-2 rounded-xl border-2 w-fit self-center p-2 bg-stone-200 shadow hover:bg-stone-400"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
