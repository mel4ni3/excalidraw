import React, { useEffect, useRef } from "react";
import { t } from "../i18n";

import "./Range.scss"; // Reuse the same styling

type StrokeWidthSliderProps = {
  value: number;
  updateData: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  testId?: string;
};

export const StrokeWidthSlider = ({
  value,
  updateData,
  min = 1,
  max = 8,
  step = 1,
  testId,
}: StrokeWidthSliderProps) => {
  const rangeRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rangeRef.current && valueRef.current) {
      const rangeElement = rangeRef.current;
      const valueElement = valueRef.current;
      const inputWidth = rangeElement.offsetWidth;
      const thumbWidth = 15;
      const percentage = ((value - min) / (max - min)) * 100;
      const position = (percentage / 100) * (inputWidth - thumbWidth) + thumbWidth / 2;
      valueElement.style.left = `${position}px`;
      rangeElement.style.background = `linear-gradient(to right, var(--color-slider-track) 0%, var(--color-slider-track) ${percentage}%, var(--button-bg) ${percentage}%, var(--button-bg) 100%)`;
    }
  }, [value, min, max]);

  return (
    <label className="control-label">
      {t("labels.strokeWidth")}
      <div className="range-wrapper">
        <input
          ref={rangeRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => updateData(+e.target.value)}
          className="range-input"
          data-testid={testId}
        />
        <div className="value-bubble" ref={valueRef}>
          {value}
        </div>
        <div className="zero-label">{min}</div>
      </div>
    </label>
  );
};
