import indentGenerator from "./indentGenerator.js";
import tagList from "./tagList.js";

const notesBuilder = function (member, memberIndentSize) {
  let memberBuilder = "";

  if (member.querySelector(".notes")) {
    let currentNote = "";
    const getElements = member.querySelector(".notes").querySelectorAll("*");

    for (const element of getElements) {
      if (element.rawTagName === "dt") {
        currentNote = element.text;
        continue;
      }
      if (element.rawTagName == "dd") {
        let codePortion = null;
        let hyphenPortion = null;
        if (element.querySelector("code")) {
          codePortion = element.querySelector("code");
          hyphenPortion = element.text.substring(
            codePortion.text.length,
            codePortion.text.length + 3
          );
        }

        // getting rid of the hyphen when formatting parameters and throw clauses, etc.
        if (
          codePortion &&
          element.text != codePortion.text &&
          hyphenPortion === " - "
        ) {
          let codePortion = element.querySelector("code").text;
          memberBuilder += `${indentGenerator(memberIndentSize)}* ${
            tagList[currentNote]
          } ${
            element.text.substring(0, codePortion.length) +
            element.text.substring(codePortion.length + memberIndentSize)
          }\n`;
        } else {
          memberBuilder += `${indentGenerator(memberIndentSize)}* ${
            tagList[currentNote]
          } ${element.text.trim()}\n`;
        }
      }
    }
    if (member.querySelector(".deprecation-comment")) {
      memberBuilder += `${indentGenerator(memberIndentSize)}* @deprecated ${
        member.querySelector(".deprecation-comment").text
      }\n`;
    }
    memberBuilder += `${indentGenerator(memberIndentSize)}*/\n`;
  } else {
    if (member.querySelector(".notes") || member.querySelector(".block"))
      memberBuilder += `${indentGenerator(memberIndentSize)}*/\n`;
  }

  return memberBuilder;
};

export default notesBuilder;
