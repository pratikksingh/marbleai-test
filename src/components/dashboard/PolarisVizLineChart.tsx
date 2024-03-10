import {
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonTabs,
} from "@shopify/polaris";
import { LineChart, PolarisVizProvider } from "@shopify/polaris-viz";
import "@shopify/polaris-viz/build/esm/styles.css";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonImage from "antd/es/skeleton/Image";

export const PolarisVizLineChart = ({ data, loading }: any) => {
  return (
    <PolarisVizProvider
      themes={{
        Light: {
          legend: {
            backgroundColor: "white",
          },
        },
      }}
    >
      <div
        style={{
          height: 400,
          marginTop: 15,
        }}
      >
        {loading ? (
          <SkeletonButton
            block
            size="large"
            style={{
              height: 250,
              borderRadius: "10px",
              backgroundColor: "rgba(227, 227, 227, 1)",
            }}
          />
        ) : (
          <LineChart data={data} theme="Light" />
        )}
      </div>
    </PolarisVizProvider>
  );
};
