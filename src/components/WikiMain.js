import { useContext } from 'react';
import styled from 'styled-components';
import PageNation from './PageNation';
import WikiDetailLink from './WikiDetailLink';
import { WikiContext } from '../context/WikiContext';
import { useNavigate } from 'react-router-dom';

function WikiMain() {
  const { wikiData, currentList } = useContext(WikiContext);
  const navigate = useNavigate();
  const goToPost = () => navigate('/post');

  return (
    <WikiMainContainer>
      <WikiMainHeader>
        <WikiTitle>Wiki Assignment</WikiTitle>
        <WikiAddPost onClick={goToPost}>추가</WikiAddPost>
      </WikiMainHeader>
      <WikiDetailLinkWrap>
        {currentList.map(({ id, title, description }) => {
          return (
            <WikiDetailLink
              title={title}
              description={description}
              id={id}
              key={id}
            />
          );
        })}
      </WikiDetailLinkWrap>
      <PageNation listLength={wikiData.length} />
    </WikiMainContainer>
  );
}

export default WikiMain;

const WikiMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const WikiMainHeader = styled.div`
  display: flex;
  width: 350px;
  justify-content: space-evenly;
  align-items: center;
`;

const WikiTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const WikiAddPost = styled.button`
  width: 50px;
  height: 30px;
  font-size: 16px;
  background-color: #0078d7;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const WikiDetailLinkWrap = styled.div`
  padding: 20px;
  width: 350px;
  height: 350px;
`;
