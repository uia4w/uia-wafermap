import waferdata_bincode from './bincode';
import waferdata_testing from './testing';
import waferdata_counting from './counting';

export default function(pickMode) {
  if (pickMode == "counting") {
    this.testing = waferdata_counting;
  } else if (pickMode == "bincode") {
    this.testing = waferdata_bincode;
  } else {
    this.testing = waferdata_testing;
  }
  return this;
}