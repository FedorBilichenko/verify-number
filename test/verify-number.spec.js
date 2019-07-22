const showroom = require('showroom/puppeteer')();
const assert = require('assert');

describe('verify-number', async () => {
  before(async () => {
    await showroom.start();
  });

  after(async () => {
    await showroom.stop();
  });

  beforeEach(async () => {
    await showroom.setTestSubject('verify-number');
  });

  it('Has upload mask', async () => {
    const TEST_MASK = '+7(985)III-**-**';
    await showroom.setAttribute('mask', TEST_MASK);
    const updatedMask = await showroom.getAttribute('mask');
    assert.equal(updatedMask, TEST_MASK);
  });

  it('Has upload iserror', async () => {
    const TEST_IS_ERROR = 'true';
    await showroom.setAttribute('iserror', TEST_IS_ERROR);
    const updatedIsError = await showroom.getAttribute('iserror');
    assert.equal(updatedIsError, TEST_IS_ERROR);
  });

  it('Has upload texterror', async () => {
    const TEST_TEXT_ERROR = 'Неправильный номер телефона, попробуйте еще';
    await showroom.setAttribute('texterror', TEST_TEXT_ERROR);
    const updatedTextError = await showroom.getAttribute('texterror');
    assert.strictEqual(updatedTextError, TEST_TEXT_ERROR);
  });

});
