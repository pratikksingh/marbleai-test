import React, { useCallback, useState } from "react";
import PENCIL from "../../assets/pencil.svg";
import Profit from "../../assets/profit.svg";
import SkeletonButton from "antd/es/skeleton/Button";
import { ActionList, AppProvider, Popover } from "@shopify/polaris";

type TKpiCardProps = {
  title: string;
  data: any;
  colors: {
    stroke: string;
    fill: string;
  };
  loading: boolean;
  icon?: JSX.Element;
  selectedCard: string;

  setSelectedCard: (value: string) => void;
  isIcon: boolean;
  formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
  title,
  data,
  icon,
  colors,
  loading,
  setSelectedCard,
  isIcon,
  selectedCard,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const total = data?.data?.total;
  const trend = data?.data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? ` ${calc}%` : `- ${calc}%`;
  const [popoverActive, setPopoverActive] = useState(true);

  console.log("popoverActive", popoverActive);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  console.log("selectedCard", selectedCard);

  return (
    <div
      className="stat my-2 py-4 flex-1 rounded main"
      style={{
        backgroundColor: loading ? "rgb(241, 241, 241)" : colors.fill,
        borderRadius: 10,
      }}
      onClick={() => setSelectedCard(title)}
    >
      {loading ? (
        <SkeletonButton
          block
          size="small"
          style={{
            borderRadius: "2px",
            height: 20,
            width: "70%",
            backgroundColor: "rgba(227, 227, 227, 1)",
          }}
        />
      ) : (
        <div className="stat-title text-l">
          <span
            onMouseEnter={togglePopoverActive}
            style={{ borderBottom: "1px dashed #CCCCCC" }}
          >
            {title}
          </span>

          <div
            className="stat-figure text-secondary"
            style={{ color: colors?.fill }}
          >
            {isIcon && <img src={PENCIL} alt="pencil-icon" />}
          </div>
        </div>
      )}
      <div className="stat-value">
        {loading ? (
          <SkeletonButton
            block
            size="large"
            style={{
              width: "90%",
              borderRadius: "2px",
              height: 20,
              backgroundColor: "rgba(227, 227, 227, 1)",
              marginLeft: "0px",
            }}
          />
        ) : (
          <>
            {title !== "Conversion rate" && icon}
            {formatTotal(total)}
            {title === "Conversion rate" && icon}

            <span className="mx-1 text-l font-bold">
              <img
                alt="profit-icon"
                src={Profit}
                style={{ rotate: total > trend ? "0deg" : "180deg" }}
              />
              <span>{percent}</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};
