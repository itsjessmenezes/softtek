import { PieChart } from "../component/PieChart";
import { ABERTO, EM_ANDAMENTO, EM_ESPERA, ENCERRADO } from "./actions";
// import star from '../../assets/images/star.svg';

const data = [70, 30];
const labels = ['Encerrados', 'Abertos',];


export const table = [
  {
    title: "CHAMADOS",
    subtitle: "28 dias",
    percent: "",
    content: <PieChart data={data} labels={labels} />
  },
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
    title: "ATENDIMENTOS",
    subtitle: "28 dias",
    percent: "12%",
    content: <PieChart data={data} labels={labels} />
  },
  // {
  //   title: "AVALIAÇÃO",
  //   subtitle: "3 meses",
  //   percent: "",
  //   content:
  //     <div className='recommendation'>
  //       <h1>4.5</h1>
  //       <img src={star} alt="Avaliação" />
  //     </div>
  // },
];

export     const callList = [
  {
    protocol: {
      id: '123023920',
      openingDate: '2024-04-25T09:51',
    },
    client: {
      name: 'Thomas Rocha',
      companyName: 'Oliva Merchant',
      document: '',
    },
    status: 'Aberto',
    callType: {
      title: 'Problema',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'ALTA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
  {
    protocol: {
      id: '123023921',
      openingDate: '2024-04-25T10:01',
    },
    client: {
      name: 'Andrea Leite',
      companyName: 'Digital Place',
      document: '',
    },
    status: 'Aberto',
    callType: {
      title: 'Incidente',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'ALTA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
  {
    protocol: {
      id: '123023922',
      openingDate: '2024-04-25T10:13',
    },
    client: {
      name: 'Ravi Botelho',
      companyName: 'OrtoClean',
      document: '',
    },
    status: 'Em andamento',
    callType: {
      title: 'Problema',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'ALTA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
  {
    protocol: {
      id: '123023923',
      openingDate: '2024-04-25T10:26',
    },
    client: {
      name: 'Lucas Silveira',
      companyName: 'Farmacity',
      document: '',
    },
    status: 'Em andamento',
    callType: {
      title: 'Problema',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'ALTA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
  {
    protocol: {
      id: '123023924',
      openingDate: '2024-04-25T10:47',
    },
    client: {
      name: 'Larissa Almeida',
      companyName: 'Copiadora Bell',
      document: '',
    },
    status: 'Em andamento',
    callType: {
      title: 'Requisição',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'MEDIA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
  {
    protocol: {
      id: '123023925',
      openingDate: '2024-04-25T11:03',
    },
    client: {
      name: 'Joice Davila',
      companyName: 'Papelaria Max10',
      document: '',
    },
    status: 'Em andamento',
    callType: {
      title: 'Requisição',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'MEDIA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
  {
    protocol: {
      id: '123023926',
      openingDate: '2024-04-25T11:12',
    },
    client: {
      name: 'Maria Santos',
      companyName: 'Café Aroma',
      document: '',
    },
    status: 'Em andamento',
    callType: {
      title: 'Mudança',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'MEDIA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
  {
    protocol: {
      id: '123023927',
      openingDate: '2024-04-25T11:24',
    },
    client: {
      name: 'Rafael Fernandes',
      companyName: 'Floricultura Primavera',
      document: '',
    },
    status: 'Em espera',
    callType: {
      title: 'Problema',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'MEDIA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
  {
    protocol: {
      id: '123023928',
      openingDate: '2024-04-25T09:51',
    },
    client: {
      name: 'Carlos Mendes',
      companyName: 'Livraria Becco',
      document: '',
    },
    status: 'Em espera',
    callType: {
      title: 'Problema',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'BAIXA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
  {
    protocol: {
      id: '123023929',
      openingDate: '2024-04-25T09:51',
    },
    client: {
      name: 'Amanda Lima',
      companyName: 'Academia Vital',
      document: '',
    },
    status: 'Encerrado',
    callType: {
      title: 'Problema',
      description: 'Erro ao acessar o aplicativo'
    },
    priority: 'BAIXA',
    description: 'Usuário está recebendo um erro ao acessar o aplicativo de email. Mensagem de erro: "Erro de autenticação"',
  },
];

export const color = (status) => {
  switch (status) {
    case ABERTO:
      return 'blue';
    case EM_ANDAMENTO:
      return 'yellow';
    case EM_ESPERA:
      return 'red';
    case ENCERRADO:
      return 'green';
    default:
      return '';
  }
};