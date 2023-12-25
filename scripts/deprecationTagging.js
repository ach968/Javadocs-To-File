import indentGenerator from "./indentGenerator.js ";

const deprecationTagging = function (member, memberIndentSize, memberType) {
  let output = "";
  let substring = memberType === "constructor" ? 11 : 0;

  if (member.querySelector(".deprecation-block")) {
    output += `${indentGenerator(
      memberIndentSize - 1
    )}@Deprecated\n${indentGenerator(memberIndentSize - 1)}${member
      .querySelector(".member-signature")
      .text.replace(/\s+/g, " ")
      .substring(substring)} {\n\n${indentGenerator(
      memberIndentSize - 1
    )}}\n\n`;
  } else {
    output += `${indentGenerator(memberIndentSize - 1)}${member
      .querySelector(".member-signature")
      .text.replace(/\s+/g, " ")
      .trim()} {\n\n${indentGenerator(memberIndentSize - 1)}}\n\n`;
  }
  return output;
};

export default deprecationTagging;
