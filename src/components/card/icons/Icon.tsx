export interface IconProps {
  url: string;
}

export const Icon = ({ url }: IconProps) => {
  return <img src={url} draggable="false" className="h-4 w-4" />;
};
