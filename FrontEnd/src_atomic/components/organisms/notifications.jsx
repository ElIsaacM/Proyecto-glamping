import styled from "styled-components";
import NotificacionV1 from "../molecules/notificacionV1";
import { useFetch } from "../../hooks/fetchConnect";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCont = styled.div`
  width: 350px;
  height: 500px;
  padding: 10px 15px;
  box-sizing: border-box;

  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px;
  position: absolute;
  top: 20px;
  right: 90px;

  display: flex;
  flex-direction: column;

  .scrollContent {
    overflow-y: auto;
  }

  .scrollContent::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scrollContent::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c4c4c4ff;
    border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0);
  }

  @media (max-width: 550px) {
    position: static;
    width: 100%;
    height: 100%;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  .close {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    background: red;
  }
`;

const ClearAll = styled.button`
  border-radius: 5px;
  background-color: #e7e7e7ff;
  color: #343434ff;
  border: none;
  margin-bottom: 15px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 900;

  &:hover {
    background-color: #ff3838ff;
    color: #ffffffff;
  }
`;

function Notifications({ onClose }) {
  const { data, fetchData } = useFetch();

  const handleFetchData = () => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/notifications`);
  };

  useEffect(() => {
    handleFetchData();
  }, [fetchData]);

  const handleDeleteAll = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/all`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ userName: localStorage.getItem('userName') || 'Administrador' })
      });
      if (res.ok) handleFetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "ngrok-skip-browser-warning": "true"
        }
      });
      if (res.ok) handleFetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container onClick={onClose}>
      <ModalCont onClick={(e) => e.stopPropagation()}>
        <Options>
          <h4>Notificaciones</h4>

          <button className="close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </Options>

        <ClearAll onClick={handleDeleteAll}>
          Borrar todas
        </ClearAll>


        <div className="scrollContent">
          <NotificacionV1
            data={data}
            title={'Notificaciones'}
            handleDelete={handleDelete}
          />
        </div>

      </ModalCont>
    </ Container>
  )
}

export default Notifications;