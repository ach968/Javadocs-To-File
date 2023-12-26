import { parse } from "node-html-parser";
import fetch from "node-fetch";
import classBuilder from "./classBuilder.js";
import fieldBuilder from "./fieldBuilder.js";
import constructorBuilder from "./constructorBuilder.js";
import methodBuilder from "./methodBuilder.js";

let className;

const getHTML = async function (inputStr) {
  try {
    const response = await fetch(inputStr);
    const html = await response.text();
    return html;
  } catch (error) {
    console.log(`Error in getHTML(): ${error}`);
  }
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

const runConversion = async function (link) {
  try {
    let html = await getHTML(link);
    let output = fileBuilder(html);
    output = output.replace(/\u00a0/g, " ");
    return output;
  } catch (error) {
    throw error;
  }
};

const getClassName = async function (link) {
  let html = await getHTML(link);
  let className = parse(html).querySelector("title").text;
  return className;
};

export { runConversion, getClassName };
