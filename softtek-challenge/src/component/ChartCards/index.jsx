import { findCallServiceByStatus, findCallServiceFromOpenAndClose, verifyServices } from '../../utils/custom';
import '../../styles/global.scss';
import './style.css';
import { useCallList } from '../../context/useCallList';
import { PieChart } from '../PieChart';
import { STATUS, TICKETS } from '../../utils/actions';
import star from '../../assets/images/star.svg';


export const ChartCards = () => {
  const { callList } = useCallList();
  const labels = ['Não encerrados', 'Encerrados'];
  const allLabels = ['Aberto', 'Em andamento', 'Em espera', 'Encerrado'];

const table = [
  {
    title: TICKETS,
    subtitle: "Hoje",
    content: <PieChart data={verifyServices(callList, TICKETS)} labels={labels} />
  },
  {
    title: STATUS,
    subtitle: "Hoje",
    percent: "",
    content: <PieChart data={findCallServiceByStatus(callList, STATUS)} labels={allLabels} />
  },
  {
    title: "CHAMADOS",
    subtitle: "28 dias",
    percent: "",
    content: <PieChart data={findCallServiceFromOpenAndClose(callList, STATUS)} labels={labels} />
  },
  {
    title: "AVALIAÇÃO",
    subtitle: "3 meses",
    percent: "",
    content:
      <div className='recommendation d-flex align-center justify-center gap-10 font color--gray-500 size--3rem weight--bold'>
        <h1 className="color--gray-500">4.5</h1>
        <img src={star} alt="Avaliação" />
      </div>
  },
];
    return (
      <section className="chart-container d-flex wrap gap-10">
      {table.map(({ title, subtitle, content, percent }) => (
        <section key={title} className="card-container background--white flex padding-10-20 border radius-10">
          <div className="header d-flex justify-between">
            <span className='color--gray-font-700 font weight-800 size-16'>{title}</span>
            {percent && (
              <div className="percent-content d-flex background--light-green radius-10">
                <span className='font color--green weight-600 size-12'>{percent}</span>
              </div>
            )}
          </div>
          <span className='font size-14 color--gray-font-200'>{subtitle}</span>
          <div className="card-content">{content}</div>
        </section>
      ))}
    </section>
    );
}