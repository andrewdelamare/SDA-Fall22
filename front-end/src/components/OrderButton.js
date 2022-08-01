export const OrderButton = ({ changeOrder, order, col }) => {
  if (order === "+") {
    return (
      <button type="button" onClick={() => changeOrder(col, "+")}>
        <svg
          width="6"
          height="3"
          className="m-2 overflow-visible rotate-180"
          aria-hidden="true"
        >
          <path
            d="M0 0L3 3L6 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
    );
  } else if (order === "-") {
    return (
      <button type="button" onClick={() => changeOrder(col, "-")}>
        <svg
          width="6"
          height="3"
          className="m-2 overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M0 0L3 3L6 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
    );
  } else {
    return (
      <button type="button" onClick={() => changeOrder(col, "+")}>
        <svg
          width="6"
          height="3"
          className="m-2 overflow-visible rotate-180"
          aria-hidden="true"
        >
          <path
            d="M0 0L3 3L6 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
    );
  }
};
