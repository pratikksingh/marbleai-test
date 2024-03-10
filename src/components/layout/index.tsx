import { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {/* <Menu /> */}
      <div className="p-4 bg-white full-height">
        <Breadcrumb />
        <div className="child-container">{children}</div>
      </div>
    </div>
  );
};
