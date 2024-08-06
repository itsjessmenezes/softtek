import { PieChart } from "../component/PieChart";
import { ABERTO, EM_ANDAMENTO, EM_ESPERA, ENCERRADO } from "./actions";
import star from '../assets/images/star.svg';

const data = [70, 30];
const labels = ['Encerrados', 'Abertos',];


export const table = [
  {
    title: "TICKETS",
    subtitle: "Hoje",
    percent: "32%",
    content: <PieChart data={data} labels={labels} />
  },
  {
    title: "FINALIZADOS",
    subtitle: "Hoje",
    percent: "",
    content: <PieChart data={data} labels={labels} />
  },
  {
    title: "CHAMADOS",
    subtitle: "28 dias",
    percent: "",
    content: <PieChart data={data} labels={labels} />
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

export const color = (status) => {
  switch (status) {
    case ABERTO:
      return 'green';
    case EM_ANDAMENTO:
      return 'yellow';
    case EM_ESPERA:
      return 'red';
    case ENCERRADO:
      return 'gray';
    default:
      return '';
  }
};