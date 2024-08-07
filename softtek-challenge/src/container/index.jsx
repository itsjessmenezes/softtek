import { useState } from 'react';

import { NavBar } from '../component/NavBar';
import { Header } from '../component/Header';
import { ChartCards } from '../component/ChartCards';
import { Home } from './Home';
import { Calls } from './Calls';
import list from '../utils/callList.json'

export const App = () => {
const [page, setPage] = useState(0);
const [protocol, setProtocol] = useState();
const [callList, setCallList] = useState(list);

    return (
        <section className='home-container'>
        <NavBar page={page} setPage={setPage} />
        <main>
        <Header />
        <ChartCards />
        { page === 0 
        ? <Home 
        protocol={protocol} 
        setProtocol={setProtocol} 
        setPage={setPage} 
        page={page}
        callList={callList}
        setCallList={setCallList}
        /> 
        : <Calls protocol={protocol} setPage={setPage} setCallList={setCallList} callList={callList} /> }
        </main>
      </section>
    )
}