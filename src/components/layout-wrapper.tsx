import React from "react";
import { Wrapper, WrapperVariant } from "./wrapper";
import { NavBar } from "./nav-bar";
import { Fragment } from "react";

interface LayoutWrapperProps {
  variant?: WrapperVariant;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  variant,
}) => {
  return (
    <Fragment>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </Fragment>
  );
};
