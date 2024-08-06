/* eslint-disable react/prop-types */
import './style.css';

import { LabelComponent } from '../../component/LabelComponent';
import { KeyValueComponent } from '../../component/KeyValueComponent';
import callList from '../../utils/callList.json';

import location from '../../assets/images/location.svg';
import contact from '../../assets/images/contact.svg';
import notFound from '../../assets/images/not-found.svg';

export const Calls = ({ protocol }) => {
  const findProtocol = callList.find(p => p.protocol.id === protocol);

    return findProtocol ? (
      <section className='margin top-20'>
        <section className="d-flex column gap-10">
        <section className="background--white border radius-5 ">
          <LabelComponent 
          title={`N° Chamado: ${findProtocol.protocol.id}`}
          keyValue={
            <>
                      <KeyValueComponent 
            label="Prioridade:"
            value={findProtocol.priority}
          />
                    <KeyValueComponent 
            label="Tipo de Chamado:"
            value={findProtocol.call_type.title}
          />
            </>
        }
          content={<button className='close-call--btn background--gray-500 padding-10-20 border b-none radius-5 color--white font weight--bold pointer'>Encerrar chamado</button>}
          />
        </section>
        <section className="background--white border radius-5">
          <LabelComponent 
          title={findProtocol.client.company_name}
          keyValue={
            <>
              <KeyValueComponent
            label="Nome do Cliente:"
            value={findProtocol.client.name}
            />
              <KeyValueComponent
            label={`${findProtocol.client.document_type}:`}
            value={findProtocol.client.document_number}
            />
            </>
          }
          content={
            <div className='d-flex column'>
              <KeyValueComponent
              icon={location}
              label="Endereço:"
              value={`${findProtocol.client.address.street}, ${findProtocol.client.address.street_number} - ${findProtocol.client.address.state_code}`}
              />
              <KeyValueComponent
              icon={contact}
              label="Contato:"
              value={findProtocol.client.phone}
              />
            </div>
          }
          />
        </section>
          <section className="background--white border radius-5">
            <div className="margin bottom-20">
              <LabelComponent 
                title="Plano de Suporte Técnico Premium"
                keyValue={
                  <>
                    <KeyValueComponent
                    label="Acesso remoto e Presencial"
                    value=""
                    />
                    <KeyValueComponent
                    label="Renovação de contrato:"
                    value={new Date(findProtocol.contract.renewal_contract).toLocaleString("pt-BR", { year: 'numeric', month: 'numeric', day: 'numeric' })}
                    />
                  </>
                }
                content={
                  <>
                    <KeyValueComponent
                      label="Valor:"
                      value={(findProtocol.contract.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    />
                    <KeyValueComponent
                      label="Tipo de contrato:"
                      value="Anual"
                    />
                  </>
                }
              />
            </div>
          <div className="divisor background--gray-font-200"></div>
          <section className="interactions-history padding-10-20">
            <h3 className='margin bottom-20 color--gray-font-900'>Histórico de Interações</h3>
            <div className="d-flex column align-center">
            <img className='margin bottom-10' src={notFound} alt="Nenhum resultado encontrado" />
            <h4 className='color--gray-font-900'>Nenhum resultado encontrado</h4>
            </div>
          </section>
          </section>
        </section>
      </section>
    ) : (
      <div>Erro</div>
    );
}