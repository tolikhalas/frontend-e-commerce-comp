import { defineRule, configure } from 'vee-validate';
import { required, min, min_value, image, mimes } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

import en from '@/locales/en.json';

configure({
  generateMessage: localize({
    en: en,
  }),
});

defineRule('required', required);
defineRule('min', min);
defineRule('min_value', min_value);
defineRule('numeric', (value) => {
  if (!value || !value.length) {
    return true;
  }
  const regex = /^(\d)*$/;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});
defineRule('image', image);
defineRule('mimes', mimes);

defineRule('text', (value) => {
  if (!value || !value.length) {
    return true;
  }
  const regex = /(\d){3,}/i;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});
defineRule('bruh', (value) => false);
