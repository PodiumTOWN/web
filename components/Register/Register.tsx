import { UserCredential } from 'firebase/auth'
import { Button, Spinner, TextInput, Modal } from 'flowbite-react'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import { SettingsContext } from '../../contexts/SettingsContext/SettingsContext'
import { errorMessage, ProfileErrorCode } from '../../utils/error'

interface IRegister {
  show: boolean
  onClose: () => void
  onSignIn: () => void
  onRegistered: () => void
}

export default function Register({ show, onClose, onSignIn, onRegistered }: IRegister) {
  const { blockchain } = useContext(SettingsContext)
  const { createAccount, createProfileFn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ProfileErrorCode | null>(null)
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<UserCredential | null>(null)

  const onCreateAccount = async () => {
    try {
      const result = await createAccount(email, password)
      setStep(2)
      setProfile(result)
    } catch (error) {
      setError(error as ProfileErrorCode)
    }
  }

  const onCreateProfile = async () => {
    try {
      if (profile) {
        setIsLoading(true)
        await createProfileFn(profile.user.uid, username)
        setIsLoading(false)
        onRegistered()
      }
    } catch (error) {
      setIsLoading(false)
      setError(error as ProfileErrorCode)
    }
  }

  const Steps = () => {
    switch (step) {
      case 1:
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

      case 2:
        return (
          <div className="flex flex-col gap-2">
            <TextInput
              color="primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              required={true}
            />

            <Button
              disabled={
                isLoading || username.length < (blockchain?.minUsernameLength || 3)
              }
              id="sign-in-button"
              color="primary"
              onClick={onCreateProfile}
            >
              {isLoading && (
                <div className="mr-3">
                  <Spinner color="primary" size="sm" />
                </div>
              )}
              Create Profile
            </Button>
          </div>
        )
    }
  }

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Create Account</Modal.Header>
      <Modal.Body>
        <div className="space-y-2 p-4">
          {Steps()}
          <div className="text-sm text-red-700">{error && errorMessage(error)}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-xs flex justify-between items-center w-full gap-2">
          <span className="text-gray-500">
            By registering you accept Terms of Service and Privacy Policy.
          </span>
          <Button color="link" onClick={onSignIn} className="whitespace-nowrap">
            Sign In
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
