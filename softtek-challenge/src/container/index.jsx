import { useState } from 'react';

import { NavBar } from '../component/NavBar';
import { Header } from '../component/Header';
import { ChartCards } from '../component/ChartCards';
import { Home } from './Home';
import { Calls } from './Calls';

export const App = () => {
const [page, setPage] = useState(0);
const [protocol, setProtocol] = useState();

    return (
        <section className='home-container'>
        <NavBar page={page} setPage={setPage} />
        <main>
        <Header />
        <ChartCards />
        { page === 0 ? <Home protocol={protocol} setProtocol={setProtocol} setPage={setPage} page={page} /> : <Calls protocol={protocol} /> }
        </main>
      </section>
    )
}