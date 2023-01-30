import { Fragment } from "react";
import { element } from "../../../model/entities/element";
import { FireIcon } from "./FireIcon";
import { LifeIcon } from "./LifeIcon";

export interface ElementIconProps {
  e: element;
}

export const ElementIcon = ({ e }: ElementIconProps) => {
  switch (e) {
    case element.fire:
      return <FireIcon />;
    case element.life:
      return <LifeIcon />;
  }
  return <Fragment />;
};
