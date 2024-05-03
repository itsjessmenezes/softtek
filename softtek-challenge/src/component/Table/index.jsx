import { callList, color } from '../../utils/custom';
import './style.css';

export const Table = () => (
  <section className="table-container">
  <table>
    <thead>
      <tr>
        <th>Protocolo</th>
        <th>Cliente</th>
        <th>Data de Abertura</th>
        <th>Status</th>
        <th>Tipo de Chamado</th>
        <th>Prioridade</th>
        <th>Descrição</th>
      </tr>
    </thead>
    <tbody>
      {callList.map(item => (
        <tr key={item.protocol.id} className='table-body'>
          <td>
            <h3>{item.protocol.id}</h3>
          </td>
          <td>
            <h3>{item.client.name}</h3>
            <span>{item.client.companyName}</span>
          </td>
          <td>
            <h3>{new Date(item.protocol.openingDate).toLocaleString("pt-BR", { year: 'numeric', month: 'numeric', day: 'numeric' })}</h3>
            <span>{`${new Date(item.protocol.openingDate).getHours()}:${new Date(item.protocol.openingDate).getMinutes()}`}</span>
          </td>
          <td>
            <div className='status-container'>
            <div className={`status status-${color(item.status)}`}></div>
            <h3>{item.status}</h3>
            </div>
          </td>
          <td>
            <h3>{item.callType.title}</h3>
            <span>{item.callType.description}</span>
          </td>
          <td>
            <div className="priority">
            <span>{item.priority}</span>
            </div>
          </td>
          <td>
            <span>{item.description}</span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</section>
    );