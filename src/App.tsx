import React, { useState } from 'react';
import './App.css';
import Modal from './comp/Modal';

export default function App(): React.ReactElement | null {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<string>();
  const onMainButtonClick = (resetDashboard: boolean = false) => {
    setToggleModal(!toggleModal);
    if (resetDashboard) setDashboard('');
  };
  return (
    <>
      {!dashboard && (
        <div>
          <div>We'll set-up your account now.</div>
          <button className="button" onClick={() => onMainButtonClick()}>
            Get Started
          </button>
        </div>
      )}
      {dashboard && (
        <div>
          <div>{dashboard}</div>
          <button className="button" onClick={() => onMainButtonClick(true)}>
            Again
          </button>
        </div>
      )}

      {toggleModal && (
        <Modal
          closeModal={onMainButtonClick}
          setDashboard={setDashboard}></Modal>
      )}
    </>
  );
}
