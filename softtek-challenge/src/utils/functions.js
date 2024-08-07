import { PRIORITY_ORDER, STATUS_ORDER } from "./actions";

export   const sortedCallList = (newList) => newList.slice().sort((a, b) => {
    const sortStatusA = STATUS_ORDER.findIndex(status => status.value === a.status);
    const sortStatusB = STATUS_ORDER.findIndex(status => status.value === b.status);

    if(sortStatusA !== sortStatusB) return sortStatusA - sortStatusB;
    
    const priorityOrderA = PRIORITY_ORDER.findIndex(priority => priority.value === a.priority);
    const priorityOrderB = PRIORITY_ORDER.findIndex(priority => priority.value === b.priority);

    if (priorityOrderA !== priorityOrderB) return priorityOrderA - priorityOrderB;

    const dateA = new Date(a.protocol.create_date);
    const dateB = new Date(b.protocol.create_date);

    return dateA - dateB;

  });