import waferdata_testing from './testing';
import waferdata_counting from './counting';

export default function(pickMode) {
  if (pickMode == "counting") {
    this.testing = waferdata_counting;
  } else {
    this.testing = waferdata_testing;
  }
  return this;
}