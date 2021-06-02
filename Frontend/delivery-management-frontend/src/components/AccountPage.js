import React, { useState } from "react";
import AccountAndOrder from "./AccountAndOrder";



function AccountPage (props) {
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
          <AccountAndOrder/>
          
      </div>
    </div>
  );
}

export default AccountPage;
