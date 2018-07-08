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
      stroke={payload.stroke ? payload.stroke : "black"}
      fill={payload.fill ? payload.fill : "transparent"}
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
      fill={payload.fill ? payload.fill : "transparent"}
      strokeWidth="5"
      stroke={payload.stroke ? payload.stroke : "black"}
    />
  );
  return Object.assign({}, { ...payload, value: value, type: "circle" });
};

export const LineObject = payload => {
  let value = (
    <line
      key={payload.x * Math.random(100)}
      x1={payload.x}
      x2={payload.ex}
      y1={payload.y}
      y2={payload.ey}
      stroke={payload.stroke ? payload.stroke : "black"}
      strokeWidth="5"
    />
  );

  return Object.assign({}, { ...payload, value: value });
};

export const TriangleObject = payload => {
  let value = (
    <polygon
      key={payload.x + Math.sqrt(Math.random(100))}
      points={payload.points.join(" ")}
      stroke={payload.stroke ? payload.stroke : "black"}
      fill={payload.fill ? payload.fill : "transparent"}
      strokeWidth="5"
    />
  );

  return Object.assign({}, { ...payload, value: value, type: "triangle" });
};
