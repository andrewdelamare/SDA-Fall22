import { useState } from "react";
import { useForm } from "react-hook-form";
import { JourneyForm } from "./JourneyForm";
import { StationForm } from "./StationForm";

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
    <div className="mx-10 my-7 flex flex-col">
      <div className="m-5 flex w-fit self-center">
        <label className="mr-2">Data type:</label>
        <select
          className=" rounded"
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
