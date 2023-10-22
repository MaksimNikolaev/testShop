import QRCode from 'react-qr-code';
import style from './panel.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  setVisibleBaner,
  setVisiblePanel,
} from '../../services/slices/promoSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import React, { RefObject, useEffect, useState } from 'react';
import { getValidatePhone } from '../../services/actions/phone';
import { resetState } from '../../services/slices/phoneSlice';

export const Panel = () => {
  const dispatch = useAppDispatch();
  const panel = useAppSelector(state => state.promo.panelVisible);
  const validatePhone = useAppSelector(state => state.phone.validatePhone);
  const isNotValidPhone = validatePhone && !validatePhone.valid;

  const handelClosePanel = () => {
    dispatch(setVisiblePanel(false));
    setTimeout(() => {
      dispatch(setVisibleBaner(true));
    }, 5000);
  };

  const [activeElementIndex, setActiveElementIndex] = useState(0);
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState(false);
  const isValid = !checked || phone.length !== 10;
  const buttonsPerColumn = 3;
  const totalRow = 5;
  const totalButtons = buttonsPerColumn * totalRow;
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
  let maskPhone = '+7(___)___-__-__';
  for (let i = 0; i < phone.length; i++) {
    maskPhone = maskPhone.replace('_', phone[i]);
  }

  const handleClickNumber = (value: string, index: number) => {
    switch (value) {
      case 'Стереть':
        setPhone(prev => prev.slice(0, -1));
        setActiveElementIndex(9);
        dispatch(resetState());
        break;
      default:
        if (phone.length < 10) {
          setPhone(prev => prev + value);
          setActiveElementIndex(index);
        }
        break;
    }
  };

  const buttonRefs: RefObject<HTMLButtonElement>[] = Array(13)
    .fill(null)
    .map(() => React.createRef());

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setActiveElementIndex(prevIndex =>
            prevIndex - buttonsPerColumn >= 0
              ? prevIndex === 10 || prevIndex === 11
                ? prevIndex - 2
                : prevIndex === 12
                ? prevIndex - 1
                : prevIndex - buttonsPerColumn
              : prevIndex
          );
          break;
        case 'ArrowDown':
          setActiveElementIndex(prevIndex =>
            prevIndex + buttonsPerColumn < totalButtons
              ? prevIndex === 7 || prevIndex === 8 || prevIndex === 9
                ? prevIndex + 2
                : prevIndex === 10 || prevIndex === 11
                ? prevIndex + 1
                : prevIndex + buttonsPerColumn
              : prevIndex
          );
          break;
        case 'ArrowLeft':
          setActiveElementIndex(prevIndex =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
          break;
        case 'ArrowRight':
          setActiveElementIndex(prevIndex =>
            prevIndex < buttonRefs.length - 1 ? prevIndex + 1 : prevIndex
          );
          break;
        case 'Backspace':
          handleBackspace();
          dispatch(resetState());
          break;
        default:
          if (/\d/.test(e.key) && !/^(F[1-9]|F1[0-2])$/.test(e.key)) {
            handleDigitInput(e.key);
          }
          break;
      }
    };

    const handleDigitInput = (digit: string) => {
      if (phone.length < 10) {
        setPhone(prev => prev + digit);
      }
    };

    const handleBackspace = () => {
      setPhone(prev => prev.slice(0, -1));
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [activeElementIndex, buttonValues]);

  useEffect(() => {
    if (buttonRefs[activeElementIndex].current) {
      buttonRefs[activeElementIndex].current?.focus();
    }
  }, [activeElementIndex]);

  const handleConfirmPhone = () => {
    dispatch(getValidatePhone(phone));
  };

  return (
    <>
      <div className={`${style.panel} ${panel ? style.panel_visible : ''}`}>
        <h2 className={style.title}>Введите ваш номер мобильного телефона</h2>
        <p
          className={`${style.number} ${
            isNotValidPhone ? style.number_error : ''
          }`}
        >
          {maskPhone}
        </p>
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
              <button
                ref={buttonRefs[index]}
                tabIndex={index === activeElementIndex ? 0 : -1}
                className={style.number_btn}
                onClick={() => handleClickNumber(value, index)}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
        {isNotValidPhone ? (
          <p className={style.not_valid_text}>Неверно введён номер</p>
        ) : (
          <div className={style.agreement}>
            <div>
              <input
                id={'agreement'}
                type='checkbox'
                className={style.agreement_input}
                checked={checked}
                onClick={() => setChecked(!checked)}
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
        )}

        <button
          ref={buttonRefs[11]}
          tabIndex={11 === activeElementIndex ? 0 : -1}
          className={style.number_btn}
          onClick={handleConfirmPhone}
          disabled={isValid}
        >
          Подтвердить номер
        </button>
      </div>
      <button
        onClick={handelClosePanel}
        className={`${style.close} ${panel ? style.close_visible : ''}`}
        ref={buttonRefs[12]}
        tabIndex={12 === activeElementIndex ? 0 : -1}
      >
        <svg viewBox='0 0 88 52' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <line
            x1='34.3448'
            y1='14.9407'
            x2='54.6264'
            y2='35.2223'
            strokeWidth='3'
          />
          <line
            x1='33.6576'
            y1='35.2223'
            x2='53.9392'
            y2='14.9407'
            strokeWidth='3'
          />
        </svg>
      </button>

      <div className={`${style.info} ${panel ? style.info_visible : ''}`}>
        <p className={style.desc}>
          Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
        </p>
        <QRCode className={style.qr} value={'getshoptv.com'} size={94} />
      </div>
    </>
  );
};
