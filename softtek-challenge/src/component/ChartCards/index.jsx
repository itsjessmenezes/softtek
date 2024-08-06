import { table } from '../../utils/custom';
import '../../styles/global.scss';
import './style.css';

export const ChartCards = () => {

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