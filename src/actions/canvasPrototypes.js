import React from "react";

export const ReactangleObject = payload => {
  const width = payload.ex - payload.x;
  const height = payload.ey - payload.y;

  let value = (
    <rect
      key={payload.x - payload.y}
      x={payload.x}
      y={payload.y}
      width={width}
      height={height}
      stroke="black"
      fill="transparent"
      strokeWidth="5"
    />
  );

  return Object.assign({}, { ...payload, value: value, type: "rectangle" });
};

export const circleObject = payload => {
  let value = (
    <circle
      key={payload.x - payload.y + Math.random(100)}
      cx={payload.x}
      cy={payload.y}
      r={payload.radius}
      fill="none"
      strokeWidth="1"
      stroke="black"
    />
  );
  return Object.assign({}, { ...payload, value: value, type: "circle" });
};

export const PathObject = payload => {
  let value = <path key={payload.x - payload.y + 2} d={"M" + payload.path} />;

  return Object.assign({}, { ...payload, value: value });
};
