import './style.css';

import { LabelComponent } from '../../component/LabelComponent';
import { KeyValueComponent } from '../../component/KeyValueComponent';

import location from '../../assets/images/location.svg';
import contact from '../../assets/images/contact.svg';
import notFound from '../../assets/images/not-found.svg';

export const Calls = () => {

    return (
      <section className='margin top-20'>
        <section className="d-flex column gap-10">
        <section className="background--white border radius-5 ">
          <LabelComponent 
          title="N° Chamado: 123456789"
          keyValue={
            <>
                      <KeyValueComponent 
            label="Prioridade:"
            value="Alta"
          />
                    <KeyValueComponent 
            label="Tipo de Chamado:"
            value="Problema"
          />
            </>
        }
          content={<button className='close-call--btn background--gray-500 padding-10-20 border b-none radius-5 color--white font weight--bold pointer'>Encerrar chamado</button>}
          />
        </section>
        <section className="background--white border radius-5">
          <LabelComponent 
          title="Health Clínica Médica"
          keyValue={
            <KeyValueComponent
            label="CNPJ:"
            value="34294934/0001-48"
            />
          }
          content={
            <div className='d-flex column'>
              <KeyValueComponent
              icon={location}
              label="Endereço:"
              value="Av Paulista, 2309 - SP"
              />
              <KeyValueComponent
              icon={contact}
              label="Contato:"
              value="(11) 9 9343-3409"
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
                    label="Acesso remoto e Presencial:"
                    value=""
                    />
                    <KeyValueComponent
                    label="Renovação de contrato:"
                    value="31/12/2024"
                    />
                  </>
                }
                content={
                  <>
                    <KeyValueComponent
                      label="Valor:"
                      value="R$5.000,00"
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
    );
}