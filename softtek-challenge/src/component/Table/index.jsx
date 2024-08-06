import { color } from '../../utils/custom';
import callList from '../../utils/callList.json';

import './style.css';

export const Table = () => {
  const tableHead = [
    {id: 'protocol', text: 'Protocolo'},
    {id: 'client', text: 'Cliente'},
    {id: 'createDate', text: 'Data de Abertura'},
    {id: 'status', text: 'Status'},
    {id: 'callType', text: 'Tipo de Chamado'},
    {id: 'priority', text: 'Prioridade'},
    {id: 'description', text: 'Descrição'},

  ]
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
            <h5>{item.protocol.id}</h5>
          </td>
          <td className="border bottom-2">
            <h5>{item.client.name}</h5>
            <span>{item.client.companyName}</span>
          </td>
          <td className="border bottom-2">
            <h5>{new Date(item.protocol.openingDate).toLocaleString("pt-BR", { year: 'numeric', month: 'numeric', day: 'numeric' })}</h5>
            <span>{`${new Date(item.protocol.openingDate).getHours()}:${new Date(item.protocol.openingDate).getMinutes()}`}</span>
          </td>
          <td className="border bottom-2">
            <div className='status-container'>
            <div className={`status status-${color(item.status)}`}></div>
            <h5>{item.status}</h5>
            </div>
          </td>
          <td className="border bottom-2">
            <h5>{item.callType.title}</h5>
            <span>{item.callType.description}</span>
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
    )};