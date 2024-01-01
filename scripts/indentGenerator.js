const indentGenerator = function (indentSize) {
  let indentSpaces = "";
  for (let i = 0; i < indentSize; i++) {
    indentSpaces += " ";
  }
  return indentSpaces;
};

export default indentGenerator;
