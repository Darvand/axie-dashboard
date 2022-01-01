import React, { useState } from "react";

interface Props {}

const Axie = (props: Props) => {
  const [energy, setEnergy] = useState(3);
  const [round, setRound] = useState(1);
  return (
    <div className="w-full flex justify-center items-center flex-col p-12 gap-4">
      <div className="flex text-primary-text text-lg gap-1">
        <span>Ronda: </span>
        <span>{round}</span>
      </div>
      <div className="flex text-primary-text text-lg gap-1">
        <span>Energia: </span>
        <span>{energy}</span>
      </div>
      <div>
        <button
          className="border border-active text-active text-sm px-3 w-36 rounded h-8"
          onClick={() => setEnergy(energy + 1)}
        >
          +
        </button>
        <button
          className="border border-active text-active text-sm px-3 w-36 rounded h-8"
          onClick={() => setEnergy(energy - 1)}
        >
          -
        </button>
        <div>
          <button
            className="border border-active text-active text-sm px-3 w-36 rounded h-8"
            onClick={() => {
              setRound(round + 1);
              setEnergy(energy + 2);
            }}
          >
            Siguiente ronda
          </button>
          <button
            className="border border-active text-active text-sm px-3 w-36 rounded h-8"
            onClick={() => {
              setRound(1);
              setEnergy(3);
            }}
          >
            Nuevo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Axie;
