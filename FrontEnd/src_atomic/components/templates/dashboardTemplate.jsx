import styled from "styled-components";
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

function DashboardTemplate({ modulo }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <Navbar />
      <Right>
        <HeaderGeneral user={localStorage.getItem('userName') || 'Usuario'} />
        <MainGeneral modulo={modulo} className="mainGeneral">
          <Outlet />
        </MainGeneral>
      </Right>
    </Container>
  );
}

export default DashboardTemplate;