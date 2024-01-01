import indentGenerator from "./indentGenerator.js";

const commentBuilder = function (input, indent) {
  let output = "";

  const words = input.split(/\s+/);

  output += indentGenerator(indent - 1) + "/**\n";
  let currentLine = indentGenerator(indent) + "* ";

  for (const word of words) {
    if (currentLine.length + word.length > 97) {
      output += currentLine + "\n";
      currentLine = `${indentGenerator(indent)}* ${word} `;
    } else {
      currentLine += word + " ";
    }
  }
  output += currentLine + "\n";

  return output;
};

export default commentBuilder;
