import { parse } from "node-html-parser";
import fetch from "node-fetch";
import readline from "readline";
import javadocsHTML from "./javadocs.js";
import { writeFile } from "fs/promises";

let global = "";
let className = "";

const getUserInput = function () {
  return new Promise((resolve, reject) => {
    // resolve reject acts as
    const read = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    read.question("URL: ", (input) => {
      if (
        input.includes("package-summary") ||
        input.includes("package-use") ||
        input.includes("package-tree") ||
        input.includes("index-files") ||
        input.includes("help-doc")
      ) {
        read.close();
        reject(new Error("< PLEASE ENTER A VALID URL! >"));
      } else {
        read.close();
        resolve(input);
      }
    });
  });
};

const getHTML = async function (inputStr) {
  try {
    const response = await fetch(inputStr);
    const html = await response.text();
    return html;
  } catch (error) {
    console.log(`Error in getHTML(): ${error}`);
  }
};

const tagList = {
  "Author:": "@author",
  "Exception:": "@exception",
  "Parameters:": "@param",
  "Returns:": "@return",
  "See Also:": "@see",
  "Specified by:": "@see",
  "Serial:": "@serial",
  "Serial Data:": "@serialData",
  "Serial Field:": "@serialField",
  "Since:": "@since",
  "Throws:": "@throws",
  "Version:": "@version",
  "Overrides:": "@override",
};

const indentGenerator = function (indentSize) {
  let indentSpaces = "";
  for (let i = 0; i < indentSize; i++) {
    indentSpaces += " ";
  }
  return indentSpaces;
};

const javadocCommentBuilder = function (input, indent) {
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

const fileBuilder = function (html) {
  const root = parse(html);
  className = root.querySelector("title").text;
  let output = "";
  if (root.getElementById("class-description")) {
    output += classBuilder(root);
  }
  if (root.getElementById("field-detail")) {
    output += fieldBuilder(root);
  }
  if (root.getElementById("constructor-detail")) {
    output += constructorBuilder(root);
  }
  if (root.getElementById("method-detail")) {
    output += methodBuilder(root);
  }
  output += "\n}";
  return output;
};

const classBuilder = function (root) {
  let classDescriptionBuilder = "";
  let classSigBuilder = "";
  const classIndentSize = 1;

  // class description

  if (root.querySelector("#class-description").querySelector(".block")) {
    const classDescGetter = root
      .querySelector("#class-description")
      .querySelector(".block").text;
    classDescriptionBuilder += `${javadocCommentBuilder(
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

const fieldBuilder = function (root) {
  let fieldBuilder = "";
  const fieldIndentSize = 2;

  const fieldGetter = root
    .querySelector("#field-detail")
    .querySelectorAll(".detail");

  for (const field of fieldGetter) {
    fieldBuilder += `${javadocCommentBuilder(
      field.querySelector(".block").text,
      fieldIndentSize
    )}${indentGenerator(fieldIndentSize)}*/\n${indentGenerator(
      fieldIndentSize - 1
    )}${field.querySelector(".member-signature").text};\n\n`;
  }
  return fieldBuilder;
};

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

const blockBuilder = function (member, memberIndentSize) {
  let memberBuilder = "";

  if (member.querySelector(".block")) {
    memberBuilder += `${javadocCommentBuilder(
      member.querySelector(".block").text,
      memberIndentSize
    )}${indentGenerator(memberIndentSize)}*\n`;
  }

  return memberBuilder;
};

const fileWriter = async function (filePath, dataToWrite) {
  try {
    // Use writeFile to create the file and write data to it
    await writeFile(filePath, dataToWrite);
    console.log("File created and data has been written successfully!");
  } catch (err) {
    console.error("Error creating or writing to file:", err);
  }
};

const main = async function () {
  // let inputStr = await getUserInput();
  try {
    let html = await getHTML(
      "https://cs300-www.cs.wisc.edu/wp/wp-content/uploads/2023/fall/p09/BusDataLoader.html"
    );
    // html = javadocsHTML;

    const root = parse(html);
    const dataToWrite = fileBuilder(html);
    const filePath = `${className}.java`;

    fileWriter(filePath, dataToWrite);
  } catch (error) {
    throw error;
  }
};

main();
