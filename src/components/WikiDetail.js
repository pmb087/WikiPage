import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { WikiContext } from '../context/WikiContext';
import useEditing from '../hooks/useEditing';
import useHTML from '../hooks/useHTML';

function WikiDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wikiData, deleteWiki } = useContext(WikiContext);
  const { currentWikiData, activateEditMode } = useEditing(wikiData, id);
  const { convertedDescription, contentClickHandler, convertedTitleArray } =
    useHTML(wikiData, currentWikiData.title, currentWikiData.description);

  const goToWikiMain = () => navigate('/');
  const goToEditing = () => activateEditMode(navigate, id);
  const deleteWikiData = () => deleteWiki(Number(id), navigate);
  const goToAtherPost = (event) => contentClickHandler(event, navigate);

  return (
    <DetailWikiContainer>
      <DetailHeader>
        <DetailHeaderTitle>Wiki Detail</DetailHeaderTitle>
        <EditButton onClick={goToEditing}>수정</EditButton>
        <CancelButton onClick={deleteWikiData}>삭제</CancelButton>
      </DetailHeader>
      <DetailTitle>{currentWikiData.title}</DetailTitle>
      <DetailDes
        onClick={goToAtherPost}
        dangerouslySetInnerHTML={convertedDescription}
      />
      <GoToMain onClick={goToWikiMain}>목록으로 돌아가기</GoToMain>
      <Partition />
      <WikiLinkSummary>
        {convertedTitleArray.map((aTag, index) => {
          return (
            <WikiLink
              onClick={goToAtherPost}
              dangerouslySetInnerHTML={{ __html: aTag }}
              key={index}
            />
          );
        })}
      </WikiLinkSummary>
    </DetailWikiContainer>
  );
}

export default WikiDetail;

const DetailWikiContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 200px auto;
  width: fit-content;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 350px;
`;

const DetailHeaderTitle = styled.h1`
  margin: 10px;
  color: #505050;
  font-size: 30px;
  font-weight: 600;
`;

const EditButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: #0078d7;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const CancelButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: #ea4335;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const DetailTitle = styled.h2`
  margin: 20px;
  color: #707070;
  font-size: 20px;
  font-weight: 600;
`;

const DetailDes = styled.p`
  margin: 0 10px 20px;
  font-size: 16px;

  a {
    padding: 3px 4px;
    background-color: #c0c0c0;
    border-radius: 3px;
    color: black;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      background-color: #cfcfcf;
    }
  }
`;

const GoToMain = styled.button`
  margin-bottom: 10px;
  padding: 3px 0;
  width: 320px;
  background-color: #007b7c;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;

const Partition = styled.hr`
  width: calc(100% - 20px);
`;

const WikiLinkSummary = styled.div`
  display: flex;
  align-items: center;
`;

const WikiLink = styled.div`
  a {
    display: block;
    margin: 3px;
    padding: 3px 4px;
    background-color: #c0c0c0;
    border-radius: 3px;
    color: black;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      background-color: #cfcfcf;
    }
  }
`;
