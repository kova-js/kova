import React, { createContext, useContext, useReducer } from 'react'

interface ThemeAction {
  type: string
  payload: any
}

interface ThemeType {
  mode: 'light' | 'dark'
}

interface ThemeContext {
  state: ThemeType
  dispatch: React.Dispatch<ThemeAction>
}

export const ThemeContext = createContext<any>({})

function combineReducer(state: any, action: any) {
  switch (action.type) {
    case 'updateTheme':
      console.log('[SSR:updateContext]: dispatch updateContext with action')
      console.log(action)
      return { ...state, ...action.payload }
  }
  return state
}

interface ThemeProviderProps {
  children?: React.ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [state, dispatch] = useReducer(combineReducer, { mode: 'light' })

  return <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>
}

export default function useTheme() {
  const { state, dispatch } = useContext<ThemeContext>(ThemeContext)
  const setTheme = (theme: Partial<ThemeType>) => dispatch({ type: 'updateTheme', payload: theme })

  return { theme: state, setTheme }
}
