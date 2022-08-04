import { useState } from "react";
import { useForm } from "react-hook-form";
import { postTrip } from "../services/tripService";
import { addStation } from "../services/stationService";

const JourneyForm = ({ handleSubmit, register, errors, setError }) => {
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
        className="border-2 mx-2"
        id="departureInput"
        {...register("departure", {
          valueAsDate: true,
          required: "Departure time and date are required",
          type: "datetime-local",
          min: "2021-04-30T21:00",
          max: "2021-07-31T21:00",
        })}
      />
      <p class="text-red-500">{errors.departure?.message}</p>
      <label>Return: </label>
      <input
        type="datetime-local"
        className="border-2 mx-2"
        id="returnInput"
        {...register("ret", {
          valueAsDate: true,
          required: "Return time and date are required",
          type: "datetime-local",
          min: "2021-04-30T21:00",
          max: "2021-07-31T21:00",
        })}
      />
      <p class="text-red-500">{errors.ret?.message}</p>
      <label>Departure ID: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm"
        {...register("depId", {
          valueAsNumber: true,
          required: "Departure ID is required",
          type: "number",
        })}
      />
      <p class="text-red-500">{errors.depId?.message}</p>
      <label>Return ID: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm"
        {...register("retId", {
          valueAsNumber: true,
          required: "Return ID is required",
          type: "number",
        })}
      />
      <p class="text-red-500">{errors.retId?.message}</p>
      <label>Departure station name: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm"
        {...register("depNm", {
          required: "Departure station name is required",
          type: "text",
          minLength: {
            value: 4,
            message: "Please enter the full name of the departure station",
          },
        })}
      ></input>
      <p class="text-red-500">{errors.depNm?.message}</p>
      <label>Return station name: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm"
        {...register("retNm", {
          required: "Return station name is required",
          type: "text",
          minLength: {
            value: 4,
            message: "Please enter the full name of the return station",
          },
        })}
      />
      <p class="text-red-500">{errors.retNm?.message}</p>
      <label>Distance in meters: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm"
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
      <p class="text-red-500">{errors.distance?.message}</p>
      <button
        className="m-2 rounded-xl border-2 w-fit self-center p-2 bg-stone-200 hover:bg-stone-400"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

const StationForm = ({ handleSubmit, register, errors, setError }) => {
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
        className="border-2 mx-2 text-sm"
        {...register("stationId", {
          valueAsNumber: true,
          required: "Station ID is required",
          min: { value: 1, message: "Value must be greater than zero" },
        })}
      />
      <p class="text-red-500">{errors.stationId?.message}</p>
      <label>Name: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm"
        {...register("name", {
          required: "Station name is required",
          type: "text",
          minLength: {
            value: 4,
            message: "Please enter the full name of the station",
          },
        })}
      ></input>
      <p class="text-red-500">{errors.name?.message}</p>
      <label>Address: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm"
        {...register("address", {
          required: "Address name is required",
          type: "text",
          minLength: {
            value: 4,
            message: "Please enter the full address",
          },
        })}
      ></input>
      <p class="text-red-500">{errors.address?.message}</p>
      <label>City: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm"
        {...register("kaupunki", {
          required: "City is required",
          type: "text",
          minLength: {
            value: 3,
            message: "Please enter the full name of the city",
          },
        })}
      ></input>
      <p class="text-red-500">{errors.kaupunki?.message}</p>
      <label>Operator name: </label>
      <input
        type="text"
        className="border-2 mx-2 text-sm"
        {...register("operaattor", {
          required: "Operator name is required",
          type: "text",
          minLength: {
            value: 2,
            message: "Please enter the full name of the operator",
          },
        })}
      ></input>
      <p class="text-red-500">{errors.name?.message}</p>
      <label>X coordinates: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm"
        {...register("x", {
          required: "X coordinates are required",
          type: "number",
          min: { value: -90, message: "Must not be less than -90" },
          max: { value: 90, message: "Must not be greater than 90" },
        })}
      />
      <p class="text-red-500">{errors.x?.message}</p>
      <label>Y coordinates: </label>
      <input
        type="number"
        className="border-2 mx-2 text-sm"
        {...register("y", {
          required: "Y coordinates are required",
          type: "number",
          min: { value: -90, message: "Must not be less than -90" },
          max: { value: 90, message: "Must not be greater than 90" },
        })}
      />
      <p class="text-red-500">{errors.y?.message}</p>
      <button
        class="m-2 rounded-xl border-2 w-fit self-center p-2 bg-stone-200 hover:bg-stone-400"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export const ImportView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [option, setOpt] = useState("journey");
  const [error, setError] = useState(null);

  return (
    <div className="mx-10 my-4 flex flex-col">
      <div className="m-5 flex w-fit self-center">
        <label className="mr-2">Data type:</label>
        <select
          onChange={(e) => {
            e.preventDefault();
            setOpt(e.target.value);
            reset();
          }}
        >
          <option value="journey">Journey</option>
          <option value="station">Station</option>
        </select>
      </div>
      {option === "journey" ? (
        <JourneyForm
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          setError={setError}
        />
      ) : (
        <StationForm
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          setError={setError}
        />
      )}
      {error === true ? (
        <p className="border-2 rounded-lg flex w-fit self-center p-2 m-4 text-center border-slate-300 bg-red-500 text-white">
          Unable to save your request
        </p>
      ) : error === false ? (
        <p className="border-2 rounded-lg flex w-fit self-center p-2 m-4 text-center border-slate-300 bg-green-500 text-white">
          Entry saved
        </p>
      ) : null}
    </div>
  );
};
