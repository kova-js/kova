import { useEffect, useLayoutEffect } from 'react'

export const useEnhancedEffect = __isBrowser__ ? useLayoutEffect : useEffect
