import { Fragment } from "react";
import { ElementType } from "../../../model/entities/element";
import { FireIcon } from "./FireIcon";
import { LifeIcon } from "./LifeIcon";

export interface ElementIconProps {
  e: ElementType;
}

export const ElementIcon = ({ e }: ElementIconProps) => {
  switch (e) {
    case ElementType.fire:
      return <FireIcon />;
    case ElementType.life:
      return <LifeIcon />;
  }
  return <Fragment />;
};
