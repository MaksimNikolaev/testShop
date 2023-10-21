import QRCode from 'react-qr-code';
import style from './baner.module.css';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setVisibleBaner, setVisiblePanel } from '../../services/slices/promoSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

export const Baner = () => {
  const dispatch = useAppDispatch();
  const baner = useAppSelector(state => state.promo.banerVisible)

  const handleOpenPromo = () => {
    dispatch(setVisibleBaner(false));
    dispatch(setVisiblePanel(true));
  };

  useEffect(() => {
      const timer = setTimeout(() => {
        dispatch(setVisibleBaner(true));
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
  }, []);

  return (
    <div className={`${style.baner} ${baner ? style.baner_visible : ''}`}>
      <h1 className={style.title}>
        ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!<br/> ПОДАРИТЕ ЕМУ СОБАКУ!
      </h1>
      <QRCode className={style.qr} value={'getshoptv.com'} size={126} />
      <p className={style.code_text}>Сканируйте QR-код или нажмите ОК</p>
      <button onClick={handleOpenPromo} className={style.button}>OK</button>
    </div>
  );
};
