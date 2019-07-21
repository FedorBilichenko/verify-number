const element = document.getElementsByTagName('verify-number')[0];

const attributes = {
  mask: '+7(87IIIIIII)9-I*-II',
  errortext: 'custom text',
  iserror: 'true',
  value: [],
};

const setAttributesToElement = (el, attrs) => {
  const props = Object.getOwnPropertyNames(attrs);

  props.forEach(prop => {
    el.setAttribute(prop, attrs[prop]);
  })
};

setAttributesToElement(element, attributes);

const onChange = (value) => {
  console.log(value);
  attributes.value = value;
  setAttributesToElement(element, {value: attributes.value})
};

element.addEventListener('input', (e) => onChange(e.target.value));

