export const Console = {
  success: <Type>(arg: Type, ...rest: unknown[]): void => {
    console.log('\u001b[' + 32 + 'm' + arg + '\u001b[0m', ...rest)
  },

  danger: <Type>(arg: Type, ...rest: unknown[]): void => {
    console.log('\u001b[' + 31 + 'm' + arg + '\u001b[0m', ...rest)
  },

  warn: <Type>(arg: Type, ...rest: unknown[]): void => {
    console.log('\u001b[' + 33 + 'm' + arg + '\u001b[0m', ...rest)
  },

  info: <Type>(arg: Type, ...rest: unknown[]): void => {
    console.log('\u001b[' + 34 + 'm' + arg + '\u001b[0m', ...rest)
  },
}
