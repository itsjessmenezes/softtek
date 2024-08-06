import home from '../../assets/images/home.svg';
import homeSelected from '../../assets/images/home-selected.svg';
import headset from '../../assets/images/headset.svg';
import headsetSelected from '../../assets/images/headset-selected.svg';

import config from '../../assets/images/config.svg';
import help from '../../assets/images/help.svg';

import './style.css';

// eslint-disable-next-line react/prop-types
export const NavBar = ({ page, setPage }) => {
    const navOptions = [
        {
          img: home,
          imgSelected: homeSelected,
          title: 'Home'
        },
        {
          img: headset,
          imgSelected: headsetSelected,
          title: 'Chamados'
        },
      ];

      
    const navFooterOptions = [
        {
          img: config,
          title: 'Configurações'
        },
        {
          img: help,
          title: 'Ajuda'
        },
      ];

    return (
      <nav className='background--white'>
        <div className='d-flex column align-center gap-10'>
          <h2 className='logo'>FIAP Engineers</h2>
          <div className='divisor background--gray-font-200'></div>
          <ul className='d-flex column gap-10'>
            {navOptions.map(({ title, img, imgSelected }) => (
              <li
              className={page === (title === 'Home' ? 0 : 1) ? 'selected color--purple-font-500' : ''}
              key={title}
              onClick={() => title === 'Home' ? setPage(0) : setPage(1)}>
                <img 
                 src={page === (title === 'Home' ? 0 : 1) ? imgSelected : img} 
                 alt={title} />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer">
          <div className="divisor background--gray-font-200"></div>

          <ul>
            {navFooterOptions.map(({ title, img }) => (
              <li key={title}>
                <img src={img} alt={title} />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
}