import { useAppSelector } from '../../hooks/useAppSelector';
import style from './player.module.css';
import { useEffect, useRef } from 'react';

export const Player = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const panel = useAppSelector(state => state.promo.panelVisible);

  //Функция для паузы видео
  const pauseVideo = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
    }
  };

  //функция для воспроизведения видео
  const playVideo = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
    }
  };

  //Управление паузой при открытии панели с промо
  useEffect(()=> {
    panel ? pauseVideo() : playVideo();
  },[panel])
  
  return (
    <iframe
      className={style.video}
      ref={iframeRef}
      width='1280px'
      height='720px'
      src='https://www.youtube.com/embed/M7FIvfx5J10?controls=0&showinfo=0&rel=0&autoplay=1&enablejsapi=1&loop=1&mute=1&playlist=M7FIvfx5J10'
      title=' '
      allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay'
      allowFullScreen
    />
  );
};
