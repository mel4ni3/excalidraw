import React from "react";
import { ExcalidrawElement } from "../element/types";
import "./LayersPanel.css"; // Optional for styling

type Props = {
  elements: readonly ExcalidrawElement[];
  onSelect: (elementId: string) => void;
};

export const LayersPanel: React.FC<Props> = ({ elements, onSelect }) => {
  return (
    <div className="layers-panel">
      <h3>Layers</h3>
      <ul>
        {[...elements].reverse().map((el, index) => (
          <li key={el.id} onClick={() => onSelect(el.id)}>
            {index + 1}. {el.type} ({el.id.slice(0, 4)})
          </li>
        ))}
      </ul>
    </div>
  );
};
