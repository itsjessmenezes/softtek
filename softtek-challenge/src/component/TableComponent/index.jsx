/* eslint-disable react/prop-types */
import './style.css';
import { useState } from 'react';
import tableHead from "./tableHead.json";
import { color } from '../../utils/custom';
import { useCallList } from "../../context/useCallList";
import notFound from "../../assets/images/not-found.svg";

export const TableComponent = ({ list, setPage, setProtocol }) => {
  const { theme } = useCallList();
  const [isHovered, setIsHovered] = useState(false);
  const truncatedDescription = (desc) =>
    desc.length > 50 ? desc.substring(0, 30) + "..." : desc;

  const handleClickProtocol = (item) => {
    if (item.status === "Encerrado") return;

    setPage(1);
    setProtocol(item.protocol.id);
  };

    return list.length > 0 ? (
      <table>
        <thead>
          <tr className="color--gray-font-200">
            {tableHead.map(({ id, text }) => (
              <th
                key={id}
                className="font align-start border bottom-2 padding-10-0"
              >
                {text}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
              <tr
                key={item.protocol.id}
                className={`${theme === 'light' ? "color--gray-font-700" : "color--gray-100"} table-body`}
              >
                <td className="border bottom-2">
                  <button
                    className={`border b-none bg-none ${
                      item.status === "Encerrado"
                        ? "color--gray-font-700 cursor-default"
                        : theme === 'light' ? "color--purple-font-700" : "color--purple-gradient" 
                    } font weight--weight-700 `}
                    onClick={() => handleClickProtocol(item)}
                  >
                    <h4>{item.protocol.id}</h4>
                  </button>
                </td>
                <td className="border bottom-2">
                  <h5>{item.client.name}</h5>
                  <span>{item.client.company_name}</span>
                </td>
                <td className="border bottom-2">
                  <h5>
                    {new Date(item.protocol.create_date).toLocaleString(
                      "pt-BR",
                      { year: "numeric", month: "numeric", day: "numeric" }
                    )}
                  </h5>
                  <span>{`${new Date(
                    item.protocol.create_date
                  ).getHours()}:${new Date(
                    item.protocol.create_date
                  ).getMinutes()}`}</span>
                </td>
                <td className="border bottom-2">
                  <div className="status-container">
                    <div
                      className={`status status${theme === 'light' ? '' : '-dark'}-${color(item.status)}`}
                    ></div>
                    <h5>{item.status}</h5>
                  </div>
                </td>
                <td className="border bottom-2  tooltip-container"
                                onMouseEnter={() => setIsHovered(true)} 
                                onMouseLeave={() => setIsHovered(false)}
                >
                  <h5>{item.call_type.title}</h5>
                  <span  className="tooltip-text">
                    {truncatedDescription(item.call_type.description)}</span>
                    {isHovered && (
                    <div className="tooltip-bubble">
                      {item.call_type.description}
                    </div>
                  )}
                </td>
                <td className="border bottom-2">
                  <div className={`${theme === 'light' ? "background--gray-50" : "background--bg-dark"} priority d-flex`}>
                    <span>{item.priority}</span>
                  </div>
                </td>
                <td 
                className="border bottom-2 tooltip-container" 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="tooltip-text">
                    {truncatedDescription(item.call_type.suggestion)}
                  </span>
                  {isHovered && (
                    <div className="tooltip-bubble">
                      {item.call_type.suggestion}
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    ) : (
      <div className="d-flex column align-center">
      <img
        className="margin bottom-10"
        src={notFound}
        alt="Nenhum resultado encontrado"
      />
      <h4 className={theme === 'light' ? 'color--gray-font-900' : 'color--gray-font-700'}>
        Nenhum resultado encontrado
      </h4>
    </div>
    );
}