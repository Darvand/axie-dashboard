import React from "react";

interface Props {
  quantity: number;
  symbol: string;
  priceUSD: number;
  size?: string;
  contrastColor?: string;
}

const Coin = ({
  quantity,
  symbol,
  priceUSD,
  size = "text-xl",
  contrastColor = "text-active",
}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-end">
        <span className={`font-bold ${size}`}>{quantity}</span>
        <span className="text-base">{symbol}</span>
      </div>
      <span className={contrastColor}>
        {(quantity * priceUSD).toFixed(2)} USD
      </span>
    </div>
  );
};

export default Coin;
