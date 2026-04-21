// caesarCipher function that takes a string and a shift factor and returns it with each character “shifted”

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export function cesarCipher(string, shiftFactor) {
  let slicedFactor = alphabet.split("").slice(0, shiftFactor).join("");
  let ciphertextAlphabet =
    alphabet.split("").splice(shiftFactor).join("") + slicedFactor;

  let newString = "";

  for (let i = 0; i < string.length; i++) {
    let index = alphabet.indexOf(string[i]);
    let newChar = ciphertextAlphabet.split("")[index];
    newString += newChar;
  }

  return newString;
}
