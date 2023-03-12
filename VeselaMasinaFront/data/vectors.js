const cardValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const cardNames = [
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
];

function firstNValues(n) {
  return cardValues.slice(0, n);
}

function firstNNames(n) {
  return cardNames.slice(0, n);
}

export default { firstNValues: firstNValues, firstNNames: firstNNames };
