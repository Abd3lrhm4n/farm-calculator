import React from "react";
import "./Constant.css";

function Constant() {
  return (
    <div>
      <h1 className="contants-header">
        Constants
      </h1>
      <div className="constants-container">
        <div>
          <div className="res-circle">
            <div className="circle-txt">HS</div>
          </div>
          <span>5</span>
        </div>
        <div>
          <div className="res-circle">
            <div className="circle-txt">HW</div>
          </div>
          <span>10</span>
        </div>
        <div>
          <div className="res-circle">
            <div className="circle-txt">CAIR</div>
          </div>
          <span>1</span>
        </div>
        <div>
          <div className="res-circle">
            <div className="circle-txt">CW</div>
          </div>
          <span>4.18</span>
        </div>
        <div>
          <div className="res-circle">
            <div className="circle-txt">TR</div>
          </div>
          <span>1/4</span>
        </div>
      </div>
    </div>
  );
}

export default Constant;
