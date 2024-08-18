export const ABERTO = "Aberto";
export const EM_ANDAMENTO = "Em andamento";
export const EM_ESPERA = "Em espera";
export const ENCERRADO = "Encerrado";
export const PROBLEMA = "Problema";
export const MUDANCA = "Mudança";
export const INCIDENTE = "Incidente";
export const REQUISICAO = "Requisição";

export const OPENED = {id: 'opened', value: 'Aberto'};
export const IN_PROGRESS = {id: 'in_progress', value: 'Em andamento'};
export const WAITING = {id: 'waiting', value: 'Em espera'};
export const FINISHED = {id: 'finished', value: 'Encerrado'};

export const HIGH = {id: 'high', value: 'ALTA'};
export const MEDIUM = {id: 'medium', value: 'MEDIA'};
export const LOW = {id: 'low', value: 'BAIXA'};

export const STATUS_ORDER = [OPENED, IN_PROGRESS, WAITING, FINISHED];
export const PRIORITY_ORDER = [HIGH, MEDIUM, LOW];

export const ROLE_USER = 'user';
export const ROLE_SYSTEM = 'system';
