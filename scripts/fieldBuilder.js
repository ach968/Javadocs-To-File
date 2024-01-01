import commentBuilder from "./commentBuilder.js";
import indentGenerator from "./indentGenerator.js";

const fieldBuilder = function (root) {
  let fieldBuilder = "";
  const fieldIndentSize = 2;

  const fieldGetter = root
    .querySelector("#field-detail")
    .querySelectorAll(".detail");

  for (const field of fieldGetter) {
    fieldBuilder += `${commentBuilder(
      field.querySelector(".block").text,
      fieldIndentSize
    )}${indentGenerator(fieldIndentSize)}*/\n${indentGenerator(
      fieldIndentSize - 1
    )}${field.querySelector(".member-signature").text};\n\n`;
  }
  return fieldBuilder;
};

export default fieldBuilder;
