import { useState } from 'react';
import { darkTheme } from '../../utils/theme';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader'
import styled from 'styled-components';

const ToastBody = styled.div`
  background: ${darkTheme.body};
  color: ${darkTheme.text};
`;

const Notification = (props) => {
  const [show, setShow] = useState(true);
  return (
    <Toast
      onClose={() => setShow(false)} 
      show={show}
      delay={3000}
      autohide
    >
      <ToastHeader closeButton={false}>
        <img
          src="https://res.cloudinary.com/dom5vocai/image/upload/v1613426540/crane_logo_xzo7cm.png"
          className="rounded mr-2"
          alt="notification logo"
          width="30"
          height="30"
        />
        <strong className="mr-auto">Crane</strong>
      </ToastHeader>
      <Toast.Body as={ToastBody}>{props.message}</Toast.Body>
    </Toast>
  )
}

export default Notification;