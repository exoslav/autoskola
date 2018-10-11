import React from 'react';

const translations = {
  signUp: 'Zaregistrovat se',
  signIn: 'Přihlásit se',
  signInAs: 'Přihlášený jako',
  errorWhenLogin: 'Vyskytla se chyba při přihlašování'
};

const TranslationsContext = React.createContext(translations);

export default TranslationsContext;
