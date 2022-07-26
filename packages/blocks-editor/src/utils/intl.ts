const getLocale = () => document.documentElement.lang || (navigator.languages && navigator.languages[0]) || navigator.language || 'en-US'

export const locale = getLocale()

const messages: Record<string, { [key: string]: string}> = {
  'fr': {
    OK: 'OKAY OKAY',
  },
  'en': {
    OK: 'OK OK',
  }
};

export default messages;