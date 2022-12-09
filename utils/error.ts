export const errorMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'User not found.'

    default:
      return 'General error.'
  }
}
