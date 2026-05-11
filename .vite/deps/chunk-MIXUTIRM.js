// node_modules/.pnpm/@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.5__@emotion_4a5fa442b92e968c27c9123e51ce9d9a/node_modules/@mui/material/esm/utils/createSimplePaletteValueFilter.js
function hasCorrectMainProperty(obj) {
  return typeof obj.main === "string";
}
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
  if (!hasCorrectMainProperty(obj)) {
    return false;
  }
  for (const value of additionalPropertiesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== "string") {
      return false;
    }
  }
  return true;
}
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
  return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}

export {
  createSimplePaletteValueFilter
};
//# sourceMappingURL=chunk-MIXUTIRM.js.map
