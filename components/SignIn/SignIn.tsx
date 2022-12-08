import { getAuth, RecaptchaVerifier } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { Modal, Button, Spinner, TextInput } from 'flowbite-react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const auth = getAuth()
  const { verifyPhoneNumber, verifyCode } = useContext(AuthContext)

  useEffect(() => {
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
  }, [auth])

  const onVerifyPhone = () => {
    setIsLoading(true)
    verifyPhoneNumber(phoneNumber)
  }

  const onVerifyCode = () => {
    setIsLoading(true)
    verifyCode(code)
  }

  const onShowModal = () => {
    setIsModalVisible(true)
  }

  const onCloseModal = () => {
    setIsModalVisible(false)
  }

  const Steps = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextInput
              color="primary"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="Phone number"
              required={true}
            />
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
          </>
        )

      case 2:
        return (
          <>
            <TextInput
              color="primary"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="number"
              placeholder="Verification code"
              required={true}
            />
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
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="md:px-16 py-4 md:py-6">
      <div className="hidden md:flex md:flex-col md:gap-4">{Steps()}</div>
      <div className="flex md:hidden">
        <Button color="primary" onClick={onShowModal}>
          Sign in
        </Button>
      </div>
      <Modal show={isModalVisible} onClose={onCloseModal}>
        <Modal.Header>Sign In</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">{Steps()}</div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
