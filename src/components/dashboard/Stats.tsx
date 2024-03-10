import React, { useState } from "react";
import { KpiCard } from "./KpiCard";
import { IChartDatum } from "../../interfaces";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { GetListResponse } from "@refinedev/core";
import BottomChev from "../../assets/BottomChev.svg";
import { ActiveCard } from "../../pages/dashboard";

type TStats = {
  showChart: boolean;
  loading: boolean;

  selectedCard: ActiveCard;
  dailyRevenue?: GetListResponse<IChartDatum>;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
  setShowChart: (value: boolean) => void;
  onCardSelected: (card: ActiveCard) => void;
};

const Stats = ({
  dailyRevenue,
  dailyOrders,
  newCustomers,
  setShowChart,
  showChart,
  onCardSelected,
  selectedCard,
  loading,
}: TStats) => {
  return (
    <div
      style={{ alignItems: "center" }}
      className="w-full mx-auto flex flex-col justify-center items-stretch md:flex-row md:justify-between"
    >
      <div className="w-full mx-auto md:flex-1 md:mr-2">
        <KpiCard
          selectedCard={selectedCard}
          loading={loading}
          isIcon={selectedCard === "ONLINE_STORE_SESSIONS" ? true : false}
          setSelectedCard={() => onCardSelected("ONLINE_STORE_SESSIONS")}
          title="Online store sessions"
          data={dailyRevenue}
          formatTotal={(value: number | string) => value}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill:
              selectedCard === "ONLINE_STORE_SESSIONS" ? "#F1F1F1" : "white",
          }}
        />
      </div>
      <div className="w-full mx-auto md:flex-1">
        <KpiCard
          selectedCard={selectedCard}
          loading={loading}
          isIcon={selectedCard === "NET_RETURN_VALUE" ? true : false}
          setSelectedCard={() => onCardSelected("NET_RETURN_VALUE")}
          icon={<p>$</p>}
          title="Net return value"
          data={dailyOrders}
          colors={{
            stroke: "rgb(255, 159, 64)",
            fill: selectedCard === "NET_RETURN_VALUE" ? "#F1F1F1" : "white",
          }}
        />
      </div>
      <div className="w-full mx-auto md:flex-1 md:ml-2">
        <KpiCard
          selectedCard={selectedCard}
          loading={loading}
          isIcon={selectedCard === "TOTAL_ORDERS" ? true : false}
          setSelectedCard={() => onCardSelected("TOTAL_ORDERS")}
          title="Total orders"
          data={newCustomers}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: selectedCard === "TOTAL_ORDERS" ? "#F1F1F1" : "white",
          }}
        />
      </div>
      <div className="w-full mx-auto md:flex-1 md:ml-2">
        <KpiCard
          selectedCard={selectedCard}
          loading={loading}
          isIcon={selectedCard === "CONVERSION_RATE" ? true : false}
          setSelectedCard={() => onCardSelected("CONVERSION_RATE")}
          title="Conversion rate"
          icon={<p>%</p>}
          data={newCustomers}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: selectedCard === "CONVERSION_RATE" ? "#F1F1F1" : "white",
          }}
        />
      </div>
      <img
        style={{ cursor: "pointer", rotate: showChart ? "-180deg" : "0deg" }}
        onClick={() => setShowChart(!showChart)}
        src={BottomChev}
        alt="bottomChev-icon"
      />
    </div>
  );
};

export default Stats;
