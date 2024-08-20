import { ABERTO, CHAMADOS, EM_ANDAMENTO, EM_ESPERA, ENCERRADO, STATUS, TICKETS } from "./actions";

const toLocalDateString = (date) => {
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return localDate.toISOString().split('T')[0];
}

const isDateToday = (date) => {
  const providedDate = date.split('T')[0];
  const today = toLocalDateString(new Date("2024-04-25T10:26"));

  return providedDate === today;
};

export const findCallServiceFromOpenAndClose = (callList) => {
  const initialCounts = { countClosed: 0, countOpened: 0 };

  const result = callList.reduce((acc, item) => {
  if (item.status === 'Encerrado') {
    acc.countClosed += 1;
  } else {
    acc.countOpened += 1;
  }
  return acc;
}, initialCounts);

return [result.countClosed, result.countOpened]
};

export const findCallServiceFromTodayOpenAndClose = (callList) => {
  const result = callList.filter(({ protocol }) => isDateToday(protocol.create_date))

  return findCallServiceFromOpenAndClose(result);

};

export const findCallServiceByStatus = (callList) => {
  const initial = { countOpened: 0, countInProgress: 0, countWaiting: 0, countClosed: 0 };

  const result = callList.reduce((acc, item) => {
    if (item.status === 'Aberto') {
      acc.countOpened += 1;
    }
    if (item.status === 'Em andamento') {
      acc.countInProgress += 1;
    }
    if (item.status === 'Em espera') {
      acc.countWaiting += 1;
    }
    if (item.status === 'Encerrado') {
      acc.countClosed += 1;
    }
    return acc;
  }, initial);
  
  return [result.countOpened, result.countInProgress, result.countWaiting, result.countClosed]

};

export const verifyServices = (callList, title) => {
  switch (title) {
    case TICKETS:
      return findCallServiceFromTodayOpenAndClose(callList);
    case STATUS:
      return "";
    case CHAMADOS:
      return "";
      default:
        return;

  }
};

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
