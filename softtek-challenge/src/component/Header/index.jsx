import notification from '../../assets/images/notification.svg';
import { useCallList } from '../../context/useCallList';
import './style.css';

export const Header = () => {
  const { theme } = useCallList();

    return (
        <header className={`${theme === 'light' ? "background--white" : "background--dark"} padding-10-20 border radius-5`}>
        <div className="search-box">
          <input type="text" className='input-search' placeholder='Pesquisar' />
        </div>
        <div className="user-container">
          <img src={notification} alt="Notificação" />
          <div className="avatar"></div>
        </div>
      </header>
    );
}