import notification from '../../assets/images/notification.svg';
import './style.css';

export const Header = () => {


    return (
        <header>
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