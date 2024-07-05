import { PricingFormat } from "../models/product"

export const formatCurrency = (n: number, pricingFormat ?: PricingFormat) => {

    const currencyStr = new Intl.NumberFormat(undefined, { 
        style: 'currency', 
        currency: 'GBP',
        maximumFractionDigits: 0, 
        minimumFractionDigits: 0, 
      }).format(n)
    
    if (pricingFormat === 'UP_TO_CURRENCY') {
      return `up to ${ currencyStr }`
    } else if (pricingFormat === 'FROM_CURRENCY') {
      return `from ${ currencyStr }` 
    }

    return currencyStr
}

export const abbreviateCurrency = (n: number, pricingFormat ?: PricingFormat) => {

  const nn = () => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  }
  
  const currencyStr = nn() ?? n

  if (pricingFormat === 'UP_TO_CURRENCY') {
    return `up to £${ currencyStr }`
  } else if (pricingFormat === 'FROM_CURRENCY') {
    return `from £${ currencyStr }` 
  }

  return '£' + currencyStr 
};