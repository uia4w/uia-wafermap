/**
 * DiePalette property.
 * 
 * @param {function} colorPicker A function to provide the color depending on the grade of the die.
 */
export default function(pickerFunc) {
  if (pickerFunc === undefined) {
    return this.colorPicker || defaultColorPicker;
  }

  this.colorPicker = pickerFunc;
  return this;
}

function defaultColorPicker(result) {
  return result == 0 ? 0x009900 : 0xff0000;
}