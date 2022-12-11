import { ThemeProps } from 'flowbite-react'

const theme: ThemeProps = {
  theme: {
    label: {
      base: ''
    },
    button: {
      inner: {
        base: '!p-0 flex items-center'
      },
      color: {
        primary: 'bg-gray-900 text-white dark:bg-zinc-800 !px-4 !py-3 rounded-xl',
        secondary: 'bg-gray-100 dark:bg-zinc-800 !px-4 !py-3',
        link: 'ouline-none focus:border-0 focus:!ring-0 px-2'
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
    dropdown: {
      floating: {
        base: 'z-50 w-[180px] dark:bg-zinc-900'
      }
    },
    modal: {
      body: {
        base: 'md:p-4'
      },
      header: {
        base: 'flex items-center justify-between rounded-t dark:border-zinc-900 border-b p-5'
      },
      footer: {
        base: 'flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-zinc-900 border-t'
      },
      base: 'h-screen fixed top-0 z-50 w-full flex',
      show: {
        on: 'bg-gray-600 dark:bg-opacity-80 dark:bg-black bg-opacity-80 h-full'
      },
      content: {
        base: 'w-full p-2',
        inner: 'bg-white dark:bg-black z-50 relative'
      }
    }
  }
}

export default theme
