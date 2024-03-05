import { useEffect, useState } from 'react'

export default function App() {
  const [selectedFirstCur, setSelectedFirstCur] = useState('USD')
  const [selectedSecondCur, setSelectedSecondCur] = useState('EUR')
  const [amount, setAmount] = useState('')
  console.log(selectedSecondCur)
  const [resultAmount, setResultAmount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(
    function () {
      async function fetchCurrencies() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${selectedFirstCur}&to=${selectedSecondCur}`
          )
          const endResult = await res.json()

          setResultAmount(endResult.rates[selectedSecondCur])
        } catch (error) {
          console.error('Error fetching data:', error)
        }
        if (selectedFirstCur === selectedSecondCur)
          return setResultAmount(amount)
      }
      fetchCurrencies()
    },
    [selectedFirstCur, selectedSecondCur, amount]
  )

  return (
    <div>
      <input
        type='text'
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={selectedFirstCur}
        onChange={(e) => setSelectedFirstCur(e.target.value)}
        disabled={isLoading}
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='GBP'>GBP</option>
        <option value='TRY'>TRY</option>
      </select>
      <select
        value={selectedSecondCur}
        onChange={(e) => setSelectedSecondCur(e.target.value)}
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='GBP'>GBP</option>
        <option value='TRY'>TRY</option>
      </select>
      <p>
        {resultAmount} {selectedSecondCur}
      </p>
    </div>
  )
}
