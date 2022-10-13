// In terminal run node ./sanitizer.js
// In last lines of this file username and password can be assigned 


// This function takes a string as input and return string
// that does not contain any symbol that may manipulate database query

function removeSymbols(str) {
  const symbols = [`"`, `'`, "`", "=", "-", "(", ")", "{", "}", "/", "\\", ";", "@", "+", ">", "<", " ", "\n", "\t"]
  function isSymbol(character) {
    for (let i = 0; i < symbols.length; i++) if (character === symbols[i]) return true;
    return false;
  }
  let sanitized_str = "";
  for (let i = 0; i < str.length; i++)
    if (!isSymbol(str[i]))
      sanitized_str = sanitized_str + str[i];
  return sanitized_str;
}


// This function takes string as input and return string that does not contain
// any vulnerable keywords 

function removekeywords(str) {
  const keywords = ["OR", "AND", "UNION", "SELECT"]
  function removekeyword(keyword) {
    const UpperStr = str.toUpperCase()
    const index = UpperStr.search(keyword)
    if (index === -1) return str;
    const temp = str.slice(index, index + keyword.length);
    str = str.replace(temp, "");
    return removekeyword(keyword);
  }
  for (let i = 0; i < keywords.length; i++) {
    const temp = str;
    str = removekeyword(keywords[i]);
    if (temp !== str) i = -1;
  }
  return str;
}


// This function takes username and password as input and return their sanitized form
// so as to avoid SQL Attacks

function sanitizer(username, password) {
  try {

    // Throwing an error if input are not strings
    if (typeof username !== "string" || typeof password !== "string")
      throw new Error("Invalid input type");

    // Throwing an error if input are too short or too long
    if (username.length < 5 || username.length > 1000 || password.length < 6 || password.length > 1000)
      throw new Error("Username should contain around 5 to 1000 charcters and password around 6 to 1000 characters");

    // Removing Symbols
    username = removeSymbols(username);
    password = removeSymbols(password);

    // Removing Vulnerable Keywords
    username = removekeywords(username)
    password = removekeywords(password)

    // returning Sanitized data
    return { status: "ok", sanitized_data: { username, password } };
  } catch (err) {
    return { status: "Error", message: err.message };
  }
}


// sanitizater is not able to santize the following type of inputs 
const vulnerabilities = []


// Username and password can be assigned here
const username = "nikhil_mahajan";
const password = "chemical_engineering"
const result = sanitizer(username, password);
console.log(result);
