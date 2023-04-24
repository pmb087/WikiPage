import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { WikiContext } from '../context/WikiContext';
import useEditing from '../hooks/useEditing';

function WikiEditing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wikiData, editWiki } = useContext(WikiContext);
  const { input, handleInputValue, disabledInput, handleEdit, cancelEdit } =
    useEditing(wikiData, id);

  const onEdit = () => handleEdit(navigate, editWiki, Number(id));
  const goToDetail = () => cancelEdit(navigate, id);

  return (
    <DetailWikiContainer>
      <DetailHeader>
        <DetailHeaderTitle>Wiki Detail</DetailHeaderTitle>
        <EditButton disabled={disabledInput} onClick={onEdit}>
          완료
        </EditButton>
        <CancelButton onClick={goToDetail}>취소</CancelButton>
      </DetailHeader>
      <DetailTitleInput
        value={input.title}
        name='title'
        onInput={handleInputValue}
        placeholder='제목을 입력해주세요'
      />
      <DetailDesInput
        value={input.description}
        name='description'
        onInput={handleInputValue}
        rows='4'
        placeholder='내용을 입력해주세요'
      />
    </DetailWikiContainer>
  );
}

export default WikiEditing;

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

  &:disabled {
    cursor: default;
    opacity: 0.4;
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

const DetailTitleInput = styled.input`
  margin: 10px;
  padding: 5px;
  width: 320px;
  border: 1px solid #c0c0c0;
  border-radius: 3px;
  font-size: 16px;

  :focus {
    outline: 2px solid #007b7c;
  }
`;

const DetailDesInput = styled.textarea`
  margin: 0 10px 10px;
  padding: 5px;
  width: 320px;
  border: 1px solid #c0c0c0;
  border-radius: 3px;
  resize: none;

  :focus {
    outline: 2px solid #007b7c;
  }
`;
