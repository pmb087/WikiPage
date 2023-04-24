import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import formatTitle from '../func/formatTitle';

function WikiDetailLink({ title, id }) {
  const navigate = useNavigate();
  const goToDetailPage = () => navigate(`/detail/${id}`);

  return (
    <WikiDetailLinkContainer onClick={goToDetailPage}>
      <DetailTitle>{formatTitle(title)}</DetailTitle>
    </WikiDetailLinkContainer>
  );
}

export default WikiDetailLink;

const WikiDetailLinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding: 10px 20px;
  border: 1px solid #c0c0c0;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;

const DetailTitle = styled.p`
  color: #505050;
  font-size: 36px;
  font-weight: bold;
`;
