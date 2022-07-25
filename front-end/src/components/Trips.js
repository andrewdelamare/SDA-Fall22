import { useState, useEffect } from "react";
import { Calendar } from "./Calendar";
export const Trips = () => {
  return (
    <div className="flex flex-col mt-[96px]">
      <div>
        <h2>Trips</h2>
      </div>
      <Calendar />
    </div>
  );
};
