import VerifyNumber from './VerifyNumber';

const VERIFY_NUMBER = 'verify-number';

if (!customElements.get(VERIFY_NUMBER)) {
  window.customElements.define(VERIFY_NUMBER, VerifyNumber);
}
