import { React, useEffect, useState } from "react";
import "./MainForm.css";
import Outputs from "../Outputs/Outputs";

function MainForm() {
  const HEAT_TRANSFER_FOR_STEAL = 5;
  const HEAT_TRANSFER_FOR_WALL = 10;
  const SPECIFIC_HEAT_OF_AIR = 1;
  const SPECIFIC_HEAT_OF_WATER = 4.18;
  const TIME_RATIO_FOR_TIMER = 0.25;

  // Inputs
  const [NumberOfBirds, setNumberOfBirds] = useState(0);
  const [AmbientTempSummer, setAmbientTempSummer] = useState(0);
  const [AmbientTempWinter, setAmbientTempWinter] = useState(0);
  const [RoomTemp, setRoomTemp] = useState(0);
  const [WallsArea, setWallsArea] = useState(0);
  const [StealingArea, setStealingArea] = useState(0);
  const [DtControl, setDtControl] = useState(0);

  // Base Equation
  const [QBreath, setQBreath] = useState(0);
  const [QHLS, setQHLS] = useState(0);
  const [QHLW, setQHLW] = useState(0);
  const [QCLS, setQCLS] = useState(0);
  const [QCLW, setQCLW] = useState(0);
  const [QBLW, setQBLW] = useState(0);
  const [QBLS, setQBLS] = useState(0);
  const [QLW, setQLW] = useState(0);
  const [QLS, setQLS] = useState(0);

  // Heating Load
  const [currentTotal, setCurrentTotal] = useState(0);
  const [currentBreath, setCurrentBreath] = useState(0);
  const [KWHR, setKWHR] = useState(0);
  const [KWHRB, setKWHRB] = useState(0);
  const [mMethane, setMMethane] = useState(0);
  const [nGas, setNGas] = useState(0);
  const [MHW, setMHW] = useState(0);
  const [MHAIR, setMHAIR] = useState(0);
  const [heatR, setHeatR] = useState(0);

  // Cooling Load
  const [MCW, setMCW] = useState(0);
  const [MCAIR, setMCAIR] = useState(0);
  const [coolingR, setCoolingR] = useState(0);

  // Breathing Equipment
  const [QFan, setQFan] = useState(0);
  const [fanDia, setFanDia] = useState(0);
  const [LSAIR, setLSAIR] = useState(0);

  useEffect(() => {
    // Base Equation
    setQBreath(() => NumberOfBirds * 6);
    setQHLS(
      () =>
        HEAT_TRANSFER_FOR_STEAL * StealingArea * (RoomTemp - AmbientTempWinter)
    );
    setQHLW(
      () => HEAT_TRANSFER_FOR_WALL * WallsArea * (RoomTemp - AmbientTempWinter)
    );
    setQCLS(
      () =>
        -1 *
        HEAT_TRANSFER_FOR_STEAL *
        StealingArea *
        (RoomTemp - AmbientTempSummer)
    );
    setQCLW(
      () =>
        -1 * HEAT_TRANSFER_FOR_WALL * WallsArea * (RoomTemp - AmbientTempSummer)
    );
    setQBLW(
      () =>
        QBreath *
        (1.2 / 3600) *
        SPECIFIC_HEAT_OF_AIR *
        (RoomTemp - AmbientTempWinter) *
        1000
    );
    setQBLS(
      () =>
        -1 *
        QBreath *
        (1.2 / 3600) *
        SPECIFIC_HEAT_OF_AIR *
        (RoomTemp - AmbientTempSummer) *
        1000
    );
    setQLW(() => (QHLS + QHLW + QBLW) / 1000);
    setQLS(() => (QCLS + QCLW + QBLS) / 1000);

    // Heating Load
    setCurrentTotal(() => (QLW / 220) * 1000);
    setCurrentBreath(() => (QBLW / 220) * 1000);
    setKWHR(() => (QLW * 16) / 24);
    setKWHRB(() => (QBLW * 16) / 24);
    setMMethane(() => (QLW / 37669) * 3600 * 16);
    setNGas(() => ((QLW / (50 * Math.pow(10, 3))) * 3600 * 16) / 25);
    setMHW(() => (QLW / (SPECIFIC_HEAT_OF_WATER * 10)) * 3600);
    setMHAIR(() =>
      SPECIFIC_HEAT_OF_AIR && DtControl
        ? (QLW / (SPECIFIC_HEAT_OF_AIR * DtControl)) * 3600 * 0.83
        : 0
    );
    setHeatR(() => (QBreath ? MHAIR / QBreath - 1 : 0));

    // Cooling Load
    setMCW(() =>
      SPECIFIC_HEAT_OF_WATER ? (QLS / (SPECIFIC_HEAT_OF_WATER * 10)) * 3600 : 0
    );
    setMCAIR(() =>
      SPECIFIC_HEAT_OF_AIR && DtControl
        ? (QLS / (SPECIFIC_HEAT_OF_AIR * DtControl)) * 3600 * 0.83
        : 0
    );
    setCoolingR(() => (QBreath ? MCAIR / QBreath - 1 : 0));

    //Breathing Equipment
    setQFan(() => QBreath / TIME_RATIO_FOR_TIMER);
    setFanDia(() => 50 * Math.pow(QFan / 8000, 0.3333));
    setLSAIR(() => Math.sqrt(QFan * 0.00027) * 100);
  }, [
    NumberOfBirds,
    AmbientTempSummer,
    AmbientTempWinter,
    RoomTemp,
    WallsArea,
    StealingArea,
    DtControl,
  ]);

  let BaseEquationOutputs = [
    {
      name: "QBreath",
      value: QBreath,
    },
    {
      name: "QBLOW",
      value: QBLW,
    },
    {
      name: "QBLS",
      value: QBLS,
    },
    {
      name: "QLW",
      value: QLW,
    },
    {
      name: "QLS",
      value: QLS,
    },
  ];

  let HeatingLoadOutputs = [
    {
      name: "Current Total",
      value: currentTotal,
    },
    {
      name: "Current Total Breath",
      value: currentBreath,
    },
    {
      name: "Consumption KWHR",
      value: KWHR,
    },
    {
      name: "Consumption KWHR Breath Only",
      value: KWHRB,
    },
    {
      name: "Methan Consumption m3/day",
      value: mMethane,
    },
    {
      name: "LPG Tank / Day",
      value: nGas,
    },
    {
      name: "Hot Water Lit/HR",
      value: MHW,
    },
    {
      name: "Hot Air m3/HR",
      value: MHAIR,
    },
    {
      name: "Condtion To Breath Air",
      value: heatR,
    },
  ];

  let CoolingLoadOutputs = [
    {
      name: "Cooling Water lit/hr",
      value: MCW,
    },
    {
      name: "Cooling Air m3/hr",
      value: MCAIR,
    },
    {
      name: "Condition To Breath Air",
      value: coolingR,
    },
  ];

  let BreathingEquipementOutputs = [
    {
      name: "Fan Flow m3/h",
      value: QFan,
    },
    {
      name: "Aprox Fan Dia CM",
      value: fanDia,
    },
    {
      name: "Squared Window CM",
      value: LSAIR,
    },
  ];

  return (
    <>
      <div className="container">
        <h2>Let's Go</h2>
        <div className="wrapper">
          <div className="box">
            <input
              type="number"
              name="NumberOfBirds"
              id="numberOfBirds"
              value={NumberOfBirds ? NumberOfBirds : ""}
              onChange={(e) => setNumberOfBirds(e.target.value)}
            />
            <label for="numberOfBirds">Number Of Birds</label>
          </div>
          <div className="box">
            <input
              type="number"
              name="AmbientTempSummer"
              id="ambientTempSummer"
              value={AmbientTempSummer ? AmbientTempSummer : ""}
              onChange={(e) => setAmbientTempSummer(e.target.value)}
            />
            <label for="ambientTempSummer">Ambient Temp Summer</label>
          </div>
          <div className="box">
            <input
              type="number"
              name="AmbientTempWinter"
              id="ambientTempWinter"
              value={AmbientTempWinter ? AmbientTempWinter : ""}
              onChange={(e) => setAmbientTempWinter(e.target.value)}
            />
            <label for="ambientTempWinter">Ambient Temp Winter</label>
          </div>
        </div>
        <div className="wrapper">
          <div className="box">
            <input
              type="number"
              name="RoomTemp"
              id="roomTemp"
              value={RoomTemp ? RoomTemp : ""}
              onChange={(e) => setRoomTemp(e.target.value)}
            />
            <label for="roomTemp">Room Temp</label>
          </div>
          <div className="box">
            <input
              type="number"
              name="WallsArea"
              value={WallsArea ? WallsArea : ""}
              id="wallsArea"
              onChange={(e) => setWallsArea(e.target.value)}
            />
            <label for="wallsArea">Walls Area</label>
          </div>
          <div className="box">
            <input
              type="number"
              name="StealingArea"
              value={StealingArea ? StealingArea : ""}
              id="stealingArea"
              onChange={(e) => setStealingArea(e.target.value)}
            />
            <label for="stealingArea">Stealing Area</label>
          </div>
        </div>
        <div className="wrapper">
          <div className="box">
            <input
              type="number"
              name="DtControl"
              value={DtControl ? DtControl : ""}
              id="dtControl"
              onChange={(e) => setDtControl(e.target.value)}
            />
            <label for="dtControl">Dt Control</label>
          </div>
        </div>
      </div>
      <div className="outputs">
        <Outputs title="Base Equation Outputs" data={BaseEquationOutputs} />
        <Outputs title="Heating Load Outputs" data={HeatingLoadOutputs} />
        <Outputs title="Cooling Load Outputs" data={CoolingLoadOutputs} />
        <Outputs
          title="Breathing Equipement"
          data={BreathingEquipementOutputs}
        />
      </div>
    </>
  );
}

export default MainForm;
