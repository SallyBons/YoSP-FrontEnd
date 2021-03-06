import React from 'react';
import PropTypes from 'prop-types';
import 'uikit/dist/css/uikit.min.css';
import './styles.css';

const InputField = (props) => {
  const {
    input, meta, label, type, placeholder
  // eslint-disable-next-line jsx-a11y/label-has-for
  } = props; return (<div className="uk-margin"><label className="label" htmlFor={input.id}>{label}</label><input className="uk-input" placeholder={placeholder} id={input.id} {...input} type={type} />{(meta.error && meta.touched) && <span style={{color: 'red'}}>{meta.error}</span>}</div>);
};

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default InputField;
