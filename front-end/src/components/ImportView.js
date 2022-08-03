import { useState } from "react";
import { useForm } from "react-hook-form";
import { postTrip } from "../services/tripService";
import { addStation } from "../services/stationService";

/* 
departure: req.body.departure,
      ret: req.body.return,
      depId: req.body.depId,
      depNm: req.body.depNm,
      retId: req.body.retId,
      retNm: req.body.retNm,
      distance: req.body.distance,
      duration: req.body.duration, 
      
      body("departure").isDate(),
  body("ret").isDate(),
  body("depId").isNumeric(),
  body("depNm").isString(),
  body("retId").isNumeric(),
  body("retNm").isString(),
  body("distance").isNumeric(),
  body("duration").isNumeric(),
      */

const JourneyForm = ({ handleSubmit, register, errors }) => {
  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        postTrip(data);
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
      <p>{errors.departure?.message}</p>
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
      <p>{errors.ret?.message}</p>
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
      <p>{errors.depId?.message}</p>
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
      <p>{errors.retId?.message}</p>
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
      <p>{errors.depNm?.message}</p>
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
      <p>{errors.retNm?.message}</p>
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
      <p>{errors.distance?.message}</p>
      <button className="" type="submit">
        Submit
      </button>
    </form>
  );
};

const StationForm = ({ handleSubmit, register, errors }) => {
  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        await addStation(data);
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
      <p>{errors.stationId?.message}</p>
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
      <p>{errors.name?.message}</p>
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
      <p>{errors.address?.message}</p>
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
      <p>{errors.name?.message}</p>
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
      <p>{errors.name?.message}</p>
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
      <button className="" type="submit">
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

  return (
    <div className="mx-10 my-4 mt-[96px] flex flex-col">
      <div className="m-5">
        <label>Data type: </label>
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
        />
      ) : (
        <StationForm
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
        />
      )}
    </div>
  );
};
