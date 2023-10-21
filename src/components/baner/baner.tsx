import QRCode from 'react-qr-code';
import style from './baner.module.css';
import { useEffect, useState } from 'react';

export const Baner = () => {  
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
  }, []);

  return (
    <div className={`${style.baner} ${showBanner ? style.baner_visible : ''}`}>
      <h1 className={style.title}>
        ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! ПОДАРИТЕ ЕМУ СОБАКУ!
      </h1>
      <QRCode className={style.qr} value={'getshoptv.com'} size={126} />
      <p className={style.code_text}>Сканируйте QR-код или нажмите ОК</p>
      <button className={style.button}>OK</button>
    </div>
  );
};
