const element = document.getElementsByTagName('verify-number')[0];

interface IAttributes {
  mask: string;
  errortext: string;
  iserror: string;
  value: Array<string>;
}

const attributes: IAttributes = {
  mask: '+7(985)III-II-I*',
  errortext: 'Неправильный пароль, попробуйте изменить',
  iserror: 'false',
  value: [],
};

const setAttributesToElement = (el: Element, attrs: object) => {
  const props = Object.getOwnPropertyNames(attrs);

  props.forEach(prop => {
    el.setAttribute(prop, attrs[prop]);
  });
};

window.customElements.whenDefined('verify-number').then(() => {
  setAttributesToElement(element, attributes);

  const onChange = value => {
    attributes.value = value;
    setAttributesToElement(element, { value: attributes.value });
  };

  // @ts-ignore
  element.addEventListener('input', (e: Event) => onChange(e.target.value));
});
