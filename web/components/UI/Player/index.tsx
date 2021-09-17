import React, { FC, useEffect, useRef } from 'react'

interface PlayerProps {
  //
}

const Player: FC<PlayerProps> = (props) => {
  const player = useRef<any>(null)
  const playerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    import('dplayer').then((module) => {
      const DPlayer = module.default
      player.current = new DPlayer({
        container: playerRef.current,
        screenshot: true,
        autoplay: false,
        video: {
          url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        },
      })
    })
    return () => {}
  }, [])

  return <div id="dplayer" ref={playerRef} />
}

export default Player
