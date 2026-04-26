import styled from "styled-components";
import { useState } from "react";

import Notifications from "../organisms/notifications";

import HeaderGeneral from "../organisms/headerGeneral";
import Navbar from "../organisms/nav/navbar";
import MainGeneral from "./mainGeneral";

import { Outlet, Navigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
`;

const Right = styled.div`
  width: calc(100% - 80px);
  overflow-x: hidden;

  .mainGeneral {
    overflow: auto;
  }
`;

function DashboardTemplate({ modulo, children }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <Navbar />
      <Right>
        <HeaderGeneral
          user={localStorage.getItem('userName') || 'Usuario'}
          onClick={() => setShowNotifications(true)}
        />
        {showNotifications && (
          <Notifications
            onClose={() => setShowNotifications(false)}
            show={showNotifications}
          />
        )}
        <MainGeneral modulo={modulo} className="mainGeneral">
          {children || <Outlet />}
        </MainGeneral>
      </Right>
    </Container>
  );
}

export default DashboardTemplate;