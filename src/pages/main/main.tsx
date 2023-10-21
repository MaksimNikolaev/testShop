
import { Baner } from '../../components/baner/baner';
import { Panel } from '../../components/panel/panel';
import { Player } from '../../components/player/player';
import style from './main.module.css';

export const Main = () => {
  return (
    <div className={style.container}>
      <Player />
      <Baner />
      <Panel />
    </div>    
  );
};
