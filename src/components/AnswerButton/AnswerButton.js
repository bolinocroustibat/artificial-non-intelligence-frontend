import React from 'react';
import PropTypes from 'prop-types';
import styles from './AnswerButton.module.css';

const AnswerButton = (props) => {
  console.log(props.type)
  if (props.type === "ai") {
    return (
      <div className={styles.AnswerButton}>
        I think it's<span>🤖</span>AI-GENERATED
      </div>
    )
  } else if (props.type === "human") {
    return (
      <div className={styles.AnswerButton}>
        think it's<span>👩</span>HUMAN-GENERATED
      </div>
    )
  };

  return null;


};

AnswerButton.propTypes = {};

AnswerButton.defaultProps = {};

export default AnswerButton;
