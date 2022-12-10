export enum ProfileErrorCode {
  PROFILE_NOT_FOUND = 'profile/not-found',
  EMAIL_USED = 'auth/email-already-in-use',
  WEAK_PASSWORD = 'auth/weak-password',
  USERNAME_TAKEN = 'profile/username-taken',
  INVALID_EMAIL = 'auth/invalid-email',
  INVALID_PHONE = 'auth/invalid-phone-number'
}

export const errorMessage = (errorCode: ProfileErrorCode) => {
  switch (errorCode) {
    case ProfileErrorCode.PROFILE_NOT_FOUND:
      return 'User not found.'

    case ProfileErrorCode.EMAIL_USED:
      return 'Email already used.'

    case ProfileErrorCode.WEAK_PASSWORD:
      return 'Password too weak.'

    case ProfileErrorCode.INVALID_EMAIL:
      return 'Ivalid email address.'

    case ProfileErrorCode.INVALID_PHONE:
      return 'Ivalid phone number.'

    case ProfileErrorCode.USERNAME_TAKEN:
      return 'Username taken.'

    default:
      return 'General error.'
  }
}
