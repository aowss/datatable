import validator from 'validator'

const validators = new Map()
validators.set('email', validator.default.isEmail)
validators.set('date', validator.default.isDate)
validators.set('ABA routing', validator.default.isAbaRouting)
// validators.set('Base64 encoded', validator.default.isBase64)
validators.set('BIC/Swift code', validator.default.isBIC)
validators.set('BTC address', validator.default.isBtcAddress)
validators.set('Credit card', validator.default.isCreditCard)
validators.set('Currency', validator.default.isCurrency)
validators.set('EAN', validator.default.isEAN)
validators.set('Ethereum Address', validator.default.isEthereumAddress)
validators.set(
  'Color',
  (value) => validator.default.isHexColor(value) || validator.default.isHSL(value)
)
validators.set('IBAN', validator.default.isIBAN)
validators.set('IMEI', validator.default.isIMEI)
validators.set('IP', (value) => validator.default.isIP(value) || validator.default.isIPRange(value))
validators.set('ISBN', validator.default.isISBN)
validators.set('ISIN', validator.default.isISIN)
validators.set('Language', validator.default.isISO6391)
validators.set(
  'Country',
  (value) => validator.default.isISO31661Alpha2(value) || validator.default.isISO31661Alpha3(value)
)
validators.set('Currency', validator.default.isISO4217)

export const typesHint = (values) => {
  const input = values instanceof Set ? Array.from(values) : values
  return Array.from(new Set(input.map((v) => typeof v))).join(', ')
}

export const formatHints = (values) => {
  const input = values instanceof Set ? Array.from(values) : values
  return Array.from(new Set(input.flatMap(formatHint)))
    .sort()
    .join(', ')
}

const formatHint = (value) => {
  const hints = []
  for (let [hint, validator] of validators.entries()) {
    try {
      if (value && validator('' + value)) {
        hints.push(hint)
      }
    } catch (error) {
      // console.error(`Error trying to figure out the format of ${value}: ${error.message}`)
    }
  }
  if (hints.length === 0) hints.push('n/a')
  return hints
}

export const validateAll = (values, validationFunction) => {
  console.log('validateAll', values, validationFunction)
  if (!validationFunction) return new Set()
  const input = values instanceof Set ? Array.from(values) : values
  const validateValue = validate(validationFunction)
  return input.map(validateValue)
}

const validate = (validationFunction) => (value) => validationFunction.apply(value)
