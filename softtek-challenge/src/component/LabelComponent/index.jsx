/* eslint-disable react/prop-types */
export const LabelComponent = ({title, keyValue, content}) => {

    return (
        <div className="label-component d-flex full-width justify-between padding-10-20">
            <div className="label-content d-flex column color--gray-font-700">
              <h3 className="label-content color--gray-font-900 margin bottom-10">{title}</h3>
              {keyValue}
            </div>
            <div className="label-content d-flex column justify-center color--gray-font-700">
              {content}
            </div>
          </div>
    )
}