// caesarCipher function that takes a string and a shift factor and returns it with each character “shifted”

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export function cesarCipher(string, shiftFactor) {
  let slicedFactor = alphabet.split("").slice(0, shiftFactor).join("");
  let ciphertextAlphabet =
    alphabet.split("").splice(shiftFactor).join("") + slicedFactor;

  let newString = "";

  for (let i = 0; i < string.length; i++) {
    let newChar;
    let index = alphabet.indexOf(string.toLowerCase()[i]);

    if (string[i] === string[i].toUpperCase()) {
      newChar = ciphertextAlphabet.split("")[index].toUpperCase();
    } else {
      newChar = ciphertextAlphabet.split("")[index];
    }

    newString += newChar;
  }

  return newString;
}
