import React, {ReactNode} from "react";
import {RouteComponentProps} from "@reach/router";
import {makeStyles} from "@material-ui/core/styles";
import {size} from "../../../helpers/styling/sizes";

interface MainContentWrapperProps extends RouteComponentProps {
  children: ReactNode;
}

const useStyles = makeStyles(() => ({
  root: {
    margin: size(1),
  },
}));

const MainContentWrapper: React.FC<MainContentWrapperProps> = ({
  children,
}) => {
  const styling = useStyles();
  return <div className={styling.root}>{children}</div>;
};

export default MainContentWrapper;
