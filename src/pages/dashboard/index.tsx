import React, { useEffect, useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { IChartDatum, TTab } from "../../interfaces";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { PolarisVizLineChart } from "../../components/dashboard/PolarisVizLineChart";
import { DatePicker } from "antd";
import {
  SkeletonPage,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
} from "@shopify/polaris";
const { RangePicker } = DatePicker;
const filters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(7, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().startOf("day"),
  },
];

export type ActiveCard =
  | "ONLINE_STORE_SESSIONS"
  | "NET_RETURN_VALUE"
  | "TOTAL_ORDERS"
  | "CONVERSION_RATE";

export const Dashboard: React.FC = () => {
  const [showChart, setShowChart] = useState<boolean>(true);
  const [selectedCard, setSelectedCard] = useState<ActiveCard>(
    "ONLINE_STORE_SESSIONS"
  );
  const defaultStartDate = dayjs().subtract(7, "days").startOf("day");
  const defaultEndDate = dayjs().startOf("day");
  const [selectedDates, setSelectedDates] = useState([
    defaultStartDate,
    defaultEndDate,
  ]);

  const differenceInDays = selectedDates[1].diff(selectedDates[0], "day");

  const historicalStartDate = dayjs(selectedDates[0]).subtract(
    differenceInDays,
    "days"
  );

  const historicalEndDate = dayjs(selectedDates[1]).subtract(
    differenceInDays,
    "days"
  );

  const historicalDatesLabel = `${historicalStartDate.format(
    "MMM D"
  )}-${historicalEndDate.format("MMM D")},`;

  const selectedDateLabel = `${dayjs(selectedDates[0]).format("MMM D")}-${dayjs(
    selectedDates[1]
  ).format("MMM D")}, ${dayjs(selectedDates[1]).format("YYYY")}`;

  const { data: dailyRevenue, isLoading: dailyRevenueIsLoading } =
    useList<IChartDatum>({
      resource: "dailyRevenue",
      filters: [
        {
          field: "start",
          operator: "eq",
          value: selectedDates[0].format("ddd, DD MMM YYYY HH:mm:ss"),
        },
        {
          field: "end",
          operator: "eq",
          value: selectedDates[1].format("ddd, DD MMM YYYY HH:mm:ss"),
        },
      ],
    });

  const {
    data: dailyRevenueHistorical,
    isLoading: dailyRevenueHistoricalIsLoading,
  } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters: [
      {
        field: "start",
        operator: "eq",
        value: historicalStartDate.format("ddd, DD MMM YYYY HH:mm:ss"),
      },
      {
        field: "end",
        operator: "eq",
        value: historicalEndDate.format("ddd, DD MMM YYYY HH:mm:ss"),
      },
    ],
  });

  const { data: dailyOrders, isLoading: dailyOrdersIsLoading } =
    useList<IChartDatum>({
      resource: "dailyOrders",
      filters: [
        {
          field: "start",
          operator: "eq",
          value: selectedDates[0].format("ddd, DD MMM YYYY HH:mm:ss"),
        },
        {
          field: "end",
          operator: "eq",
          value: selectedDates[1].format("ddd, DD MMM YYYY HH:mm:ss"),
        },
      ],
    });

  const {
    data: dailyOrdersHistorical,
    isLoading: dailyOrdersHistoricalIsLoading,
  } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters: [
      {
        field: "start",
        operator: "eq",
        value: historicalStartDate.format("ddd, DD MMM YYYY HH:mm:ss"),
      },
      {
        field: "end",
        operator: "eq",
        value: historicalEndDate.format("ddd, DD MMM YYYY HH:mm:ss"),
      },
    ],
  });

  const { data: newCustomers, isLoading: newCustomersIsLoading } =
    useList<IChartDatum>({
      resource: "newCustomers",
      filters: [
        {
          field: "start",
          operator: "eq",
          value: selectedDates[0].format("ddd, DD MMM YYYY HH:mm:ss"),
        },
        {
          field: "end",
          operator: "eq",
          value: selectedDates[1].format("ddd, DD MMM YYYY HH:mm:ss"),
        },
      ],
    });

  const {
    data: newCustomersHistorical,
    isLoading: newCustomersHistoricalIsLoading,
  } = useList<IChartDatum>({
    resource: "newCustomers",
    filters: [
      {
        field: "start",
        operator: "eq",
        value: historicalStartDate.format("ddd, DD MMM YYYY HH:mm:ss"),
      },
      {
        field: "end",
        operator: "eq",
        value: historicalEndDate.format("ddd, DD MMM YYYY HH:mm:ss"),
      },
    ],
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
        key: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [d]);
  };

  const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
  const memoizedOrdersData = useMemoizedChartData(dailyOrders);
  const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

  const memoizedRevenueHistoricalData = useMemoizedChartData(
    dailyRevenueHistorical
  );
  const memoizedOrdersHistoricalData = useMemoizedChartData(
    dailyOrdersHistorical
  );
  const memoizedNewCustomersHistoricalData = useMemoizedChartData(
    newCustomersHistorical
  );

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue",
      content: (
        <ResponsiveAreaChart
          kpi="Daily revenue"
          data={memoizedRevenueData}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
    {
      id: 2,
      label: "Daily Orders",
      content: (
        <ResponsiveBarChart
          kpi="Daily orders"
          data={memoizedOrdersData}
          colors={{
            stroke: "rgb(255, 159, 64)",
            fill: "rgba(255, 159, 64, 0.7)",
          }}
        />
      ),
    },
    {
      id: 3,
      label: "New Customers",
      content: (
        <ResponsiveAreaChart
          kpi="New customers"
          data={memoizedNewCustomersData}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
  ];

  const getConfig = (activeCard: ActiveCard, isComparison: boolean = true) => {
    const configs: Record<ActiveCard, any> = {
      ONLINE_STORE_SESSIONS: [
        {
          data: memoizedRevenueData,
          color: "#4c9dd5",
          shape: "line",
          name: "something",
        },
        {
          data: memoizedRevenueHistoricalData,
          color: "#4c9dd5",
          shape: "line",
          isComparison: true,
        },
      ],

      NET_RETURN_VALUE: [
        {
          data: memoizedOrdersData,
          color: "#4c9dd5",
          shape: "line",
        },
        {
          data: memoizedOrdersHistoricalData,
          color: "#4c9dd5",
          shape: "line",
          isComparison: true,
        },
      ],
      TOTAL_ORDERS: [
        {
          data: memoizedNewCustomersData,
          color: "#4c9dd5",
          shape: "line",
        },
        {
          data: memoizedNewCustomersHistoricalData,
          color: "#4c9dd5",
          shape: "line",
          isComparison: true,
        },
      ],
      CONVERSION_RATE: [
        {
          data: memoizedNewCustomersData,
          color: "#4c9dd5",
          shape: "line",
        },
        {
          data: memoizedNewCustomersHistoricalData,
          color: "#4c9dd5",
          shape: "line",
          isComparison: true,
        },
      ],
    };
    return configs[activeCard];
  };
  const onCardSelected = (card: ActiveCard) => {
    setSelectedCard(card);
  };

  const getLoadingState = (selectedCard: ActiveCard) => {
    const loadingState: Record<ActiveCard, boolean> = {
      CONVERSION_RATE: newCustomersIsLoading || newCustomersHistoricalIsLoading,
      NET_RETURN_VALUE: dailyOrdersIsLoading || dailyOrdersHistoricalIsLoading,
      ONLINE_STORE_SESSIONS:
        dailyRevenueIsLoading || dailyRevenueHistoricalIsLoading,
      TOTAL_ORDERS: newCustomersIsLoading || newCustomersHistoricalIsLoading,
    };
    return loadingState[selectedCard];
  };

  const isLoading = getLoadingState(selectedCard);

  const polarisData = getConfig(selectedCard);

  const dateChangeHandler = (dates?: any) => {
    setSelectedDates(dates);
    const formattedDates = dates?.map((date: Date) =>
      dayjs(date).format("MMM D, YYYY")
    );
  };

  return (
    <>
      <RangePicker
        allowClear={false}
        onChange={dateChangeHandler}
        defaultValue={selectedDates}
        style={{ marginBottom: 10 }}
      />
      <Stats
        loading={isLoading}
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
        setShowChart={setShowChart}
        showChart={showChart}
        selectedCard={selectedCard}
        onCardSelected={onCardSelected}
      />
      {showChart && (
        <PolarisVizLineChart
          loading={isLoading}
          data={[
            { ...polarisData[0], name: selectedDateLabel },
            { ...polarisData[1], name: historicalDatesLabel },
          ]}
        />
      )}
    </>
  );
};

function data(value: string, index: number, array: string[]): unknown {
  throw new Error("Function not implemented.");
}
