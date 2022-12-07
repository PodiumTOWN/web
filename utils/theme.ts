import { ThemeProps } from 'flowbite-react'

const theme: ThemeProps = {
  theme: {
    button: {
      color: {
        primary: 'bg-gray-900 text-white',
        secondary: 'bg-gray-100'
      }
    },
    textInput: {
      field: {
        input: {
          colors: {
            primary: 'border-2 border-gray-200 focus:outline-none focus:border-gray-900'
          }
        }
      }
    },
    spinner: {
      color: {
        primary: 'fill-gray-600'
      }
    }
  }
}

export default theme
