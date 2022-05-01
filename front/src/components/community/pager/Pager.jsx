/* eslint-disable react/jsx-curly-brace-presence */

import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "../../styles/Pager.css";

const Pager = function () {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    // console.log(page);
  };
  return <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={450} pageRangeDisplayed={5} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} />;
};

export default Pager;
