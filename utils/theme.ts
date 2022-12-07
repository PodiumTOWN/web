import { ThemeProps } from 'flowbite-react'

const theme: ThemeProps = {
  theme: {
    button: {
      color: {
        primary: 'bg-gray-900 text-white dark:bg-gray-800',
        secondary: 'bg-gray-100 dark:bg-gray-800'
      }
    },
    textInput: {
      field: {
        input: {
          colors: {
            primary:
              'dark:text-white border-2 border-gray-200 dark:border-gray-800 focus:outline-none focus:border-zinc-100 dark:bg-zinc-900'
          }
        }
      }
    },
    spinner: {
      color: {
        primary: 'fill-gray-600'
      }
    },
    modal: {
      show: {
        on: 'bg-gray-400 bg-opacity-50 dark:bg-zinc-900 dark:bg-opacity-10'
      },
      content: {
        inner: 'bg-white dark:bg-black'
      }
    }
  }
}

export default theme
