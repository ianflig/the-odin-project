// caesarCipher function that takes a string and a shift factor and returns it with each character “shifted”

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export function cesarCipher(string, shiftFactor) {
  let slicedAlphabet = sliceAlphabet(shiftFactor);
  let ciphertextAlphabet = getCipherAlphabet(shiftFactor, slicedAlphabet);

  let newString = "";

  for (let i = 0; i < string.length; i++) {
    let newChar;
    if (!isSymbol(string[i])) {
      let index = getIndex(string[i]);

      if (isUpperCase(string[i])) {
        newChar = ciphertextAlphabet.split("")[index].toUpperCase();
      } else {
        newChar = ciphertextAlphabet.split("")[index];
      }
      newString += newChar;
    } else {
      newString += string[i];
    }
  }

  return newString;
}

const sliceAlphabet = (shiftFactor) => {
  return alphabet.split("").slice(0, shiftFactor).join("");
};

const getCipherAlphabet = (shiftFactor, slicedAlphabet) => {
  return alphabet.split("").splice(shiftFactor).join("") + slicedAlphabet;
};

const getIndex = (char) => {
  return alphabet.indexOf(char.toLowerCase());
};

const isUpperCase = (char) => {
  return char === char.toUpperCase();
};

const isSymbol = (char) => {
  return !alphabet.includes(char.toLowerCase());
};
