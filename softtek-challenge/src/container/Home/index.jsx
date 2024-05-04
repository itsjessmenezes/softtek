import { NavBar } from '../../component/NavBar';
import { Header } from '../../component/Header';
import { ChartCards } from '../../component/ChartCards';
import { Table } from '../../component/Table';

import './style.css';
import '../../styles/global.css';

export const Home = () => {

    return (
        <section className='home-container'>
        <NavBar />
        <main>
          <Header />
          <ChartCards />
          <Table />
        </main>
      </section>
    );
}