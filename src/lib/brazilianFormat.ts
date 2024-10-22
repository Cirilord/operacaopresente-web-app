import currency from 'currency.js'

export default function brazilianFormat(value: currency.Any) {
    return currency(value, { decimal: ',', separator: '.', symbol: 'R$ ' }).format()
}