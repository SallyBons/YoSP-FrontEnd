import React from 'react';
import 'uikit/dist/css/uikit.min.css';

const TextArea= (props) => {
  const {
    textarea, meta, label, type
  // eslint-disable-next-line jsx-a11y/label-has-for
  } = props; return (<div className="uk-margin"><label>{label}</label><textarea className="uk-textarea"  {...textarea} type={type} />{(meta.error && meta.touched) && <span style={{color: 'red'}}>{meta.error}</span>}</div>);
};



export default TextArea;