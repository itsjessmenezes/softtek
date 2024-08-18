/* eslint-disable react/prop-types */
import './style.css';
import { color } from '../../utils/custom';
import axios from "axios";
import tableHead from './tableHead.json';
import { useEffect, useState } from 'react';
import { sortedCallList } from '../../utils/functions';
import { Loading } from '../../component/Loading';
import { useCallList } from '../../context/useCallList';

export const Home = ({ setProtocol, setPage, }) => {
  const { callList, setCallList, } = useCallList();
  const [loading, setLoading] = useState(null);

    const handleClickProtocol = (item) => {
        if(item.status === 'Encerrado') return;

        setPage(1);
        setProtocol(item.protocol.id);
    }
    

  const fetchCallList = async () => {
      try {
          const response = await axios.get("http://localhost:5000/api/call-list");
          console.log({response})

          if(response.data.length === callList.length) return;

          response.data.map(item =>     setCallList(prev => {
            const updatedList = [...prev, item];
            const uniqueList = updatedList.filter((item, pos, self) => 
              self.findIndex(t => t?.protocol?.id === item?.protocol?.id) === pos
            );
            const sortedList = sortedCallList(uniqueList);
            return sortedList;
          }))

      } catch (error) {
          console.error("Error fetching callList:", error);
      }
  };

    useEffect(() => {
      setLoading(true);
      const interval = setInterval(() => {
        fetchCallList();

        setLoading(false)
      }, 3000)
     
      return () => clearInterval(interval);
    }, [])

    useEffect(() => {
      if (loading !== null) {
        const hideLoading = setTimeout(() => {
          setLoading(null);
        }, 500);

        return () => clearTimeout(hideLoading);
      }
    }, [loading]);

      return (
      <section className="background--white padding-20-30 margin top-20 border radius-10">
        {loading && <Loading />}
      <table>
        <thead>
          <tr className='color--gray-font-200'>
            {tableHead.map(({id, text}) => (
            <th key={id} className="font align-start border bottom-2 padding-10-0">
              {text}
              </th>
            ))}
          </tr>
        </thead>
    
        <tbody>
          {callList.length > 0 && callList.map(item => (
            <tr key={item.protocol.id} className='table-body color--gray-font-700'>
              <td className="border bottom-2">
               <button 
               className={`border b-none bg-none ${item.status === 'Encerrado' ? 'color--gray-font-700' : ' color--purple-font-700 pointer'} font weight--weight-700 `}
               onClick={() => handleClickProtocol(item)}>
                <h4>{item.protocol.id}</h4>
                </button>
              </td>
              <td className="border bottom-2">
                <h5>{item.client.name}</h5>
                <span>{item.client.company_name}</span>
              </td>
              <td className="border bottom-2">
                <h5>{new Date(item.protocol.create_date).toLocaleString("pt-BR", { year: 'numeric', month: 'numeric', day: 'numeric' })}</h5>
                <span>{`${new Date(item.protocol.create_date).getHours()}:${new Date(item.protocol.create_date).getMinutes()}`}</span>
              </td>
              <td className="border bottom-2">
                <div className='status-container'>
                <div className={`status status-${color(item.status)}`}></div>
                <h5>{item.status}</h5>
                </div>
              </td>
              <td className="border bottom-2">
                <h5>{item.call_type.title}</h5>
                <span>{item.call_type.description}</span>
              </td>
              <td className="border bottom-2">
                <div className="priority d-flex background--gray-50">
                <span>{item.priority}</span>
                </div>
              </td>
              <td className="border bottom-2">
                <span>{item.description.slice(0, 30)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
        )
}