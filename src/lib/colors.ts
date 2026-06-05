/** Logo chip colors matching the prototype's COLORS array. */
const COLORS = [
  "#FF4D17",
  "#1B3FE0",
  "#0E8A4A",
  "#7A3FF0",
  "#E0901B",
  "#0FB5C4",
  "#D23A8E",
  "#3a3d44",
];

export function chipColor(index: number): string {
  return COLORS[index % COLORS.length];
}
