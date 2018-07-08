export const InsideOfTriangle = (points, px, py) => {
  console.log(points[0]);

  const area = Math.abs(
    (points[0] * (points[3] - points[5]) +
      points[2] * (points[5] - points[1]) +
      points[4] * (points[1] - points[3])) /
      2.0
  );

  const area1 = Math.abs(
    (points[0] * (py - points[3]) +
      px * (points[3] - points[1]) +
      points[2] * (points[1] - py)) /
      2.0
  );

  const area2 = Math.abs(
    (points[0] * (py - points[5]) +
      px * (points[5] - points[1]) +
      points[4] * (points[1] - py)) /
      2.0
  );

  const area3 = Math.abs(
    (points[4] * (py - points[3]) +
      px * (points[3] - points[5]) +
      points[2] * (points[5] - py)) /
      2.0
  );

  console.log(area === area1 + area2 + area3);

  return area === area1 + area2 + area3 ? true : false;
};
