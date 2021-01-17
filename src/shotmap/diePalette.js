/**
 * DiePalette property.
 * 
 * @param {function} colorPicker A function to provide the color depending on the grade of the die.
 */
export default function(pickerFunc) {
    if(pickerFunc === undefined) {
        return this.colorPicker || defaultColorPicker;
    } else {
        this.colorPicker = pickerFunc;
        return this;
    }
  }
  
  function defaultColorPicker(grade) {
    if(grade === 'd') {
      return "yellow";
    }
    if(grade === 'e') {
      return "yellow";
    }
    if(grade === 'f') {
      return "red";
    }
    if(grade === 'g') {
      return "yellow";
    }
    if(grade === undefined) {
      return 'none';
    }
    return 'green';
  }
  