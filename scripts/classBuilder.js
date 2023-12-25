import commentBuilder from "./commentBuilder.js";
import indentGenerator from "./indentGenerator.js";

const classBuilder = function (root) {
  let classDescriptionBuilder = "";
  let classSigBuilder = "";
  const classIndentSize = 1;

  // class description

  if (root.querySelector("#class-description").querySelector(".block")) {
    const classDescGetter = root
      .querySelector("#class-description")
      .querySelector(".block").text;
    classDescriptionBuilder += `${commentBuilder(
      classDescGetter,
      classIndentSize
    )}${indentGenerator(classIndentSize)}*\n`;
  }
  // class signature
  const classSigGetter = root
    .querySelector("#class-description")
    .querySelector(".type-signature")
    .text.replace(/(\r\n|\r|\n)/g, " ");

  if (classSigGetter.includes("@Deprecated")) {
    classSigBuilder += `@Deprecated\n${classSigGetter.substring(12)} {\n\n`;

    if (
      root
        .querySelector("#class-description")
        .querySelector(".deprecation-comment").text
    ) {
      let deprecatedComment = root
        .querySelector("#class-description")
        .querySelector(".deprecation-comment").text;
      classDescriptionBuilder += `${indentGenerator(
        classIndentSize
      )}* @deprecated ${deprecatedComment}\n${indentGenerator(
        classIndentSize
      )}*/\n`;
    }
  } else {
    classSigBuilder += classSigGetter + " {\n\n";
    classDescriptionBuilder += `${indentGenerator(classIndentSize)}*/\n`;
  }
  return classDescriptionBuilder + classSigBuilder;
};

export default classBuilder;
