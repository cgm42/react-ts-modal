import React, { useState } from 'react';
import './modal.css';

interface AppProps {
  closeModal: (resetDashboard?: boolean) => void;
  setDashboard: React.Dispatch<React.SetStateAction<string | undefined>>;
}

/**
 * Display a modal with user info input form. If user is under age(<18), it also displays a consent check form
 * @param props see interface AppProps
 *
 */
function Modal(props: AppProps): React.ReactElement {
  const [consentCheck, setConsentCheck] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>();
  const [consent, setConsent] = useState<boolean>(false);
  const LEGAL_AGE = 18;
  const MIN_AGE = 1;
  const MAX_AGE = 120;

  const onSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (age && age < LEGAL_AGE && !consent) {
      setConsentCheck(true);
    } else {
      props.setDashboard(
        `Your name:${name}
        Your age:${age}`
      );
      props.closeModal(false);
      setConsent(false);
    }
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(event.target.value));
  };
  return (
    <div className="modal">
      <div className="modal-main">
        {!consentCheck && (
          <form className="form" onSubmit={onSubmit}>
            <h3>User Info</h3>
            <hr />
            <p>
              Name:
              <input name="name" value={name} onChange={onNameChange}></input>
            </p>
            <p>
              Age:{' '}
              <input
                name="age"
                type="number"
                min={MIN_AGE}
                max={MAX_AGE}
                value={age}
                onChange={onAgeChange}></input>
            </p>
            <hr />
            <div>
              <button
                className="button"
                onClick={() => props.closeModal(false)}>
                Cancel
              </button>
              <button
                className="button"
                type="submit"
                disabled={age === undefined}>
                Submit
              </button>
            </div>
          </form>
        )}
        {consentCheck && (
          <div>
            <h3>Parental Consent</h3>
            <hr />
            <form onSubmit={onSubmit}>
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(!consent)}
              />
              I have parental consent.
              <hr />
              <div className="button-group">
                <button
                  className="button"
                  onClick={() => setConsentCheck(false)}>
                  Back
                </button>
                <button
                  className="button"
                  onClick={() => props.closeModal(false)}>
                  Cancel
                </button>
                <button className="button" type="submit" disabled={!consent}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
