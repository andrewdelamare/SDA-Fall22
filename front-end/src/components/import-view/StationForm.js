import { addStation } from "../../services/stationService";

export const StationForm = ({ handleSubmit, register, errors, setError }) => {
  return (
    <form
      className="flex flex-col w-[300px] self-center"
      onSubmit={handleSubmit(async (data) => {
        await addStation(data)
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
      <label>Station ID: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm rounded"
        {...register("stationId", {
          valueAsNumber: true,
          required: "Station ID is required",
          min: { value: 1, message: "Value must be greater than zero" },
        })}
      />
      <p className="text-red-500">{errors.stationId?.message}</p>
      <label>Name: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm rounded"
        {...register("name", {
          required: "Station name is required",
          type: "text",
          minLength: {
            value: 4,
            message: "Please enter the full name of the station",
          },
        })}
      ></input>
      <p className="text-red-500">{errors.name?.message}</p>
      <label>Address: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm rounded"
        {...register("address", {
          required: "Address name is required",
          type: "text",
          minLength: {
            value: 4,
            message: "Please enter the full address",
          },
        })}
      ></input>
      <p className="text-red-500">{errors.address?.message}</p>
      <label>City: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm rounded"
        {...register("kaupunki", {
          required: "City is required",
          type: "text",
          minLength: {
            value: 3,
            message: "Please enter the full name of the city",
          },
        })}
      ></input>
      <p className="text-red-500">{errors.kaupunki?.message}</p>
      <label>Operator name: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm rounded"
        {...register("operaattor", {
          required: "Operator name is required",
          type: "text",
          minLength: {
            value: 2,
            message: "Please enter the full name of the operator",
          },
        })}
      ></input>
      <p className="text-red-500">{errors.name?.message}</p>
      <label>X coordinates: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm rounded"
        {...register("x", {
          required: "X coordinates are required",
          type: "number",
          min: { value: -90, message: "Must not be less than -90" },
          max: { value: 90, message: "Must not be greater than 90" },
        })}
      />
      <p className="text-red-500">{errors.x?.message}</p>
      <label>Y coordinates: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm rounded"
        {...register("y", {
          required: "Y coordinates are required",
          type: "number",
          min: { value: -90, message: "Must not be less than -90" },
          max: { value: 90, message: "Must not be greater than 90" },
        })}
      />
      <p className="text-red-500">{errors.y?.message}</p>
      <button
        className="m-2 rounded-xl border-2 w-fit self-center p-2 bg-stone-200 shadow-md hover:bg-stone-400"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
