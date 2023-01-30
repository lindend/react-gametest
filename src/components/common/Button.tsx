import { MouseEventHandler } from "react";
import buttonUrl from "../../../art/board/endturnbutton_pxl.png";

interface ButtonProps {
  onClick: MouseEventHandler | undefined;
  text: string;
}

export const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button
      className="relative block w-full hover:drop-shadow-highlight"
      onClick={onClick}
    >
      <img className="w-full h-full" src={buttonUrl} />
      <div className="text-white absolute top-0 w-full h-full flex justify-center items-center">
        <span className="select-none text-4xl">{text}</span>
      </div>
    </button>
  );
};
