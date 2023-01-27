export enum element {
  fire,
  life,
  spirit,
  shadow,
}

type elementInfo = {
  name: string;
  icon: string;
};

const elements: { [key in element]: elementInfo } = {
  [element.fire]: {
    name: "Fire",
    icon: "fire_icon.png",
  },
  [element.life]: {
    name: "Life",
    icon: "life_icon.png",
  },
  [element.spirit]: {
    name: "Spirit",
    icon: "spirit_icon.png",
  },
  [element.shadow]: {
    name: "Shadow",
    icon: "shadow_icon.png",
  },
};

export const elementName = (element: element) => elements[element].name;
