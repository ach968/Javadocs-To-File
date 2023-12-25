import commentBuilder from "./commentBuilder.js";
import indentGenerator from "./indentGenerator.js";

const blockBuilder = function (member, memberIndentSize) {
  let memberBuilder = "";

  if (member.querySelector(".block")) {
    memberBuilder += `${commentBuilder(
      member.querySelector(".block").text,
      memberIndentSize
    )}${indentGenerator(memberIndentSize)}*\n`;
  }

  return memberBuilder;
};

export default blockBuilder;
