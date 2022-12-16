import { getAuth, RecaptchaVerifier } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { Modal, Button, TextInput } from 'flowbite-react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import { errorMessage, ProfileErrorCode } from '../../utils/error'
import LoaderSVG from '../../public/icons/loading.svg'
import { SettingsContext } from '../../contexts/SettingsContext/SettingsContext'

interface ISignIn {
  show: boolean
  onClose: () => void
  onRegister: () => void
}

enum SignInProvider {
  EMAIL,
  PHONE
}

export default function SignIn({ show, onClose, onRegister }: ISignIn) {
  const { blockchain } = useContext(SettingsContext)
  const [error, setError] = useState<ProfileErrorCode | null>(null)
  const [provider, setProvider] = useState<SignInProvider>(SignInProvider.PHONE)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const auth = getAuth()
  const { verifyPhoneNumber, verifyCode, signInWithEmail, createProfileFn, user } =
    useContext(AuthContext)

  useEffect(() => {
    if (show && provider === SignInProvider.PHONE) {
      try {
        ;(window as any).recaptchaVerifier = new RecaptchaVerifier(
          'sign-in-button',
          {
            size: 'invisible',
            callback: () => {
              setIsLoading(false)
            }
          },
          auth
        )
      } catch {}
    }
  }, [show, provider, auth])

  const onVerifyPhone = async () => {
    setIsLoading(true)
    try {
      await verifyPhoneNumber(phoneNumber)
      setStep(2)
    } catch (error) {
      setError(error as ProfileErrorCode)
    }
  }

  const onVerifyCode = async () => {
    try {
      setIsLoading(true)
      await verifyCode(code)
    } catch (error) {
      switch (error) {
        case ProfileErrorCode.PROFILE_NOT_FOUND:
          setError(null)
          setIsLoading(false)
          setStep(3)
          break

        default:
          setError(error as ProfileErrorCode)
          break
      }
    }
  }

  const onSignInWithEmail = async () => {
    try {
      await signInWithEmail(email, password)
    } catch (error) {
      switch (error) {
        case ProfileErrorCode.PROFILE_NOT_FOUND:
          setError(null)
          setStep(2)
          break

        default:
          setError(error as ProfileErrorCode)
          break
      }
    }
  }

  const onCreateProfile = async () => {
    try {
      if (user) {
        await createProfileFn(user.user.uid, username)
      }
    } catch (error) {
      switch (error) {
        case ProfileErrorCode.USERNAME_TAKEN:
          setError(error)
          break

        default:
          setError(error as ProfileErrorCode)
          break
      }
    }
  }

  const EmailSignIn = () => {
    switch (step) {
      case 1:
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
            <div className="flex gap-1 items-center justify-between">
              <Button
                className="whitespace-nowrap"
                disabled={isLoading || email.length < 3 || password.length < 5}
                id="sign-in-button"
                color="primary"
                onClick={onSignInWithEmail}
              >
                {isLoading && (
                  <div className="mr-2 h-4 w-4">
                    <LoaderSVG />
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

      case 2:
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <TextInput
                color="primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                required={true}
              />
            </div>
            <div className="flex gap-1 items-center justify-between">
              <Button
                disabled={isLoading || email.length < 3 || password.length < 5}
                id="sign-in-button"
                color="primary"
                onClick={onCreateProfile}
              >
                {isLoading && (
                  <div className="mr-2 h-4 w-4">
                    <LoaderSVG />
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
  }

  const PhoneSignIn = () => {
    switch (step) {
      case 1:
        return (
          <form>
            <div className="flex flex-col gap-4">
              <TextInput
                autoComplete="tel"
                name="phoneNumber"
                color="primary"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                placeholder="Phone number"
                required={true}
              />
              <div className="flex items-center justify-start">
                <div className="flex items-center justify-start">
                  <Button
                    disabled={isLoading || phoneNumber.length < 5}
                    id="sign-in-button"
                    color="primary"
                    onClick={onVerifyPhone}
                    className="whitespace-nowrap"
                  >
                    {isLoading && (
                      <div className="mr-2 h-4 w-4">
                        <LoaderSVG />
                      </div>
                    )}
                    <span>Sign in</span>
                  </Button>
                </div>
                <div className="flex justify-end flex-1">
                  <Button color="link" onClick={() => setProvider(SignInProvider.EMAIL)}>
                    Sign In using email address
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-sm text-red-700">{error && errorMessage(error)}</div>
          </form>
        )

      case 2:
        return (
          <div className="flex flex-col gap-2 ">
            <TextInput
              name="verificationCode"
              color="primary"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="number"
              placeholder="Verification code"
              required={true}
            />
            <div className="flex gap-2 items-center justify-between">
              <Button
                disabled={isLoading || code.length !== 6}
                id="sign-in-button"
                color="primary"
                onClick={onVerifyCode}
                className="whitespace-nowrap"
              >
                {isLoading && (
                  <div className="mr-2 h-4 w-4">
                    <LoaderSVG />
                  </div>
                )}
                Sign in
              </Button>
              <Button color="link" onClick={() => setProvider(SignInProvider.EMAIL)}>
                Sign In using email address
              </Button>
              <div className="text-sm text-red-700">{error && errorMessage(error)}</div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <TextInput
                color="primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                required={true}
              />
            </div>
            <div className="flex gap-1 items-center justify-between">
              <Button
                disabled={
                  isLoading || username.length < (blockchain?.minUsernameLength || 3)
                }
                id="sign-in-button"
                color="primary"
                onClick={onCreateProfile}
              >
                {isLoading && (
                  <div className="mr-2 h-4 w-4">
                    <LoaderSVG />
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

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Sign In</Modal.Header>
      <Modal.Body>
        <div className="space-y-2 p-4">{Provider()}</div>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-xs text-gray-500 flex justify-between items-center w-full gap-2">
          <span>By signing in you accept Terms of Service and Privacy Policy.</span>
          {provider === SignInProvider.EMAIL && (
            <Button color="primary" className="whitespace-nowrap" onClick={onRegister}>
              Create account
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  )
}
