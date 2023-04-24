import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function NotFound() {
  const navigate = useNavigate();
  const goToMainPage = () => navigate('/');

  return (
    <NotFoundContainer>
      <NotFoundImage src='/NotFound.png' alt='Not Found' />
      <GoToMain onClick={goToMainPage}>메인으로 돌아가기</GoToMain>
    </NotFoundContainer>
  );
}

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const NotFoundImage = styled.img`
  width: 500px;
  height: 400px;
`;

const GoToMain = styled.button`
  margin: 20px;
  width: 150px;
  height: 40px;
  background-color: #247c6c;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
