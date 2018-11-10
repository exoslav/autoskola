import React from 'react';

const translations = {
  signUp: 'Zaregistrovat se',
  signIn: 'Přihlásit se',
  errorWhenSignIn: 'Chyba při přihlašování',
  errorWhenSignUp: 'Chyba při registraci'
};

const TranslationsContext = React.createContext(translations);

export default TranslationsContext;
