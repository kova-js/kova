import React, { FC, useEffect, useRef } from 'react'

type PlayerProps = {
  src?: string
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
          url:
            props.src ||
            'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        },
      })
    })
  }, [])

  return <div id="dplayer" ref={playerRef} />
}

export default Player
