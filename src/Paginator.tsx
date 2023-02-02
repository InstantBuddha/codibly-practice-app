import React from "react";

type PaginatorProps = {
  currentPage: number;
  changeCurrentPage: (isAddition: boolean) => void;
};

function Paginator(props: PaginatorProps) {
  const LEFT_ARROW = "<--";
  const RIGHT_ARROW = "-->";
  return (
    <div>
      <button onClick={() => props.changeCurrentPage(false)}>
        {LEFT_ARROW}
      </button>
      <button onClick={() => props.changeCurrentPage(true)}>
        {RIGHT_ARROW}
      </button>
    </div>
  );
}
export default Paginator;
