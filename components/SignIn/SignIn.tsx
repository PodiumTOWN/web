import { getAuth, RecaptchaVerifier } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { Modal, Button, Spinner, TextInput } from 'flowbite-react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import { errorMessage } from '../../utils/error'

interface ISignIn {
  show: boolean
  onClose: () => void
}

enum SignInProvider {
  EMAIL,
  PHONE
}

export default function SignIn({ show, onClose }: ISignIn) {
  const [error, setError] = useState<string | null>(null)
  const [provider, setProvider] = useState<SignInProvider>(SignInProvider.PHONE)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [isRegisterVisible, setIsRegisterVisible] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const auth = getAuth()
  const { verifyPhoneNumber, verifyCode, signInWithEmail, createAccount } =
    useContext(AuthContext)

  useEffect(() => {
    if (show && provider === SignInProvider.PHONE && !isRegisterVisible) {
      ;(window as any).recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
          callback: () => {
            setIsLoading(false)
            setStep(2)
          }
        },
        auth
      )
    }
  }, [auth, show, provider, isRegisterVisible])

  const onVerifyPhone = () => {
    setIsLoading(true)
    verifyPhoneNumber(phoneNumber)
  }

  const onVerifyCode = () => {
    setIsLoading(true)
    verifyCode(code)
  }

  const onSignInWithEmail = async () => {
    try {
      await signInWithEmail(email, password)
    } catch (error) {
      setError(error.code)
    }
  }

  const onCreateAccount = async () => {
    try {
      return await createAccount(email, password)
    } catch (error) {
      setError(error.code)
    }
  }

  const EmailSignIn = () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <TextInput
            color="primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            required={true}
          />
          <TextInput
            color="primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required={true}
          />
        </div>
        <div className="flex gap-1 items-center">
          <Button
            disabled={isLoading || email.length < 3 || password.length < 5}
            id="sign-in-button"
            color="primary"
            onClick={onSignInWithEmail}
          >
            {isLoading && (
              <div className="mr-3">
                <Spinner color="primary" size="sm" />
              </div>
            )}
            Sign in
          </Button>
          <Button color="link" onClick={() => setProvider(SignInProvider.PHONE)}>
            Sign In using phone number
          </Button>
        </div>
        <div className="text-sm text-red-700">{error && errorMessage(error)}</div>
      </div>
    )
  }

  const PhoneSignIn = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <TextInput
              color="primary"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              placeholder="Phone number"
              required={true}
            />
            <div className="flex gap-1 items-center">
              <Button
                disabled={isLoading || phoneNumber.length < 5}
                id="sign-in-button"
                color="primary"
                onClick={onVerifyPhone}
              >
                {isLoading && (
                  <div className="mr-3">
                    <Spinner color="primary" size="sm" />
                  </div>
                )}
                Sign in
              </Button>
              <Button color="link" onClick={() => setProvider(SignInProvider.EMAIL)}>
                Sign In using email address
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="flex flex-col gap-2">
            <TextInput
              color="primary"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="number"
              placeholder="Verification code"
              required={true}
            />
            <div className="flex gap-2 items-center">
              <Button
                disabled={isLoading || code.length !== 6}
                id="sign-in-button"
                color="primary"
                onClick={onVerifyCode}
              >
                {isLoading && (
                  <div className="mr-3">
                    <Spinner color="primary" size="sm" />
                  </div>
                )}
                Sign in
              </Button>
              <Button color="link" onClick={() => setProvider(SignInProvider.EMAIL)}>
                Sign In using email address
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const Provider = () => {
    switch (provider) {
      case SignInProvider.EMAIL:
        return EmailSignIn()

      case SignInProvider.PHONE:
        return PhoneSignIn()
    }
  }

  const Register = () => {
    return (
      <div className="flex flex-col gap-2">
        <TextInput
          color="primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          required={true}
        />
        <TextInput
          color="primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required={true}
        />
        <Button
          disabled={isLoading || email.length < 4 || password.length < 4}
          id="sign-in-button"
          color="primary"
          onClick={onCreateAccount}
        >
          {isLoading && (
            <div className="mr-3">
              <Spinner color="primary" size="sm" />
            </div>
          )}
          Create Account
        </Button>
      </div>
    )
  }

  return (
    <Modal show={show} onClose={onClose}>
      {isRegisterVisible ? (
        <>
          <Modal.Header>Create Account</Modal.Header>
          <Modal.Body>
            <div className="space-y-2">{Register()}</div>
          </Modal.Body>
          <Modal.Footer>
            <div className="text-xs text-gray-500 flex justify-between items-center w-full gap-2">
              <span>By registering you accept Terms of Service and Privacy Policy.</span>
            </div>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header>Sign In</Modal.Header>
          <Modal.Body>
            <div className="space-y-2">{Provider()}</div>
          </Modal.Body>
          <Modal.Footer>
            <div className="text-xs text-gray-500 flex justify-between items-center w-full gap-2">
              <span>By signing in you accept Terms of Service and Privacy Policy.</span>
              <Button
                color="primary"
                className="whitespace-nowrap"
                onClick={() => setIsRegisterVisible(true)}
              >
                Create account
              </Button>
            </div>
          </Modal.Footer>
        </>
      )}
    </Modal>
  )
}
