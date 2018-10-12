import React from 'react';

const translations = {
  signUp: 'Zaregistrovat se',
  signIn: 'Přihlásit se',
  signInAs: 'Přihlášený jako',
  errorWhenSignIn: 'Vyskytla se chyba při přihlašování',
  errorWhenSignUp: 'Vyskytla se chyba při registraci'
};

const TranslationsContext = React.createContext(translations);

export default TranslationsContext;
