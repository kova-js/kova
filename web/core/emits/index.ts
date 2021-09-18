import mitt, { Emitter as MittEmitter } from 'mitt'
export const emitter: MittEmitter<Record<string, any>> = mitt()

if (__isBrowser__) {
  emitter.on('layout', () => {
    console.log('layout')
  })
  emitter.on('page', () => {
    console.log('page')
  })
}
