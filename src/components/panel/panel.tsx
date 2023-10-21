import QRCode from 'react-qr-code';
import style from './panel.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  setVisibleBaner,
  setVisiblePanel,
} from '../../services/slices/promoSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

export const Panel = () => {
  const dispatch = useAppDispatch();
  const panel = useAppSelector(state => state.promo.panelVisible);

  const handelClosePanel = () => {
    dispatch(setVisiblePanel(false));
    setTimeout(() => {
      dispatch(setVisibleBaner(true));
    }, 5000);
  };
  const buttonValues = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'Стереть',
    '0',
  ];
  return (
    <>
      <div className={`${style.panel} ${panel ? style.panel_visible : ''}`}>
        <h2 className={style.title}>Введите ваш номер мобильного телефона</h2>
        <p className={style.number}>+7(___)___-__-__</p>
        <p className={style.text}>
          и с Вами свяжется наш менеждер для дальнейшей консультации
        </p>
        <ul className={style.number_container}>
          {buttonValues.map((value, index) => (
            <li
              key={index}
              className={`${style.list_item} ${
                index === 9 ? style.number_delete : style.number_item
              }`}
            >
              <button className={style.number_btn}>{value}</button>
            </li>
          ))}
        </ul>
        <div className={style.agreement}>
          <div>
            <input
              id={'agreement'}
              type='checkbox'
              className={style.agreement_input}
            />
            <label
              htmlFor={'agreement'}
              className={style.custom_checkbox}
            ></label>
          </div>

          <label htmlFor={'agreement'} className={style.agreement_label}>
            Согласие на обработку персональных данных
          </label>
        </div>
        <button className={style.number_btn}>Подтвердить номер</button>
      </div>
      <svg
        className={`${style.close} ${panel ? style.close_visible : ''}`}
        onClick={handelClosePanel}
        viewBox='0 0 88 52'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <line
          x1='34.3448'
          y1='14.9407'
          x2='54.6264'
          y2='35.2223'
          stroke-width='3'
        />
        <line
          x1='33.6576'
          y1='35.2223'
          x2='53.9392'
          y2='14.9407'
          stroke-width='3'
        />
      </svg>

      <div className={`${style.info} ${panel ? style.info_visible : ''}`}>
        <p className={style.desc}>
          Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
        </p>
        <QRCode className={style.qr} value={'getshoptv.com'} size={94} />
      </div>
    </>
  );
};
