export const Hour = ({ selectedHour, setHour, time }) => {
  const styles =
    selectedHour === time ? "text-white bg-blue-400 rounded-xl" : "";
  return (
    <button
      className={styles}
      onClick={() => setHour(time)}
    >{`${time}:00`}</button>
  );
};
