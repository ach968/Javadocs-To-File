import blockBuilder from "./blockBuilder.js";
import deprecationTagging from "./deprecationTagging.js";
import indentGenerator from "./indentGenerator.js";
import notesBuilder from "./notesBuilder.js";

const methodBuilder = function (root) {
  let methodBuilder = "";
  const methodIndentSize = 2;

  const methodGetter = root
    .querySelector("#method-detail")
    .querySelector(".member-list")
    .querySelectorAll(".detail");

  for (const method of methodGetter) {
    let overriden = false;

    if (method.querySelector(".notes")) {
      const getElements = method.querySelector(".notes").querySelectorAll("*");

      for (const element of getElements) {
        if (element.text === "Overrides:") {
          overriden = true;
        }
      }
    }
    // method block
    methodBuilder += blockBuilder(method, methodIndentSize);

    // method notes
    methodBuilder += notesBuilder(method, methodIndentSize);
    // method signature
    if (overriden) {
      methodBuilder += `${indentGenerator(methodIndentSize - 1)}@Override\n`;
    }
    methodBuilder += deprecationTagging(method, methodIndentSize);
  }
  return methodBuilder;
};

export default methodBuilder;
