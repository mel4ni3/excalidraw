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

  // Sync color with activeColor prop
  useEffect(() => {
    setColor(activeColor);
  }, [activeColor]);

  // Update parent with new color
  const handleColorChange = (newColor: string) => {
    if (newColor !== color) {
      setColor(newColor);
      onChange(newColor); // Pass updated color to the parent
    }
  };

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
      colors = topPicks || [];
      if (!colors.length) {
        console.error("Invalid type for TopPicks");
        return null;
      }
  }

  return (
    <>
      <div className="color-picker__top-picks">
        {/* Predefined color buttons */}
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
            onClick={() => handleColorChange(presetColor)}
            data-testid={`color-top-pick-${presetColor}`}
            aria-label={`Select ${presetColor} color`}
          >
            <div className="color-picker__button-outline" />
          </button>
        ))}

        {/* Rainbow button to trigger modal */}
        <button
          className={clsx("color-picker__button", "rainbow-button")}
          onClick={() => setShowModal(true)}
          title="Custom color"
          data-testid="color-top-pick-custom"
          aria-label="Select custom color"
        >
          <div className="color-picker__button-outline" />
        </button>
      </div>

      {/* Modal for custom color picker */}
      {showModal && (
        <div
          className="color-picker__modal-backdrop"
          onClick={() => setShowModal(false)} // Close the modal when clicking outside
          aria-hidden="true"
        >
          <div
            className="color-picker__modal"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <HexColorPicker color={color} onChange={handleColorChange} />
            <button
              className="color-picker__close"
              onClick={() => setShowModal(false)}
              aria-label="Close color picker modal"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
