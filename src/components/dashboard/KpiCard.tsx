import React, { useCallback, useState } from "react";
import PENCIL from "../../assets/pencil.svg";
import GRAPHICON from "../../assets/graphIcon.svg";
import QUESTIONMARK from "../../assets/questionMark.svg";
import Profit from "../../assets/profit.svg";
import SkeletonButton from "antd/es/skeleton/Button";
import { Dropdown, Popover } from "antd";

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

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const content = (
    <div>
      <p>Your online store's traffic volume, shown in sessions.</p>
    </div>
  );

  const items = [
    {
      label: (
        <div className="dropdown-item">
          <img alt="graphicon" src={GRAPHICON} />
          <p>Average Order Value</p>
          <img className="questionMark" alt="questionmark" src={QUESTIONMARK} />
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className="dropdown-item">
          <img alt="graphicon" src={GRAPHICON} />
          <p>Conversion rate</p>
          <img className="questionMark" alt="questionmark" src={QUESTIONMARK} />
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div className="dropdown-item">
          <img alt="graphicon" src={GRAPHICON} />
          <p>Gross Sales</p>
          <img className="questionMark" alt="questionmark" src={QUESTIONMARK} />
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div className="dropdown-item">
          <img alt="graphicon" src={GRAPHICON} />
          <p>Net return value</p>
          <img className="questionMark" alt="questionmark" src={QUESTIONMARK} />
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <div className="dropdown-item">
          <img alt="graphicon" src={GRAPHICON} />
          <p>Store search conversion</p>
          <img className="questionMark" alt="questionmark" src={QUESTIONMARK} />
        </div>
      ),
      key: "5",
    },
    {
      label: (
        <div className="dropdown-item">
          <img alt="graphicon" src={GRAPHICON} />
          <p>Return rate</p>
          <img className="questionMark" alt="questionmark" src={QUESTIONMARK} />
        </div>
      ),
      key: "6",
    },
  ];

  const menuProps = {
    items,
  };

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
          <Popover
            placement="bottomLeft"
            content={content}
            title={title}
            trigger="hover"
          >
            <span
              onMouseEnter={togglePopoverActive}
              style={{ borderBottom: "1px dashed #CCCCCC" }}
            >
              {title}
            </span>
          </Popover>

          <div
            className="stat-figure text-secondary"
            style={{ color: colors?.fill }}
          >
            {isIcon && (
              <>
                <Dropdown
                  trigger={"click"}
                  placement="bottomLeft"
                  menu={menuProps}
                >
                  <img src={PENCIL} alt="pencil-icon" />
                </Dropdown>
              </>
            )}
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
            {formatTotal(total) || 0}
            {title === "Conversion rate" && icon}

            <span className="mx-1 text-l font-bold">
              <img
                alt="profit-icon"
                src={Profit}
                style={{ rotate: total > trend ? "0deg" : "180deg" }}
              />
              <span>{percent || 0}</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};
