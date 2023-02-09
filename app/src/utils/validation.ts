export const required = (v: any) => !!v || 'Required field.';

export const requiredAutocomplete = (v: any) => !!v.value || 'Required field.';

export const emailRule = (v: any) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(v) || 'Invalid email.';
};

export const passwordRule = (v: any) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  return (
    pattern.test(v) || 'Password must contain at least 8 characters with combination of uppercase letters, lowercase letters, and numbers.'
  );
};
