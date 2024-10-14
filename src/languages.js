const languages = {
  Marathi: { startCode: 0x0905, endCode: 0x0939 }, // Unicode range for Marathi
  Telugu: { startCode: 0x0C05, endCode: 0x0C39 }, // Unicode range for Telugu
  Kannada: { startCode: 0x0C85, endCode: 0x0CB9 }, // Unicode range for Kannada
  Tamil: { startCode: 0x0B85, endCode: 0x0BB9 }, // Unicode range for Tamil
  Malayalam: { startCode: 0x0D05, endCode: 0x0D39 }, // Unicode range for Malayalam
  Gujarati: { startCode: 0x0A85, endCode: 0x0AB9 }, // Unicode range for Gujarati
  Bengali: { startCode: 0x0985, endCode: 0x09B9 }, // Unicode range for Bengali
  Punjabi: { startCode: 0x0A05, endCode: 0x0A39 }, // Unicode range for Punjabi
};

// Function to generate UTF-16 strings for a given range
function generateUtf16Strings(startCode, endCode) {
  const utf16Strings = [];
  for (let code = startCode; code <= endCode; code++) {
    utf16Strings.push(String.fromCharCode(code));
  }
  return utf16Strings;
}

export { languages, generateUtf16Strings };