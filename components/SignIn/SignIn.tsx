import { getAuth, RecaptchaVerifier } from 'firebase/auth'
import { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'

export default function SignIn() {
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const auth = getAuth()
  const { verifyPhone, verifyCode } = useContext(AuthContext)

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible'
      },
      auth
    )
  }, [auth])

  const onVerifyPhone = () => {
    setStep(2)
    verifyPhone(phoneNumber)
  }

  const onVerifyCode = () => {
    verifyCode(code)
  }

  const Steps = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              className="p-2 bg-gray-100 w-full rounded-xl border-2 focus:border-black border-transparent outline-none"
              type="tel"
            />
            <button
              id="sign-in-button"
              onClick={onVerifyPhone}
              className="py-3 px-4 bg-gray-900 text-white rounded-xl"
            >
              Sign In
            </button>
          </>
        )

      case 2:
        return (
          <>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Verification Code"
              className="p-2 bg-gray-100 w-full rounded-xl border-2 focus:border-black border-transparent outline-none"
              type="text"
            />
            <button
              id="sign-in-button"
              onClick={onVerifyCode}
              className="py-3 px-4 bg-gray-900 text-white rounded-xl"
            >
              Sign In
            </button>
          </>
        )

      default:
        return null
    }
  }

  return <div className="md:px-16 py-4 md:py-6 flex flex-col gap-4">{Steps()}</div>
}
