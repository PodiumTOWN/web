import { createContext, useEffect, useState } from 'react'
import { getAlgorithmData, IAlgorithmData } from '../../lib/blockchain'

interface ISettingsContext {
  blockchain: IAlgorithmData | null
}

const SettingsContext = createContext<ISettingsContext>({ blockchain: null })

const SettingsContextProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [blockchain, setBlockchain] = useState<IAlgorithmData | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getAlgorithmData()
        setBlockchain(result)
      } catch (error) {}
    }
    getData()
  }, [])

  return (
    <SettingsContext.Provider value={{ blockchain }}>{children}</SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsContextProvider }
