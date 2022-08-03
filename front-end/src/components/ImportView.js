import { useState } from "react";
import { useForm } from "react-hook-form";

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

const JourneyForm = ({ handleSubmit, register }) => {
  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <input type="hidden" id="timezone" name="timezone" value="+03:00"></input>
      <label>Departure: </label>
      <input
        type="datetime-local"
        className="border-2 mx-2"
        min="2021-04-30T21:00"
        max="2021-07-31T21:00"
        id="departureInput"
        {...register("departure", {
          required: true,
          type: "datetime-local",
          min: "2021-04-30T21:00",
          max: "2021-07-31T21:00",
        })}
      />
      <label>Return: </label>
      <input
        type="datetime-local"
        className="border-2 mx-2"
        min="2021-04-30T21:00"
        max="2021-07-31T21:00"
        id="returnInput"
      />
      <label>Departure ID: </label>
      <input type="text" className="border-2 mx-2 text-sm" />
      <label>Return ID: </label>
      <input type="text" className="border-2 mx-2 text-sm" />
      <label>Departure station name: </label>
      <input type="text" className="border-2 mx-2 text-sm"></input>
      <label>Return station name: </label>
      <input type="text" className="border-2 mx-2 text-sm" />
      <label>Distance: </label>
      <input type="text" className="border-2 mx-2 text-sm" />
      <label>Duration: </label>
      <input type="text" className="border-2 mx-2 text-sm" />
      <input type="submit" />
    </form>
  );
};

const StationForm = () => {};

export const ImportView = () => {
  const { register, handleSubmit } = useForm();
  const [option, setOpt] = useState("journey");

  return (
    <div className="mx-10 my-4 mt-[96px] flex flex-col">
      <div className="m-5">
        <label>Data type: </label>
        <select
          onChange={(e) => {
            e.preventDefault();
            setOpt(e.target.value);
          }}
        >
          <option value="journey">Journey</option>
          <option value="station">Station</option>
        </select>
      </div>
      {option === "journey" ? (
        <JourneyForm handleSubmit={handleSubmit} register={register} />
      ) : (
        <StationForm />
      )}
    </div>
  );
};
