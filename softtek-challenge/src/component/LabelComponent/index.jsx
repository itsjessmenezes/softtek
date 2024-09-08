import { useCallList } from "../../context/useCallList"

/* eslint-disable react/prop-types */
export const LabelComponent = ({title, keyValue, content}) => {
const { theme } = useCallList();
    return (
        <div className="label-component d-flex full-width justify-between padding-10-20">
            <div className={`${theme === 'light' ? 'color--gray-font-900' : 'color--gray-font-200'} label-content d-flex column`}>
              <h3 className={`${theme === 'light' ? 'color--gray-font-900' : 'color--gray-font-200'} label-content margin bottom-10`}>{title}</h3>
              {keyValue}
            </div>
            <div className={`${theme === 'light' ? 'color--gray-font-900' : 'color--gray-font-200'} label-content d-flex column justify-center`}>
              {content}
            </div>
          </div>
    )
}