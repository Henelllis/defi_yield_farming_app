import React, { useState } from "react";
import dai from "../../src/dai.png";

const Main = ({
  daiTokenBalance,
  dappTokenBalance,
  stakingBalance,
  stakeTokens,
  unStakeTokens,
}) => {
  return (
    <div id="content" className="mt-3">
      <table className="table table-borderless test-muted text-center">
        <thead>
          <tr>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{window.web3.utils.fromWei(stakingBalance, "Ether")} mDAI</td>
            <td>{window.web3.utils.fromWei(dappTokenBalance, "Ether")} Dapp</td>
          </tr>
        </tbody>
      </table>
      <div className="card mb-4">
        <div className="card-body">
          <StakeForm
            daiTokenBalance={daiTokenBalance}
            stakeTokens={stakeTokens}
          />
          <button
            type="submit"
            className="btn btn-link btn-block btn-sm"
            onClick={(event) => {
              event.preventDefault();
              unStakeTokens();
            }}
          >
            UN-STAKE...
          </button>
        </div>
      </div>
    </div>
  );
};

const StakeForm = ({ daiTokenBalance, stakeTokens }) => {
  const [stakeAmount, setStakeAmount] = useState(0);

  return (
    <form
      className="mb-3"
      onSubmit={(event) => {
        event.preventDefault();
        const amount = window.web3.utils.toWei(stakeAmount.toString(), "Ether");
        stakeTokens(amount);
      }}
    >
      <div>
        <label className="float-left">
          <b>Stake Tokens</b>
        </label>
        <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei(daiTokenBalance, "Ether")}
        </span>
      </div>
      <div className="input-group mb-4">
        <input
          type="number"
          className="form-control form-control-lg"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          required
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <img src={dai} height="32" alt="" />
            &nbsp;&nbsp;&nbsp; mDAI
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block btn-lg">
        STAKE!
      </button>
    </form>
  );
};

export default Main;
