import blockBuilder from "./blockBuilder.js";
import deprecationTagging from "./deprecationTagging.js";
import notesBuilder from "./notesBuilder.js";

const constructorBuilder = function (root) {
  let constructorBuilder = "";
  const constructorIndentSize = 2;

  const constructorGetter = root
    .querySelector("#constructor-detail")
    .querySelector(".member-list")
    .querySelectorAll(".detail");
  for (const constructor of constructorGetter) {
    // constructor block
    constructorBuilder += blockBuilder(constructor, constructorIndentSize);

    // constructor notes
    constructorBuilder += notesBuilder(constructor, constructorIndentSize);

    // constructor signature
    constructorBuilder += deprecationTagging(
      constructor,
      constructorIndentSize,
      "constructor"
    );
  }
  return constructorBuilder;
};

export default constructorBuilder;
