import clsx from "clsx";
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";

import {
  COLOR_OUTLINE_CONTRAST_THRESHOLD,
  DEFAULT_CANVAS_BACKGROUND_PICKS,
  DEFAULT_ELEMENT_BACKGROUND_PICKS,
  DEFAULT_ELEMENT_STROKE_PICKS,
} from "@excalidraw/common";

import { isColorDark } from "./colorPickerUtils";

import type { ColorPickerType } from "./colorPickerUtils";

interface TopPicksProps {
  onChange: (color: string) => void;
  type: ColorPickerType;
  activeColor: string;
  topPicks?: readonly string[];
}

export const TopPicks = ({
  onChange,
  type,
  activeColor,
  topPicks,
}: TopPicksProps) => {
  const [showModal, setShowModal] = useState(false);
  const [color, setColor] = useState(activeColor);

  useEffect(() => {
    setColor(activeColor);
  }, [activeColor]);

  useEffect(() => {
    onChange(color);
  }, [color]);

  let colors;
  switch (type) {
    case "elementStroke":
      colors = DEFAULT_ELEMENT_STROKE_PICKS;
      break;
    case "elementBackground":
      colors = DEFAULT_ELEMENT_BACKGROUND_PICKS;
      break;
    case "canvasBackground":
      colors = DEFAULT_CANVAS_BACKGROUND_PICKS;
      break;
    default:
      if (topPicks) {
        colors = topPicks;
      } else {
        console.error("Invalid type for TopPicks");
        return null;
      }
  }

  return (
    <>
      <div className="color-picker__top-picks">
        {colors.map((presetColor: string) => (
          <button
            className={clsx("color-picker__button", {
              active: presetColor === activeColor,
              "is-transparent": presetColor === "transparent" || !presetColor,
              "has-outline": !isColorDark(
                presetColor,
                COLOR_OUTLINE_CONTRAST_THRESHOLD
              ),
            })}
            style={{ "--swatch-color": presetColor }}
            key={presetColor}
            type="button"
            title={presetColor}
            onClick={() => onChange(presetColor)}
            data-testid={`color-top-pick-${presetColor}`}
          >
            <div className="color-picker__button-outline" />
          </button>
        ))}

        <button
          className={clsx("color-picker__button", "rainbow-button")}
          onClick={() => setShowModal(true)}
          title="Custom color"
          data-testid="color-top-pick-custom"
        >
          <div className="color-picker__button-outline" />
        </button>

      </div>

      {showModal && (
        <div className="color-picker__modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="color-picker__modal"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
          >
            <HexColorPicker color={color} onChange={setColor} />
            <button
              className="color-picker__close"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
