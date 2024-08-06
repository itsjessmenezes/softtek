/* eslint-disable react/prop-types */
import './style.css';
import { color } from '../../utils/custom';
import callList from '../../utils/callList.json';
import tableHead from './tableHead.json';

export const Home = ({ setProtocol, setPage }) => {

    const handleClickProtocol = (item) => {
        if(item.status === 'Encerrado') return;

        setPage(1);
        setProtocol(item.protocol.id);
    }
      return (
      <section className="background--white padding-20-30 margin top-20 border radius-10">
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
          {callList.map(item => (
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