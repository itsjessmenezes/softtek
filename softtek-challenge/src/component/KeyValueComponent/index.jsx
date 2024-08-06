/* eslint-disable react/prop-types */
import '../../styles/global.scss';

export const KeyValueComponent = ({ label, value, icon = "" }) => {

    return (
      <div className="key-value d-flex gap-10">
        <div className=" d-flex gap-5">
            { icon && <img src={icon} alt={label} /> }
            <span>{label}</span>
          </div>
          <span>{value}</span>
      </div>
    )
}