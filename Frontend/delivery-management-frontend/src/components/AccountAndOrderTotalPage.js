import React, { useState, useEffect } from "react";
import AccountAndOrder from "./AccountAndOrder";
import { ID_KEY } from '../constants';
import { getAccountInfo } from '../utils';


function AccountAndOrderTotalPage(props) {
  const { state } = props.location
  const tabKey = state.tabKey

  const [data, setData] = useState()
  const [isDataRetrieved, setDataRetrieved] = useState(false)

  // axios fetch user data, render below
  useEffect(() => {
    getAccountInfo(localStorage.getItem(ID_KEY))
      .then((res) => {
        console.log(res)
        setData(res.data)
        setDataRetrieved(true)
      })
      .catch((err) => {
        console.log('Get account detail fail! ')

      })
  }, [])
  
  return (
    <div id="account">
      <div className="account-bkg-panel">
        <div className="main-user">
          <div id="main-name">
            {isDataRetrieved ? data.firstName : null}
          </div>
          <div className="main-credits">
            <div id="remaining-credits">
              {isDataRetrieved ? data.credits : null}</div>
            <div>Remaining credits</div>
          </div>
          <div className="main-orders">
            <div id="total-orders">
              {isDataRetrieved ? data.ecoOrders.length : null}</div>
            <div>Total orders</div>
          </div>
        </div>
        <AccountAndOrder tabKey={tabKey} />

      </div>
    </div>
  );
}

export default AccountAndOrderTotalPage;
