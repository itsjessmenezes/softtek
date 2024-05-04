import home from '../../assets/images/home.svg';
import homeSelected from '../../assets/images/home-selected.svg';
import headset from '../../assets/images/headset.svg';
import headsetSelected from '../../assets/images/headset-selected.svg';
import talk from '../../assets/images/talk.svg';
import talkSelected from '../../assets/images/talk-selected.svg';


import config from '../../assets/images/config.svg';
import help from '../../assets/images/help.svg';

import './style.css';

export const NavBar = () => {
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
        {
          img: talk,
          imgSelected: talkSelected,
          title: 'Atendimento'
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
        <nav>
        <div>
          <h2 className='logo'>FIAP Engineers</h2>
          <div className='divisor'></div>

          <ul>
            {navOptions.map(({ title, img }) => (
              <li key={title}>
                <img src={img} alt={title} />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer">
          <div className="divisor"></div>

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