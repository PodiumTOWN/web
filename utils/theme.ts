import { ThemeProps } from 'flowbite-react'

const theme: ThemeProps = {
  theme: {
    button: {
      color: {
        primary: 'bg-gray-900 text-white dark:bg-zinc-800',
        secondary: 'bg-gray-100 dark:bg-zinc-800',
        link: 'ouline-none focus:border-0 focus:!ring-0'
      }
    },
    textarea: {
      colors: {
        primary:
          'dark:text-white border-2 border-gray-200 dark:border-zinc-900 outline-none focus:border-zinc-100 dark:bg-zinc-900 focus:ring-2 focus:ring-black dark:focus:ring-zinc-700'
      }
    },
    textInput: {
      field: {
        input: {
          colors: {
            primary:
              'dark:text-white border-2 border-gray-200 dark:border-zinc-900 outline-none focus:border-zinc-100 dark:bg-zinc-900 focus:ring-2 focus:ring-black dark:focus:ring-zinc-700'
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
      base: 'h-screen fixed top-0 z-50 w-full flex',
      show: {
        on: 'bg-gray-600 dark:bg-opacity-80 dark:bg-black bg-opacity-80 h-full'
      },
      content: {
        inner: 'bg-white dark:bg-black'
      }
    }
  }
}

export default theme
