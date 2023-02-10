export enum ElementType {
  fire,
  life,
  spirit,
  shadow,
}

type ElementInfo = {
  name: string;
  icon: string;
};

const elements: { [key in ElementType]: ElementInfo } = {
  [ElementType.fire]: {
    name: "Fire",
    icon: "fire_icon.png",
  },
  [ElementType.life]: {
    name: "Life",
    icon: "life_icon.png",
  },
  [ElementType.spirit]: {
    name: "Spirit",
    icon: "spirit_icon.png",
  },
  [ElementType.shadow]: {
    name: "Shadow",
    icon: "shadow_icon.png",
  },
};

export const elementName = (element: ElementType) => elements[element].name;
