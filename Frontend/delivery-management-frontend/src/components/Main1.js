import React, { useState } from "react";
import TopInfo from "./TopInfo";
// import AccountDetails from "./AccountDetails";
// import { Pagination } from 'antd'

function Main(props) {
  return (
    <div className="container_main">
      <div id="main">
          <div className="main_user">
            <div id="main_name">
              Tom</div>
            <div className="main_credits">
              <div id="remaining_credits">
                $300.00</div>
              <div>Remaining credits</div>
            </div>
            <div className="main_orders">
              <div id="total_orders">
                4</div>
              <div>Total orders</div>
            </div>
          </div>
          <TopInfo/>
          
      </div>
    </div>
  );
}

export default Main;
