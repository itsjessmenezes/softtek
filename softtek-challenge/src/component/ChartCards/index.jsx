import { table } from '../../utils/custom';
import './style.css';

export const ChartCards = () => {


    return (
      <section className="chart-container">
      {table.map(({ title, subtitle, content, percent }) => (
        <section key={title} className="card-container">
          <div className="header">
            <span>{title}</span>
            {percent && (
              <div className="percent-content">
                <span>{percent}</span>
              </div>
            )}
          </div>
          <span>{subtitle}</span>
          <div className="card-content">{content}</div>
        </section>
      ))}
    </section>
    );
}