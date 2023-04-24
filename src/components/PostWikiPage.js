import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { WikiContext } from '../context/WikiContext';

function PostWikiPage() {
  const navigate = useNavigate();
  const { postWiki, handlePostInfo, postInfo, postDisabled, cancelPost } =
    useContext(WikiContext);
  const { title, description } = postInfo;

  const handlePost = () => postWiki(title, description, navigate);
  const cancelPosting = () => cancelPost(navigate);

  return (
    <PostWikiContainer>
      <PostTitleHeaderContainer>
        <PostTitleHeader>Post Wiki</PostTitleHeader>
        <CancelPost onClick={cancelPosting}>취소</CancelPost>
      </PostTitleHeaderContainer>
      <PostTitle
        value={title}
        name='title'
        onInput={handlePostInfo}
        placeholder='제목을 입력해주세요'
      />
      <PostDes
        value={description}
        name='description'
        onInput={handlePostInfo}
        rows='4'
        placeholder='내용을 입력해주세요'
      />
      <PostButton disabled={postDisabled} onClick={handlePost}>
        작성하기
      </PostButton>
    </PostWikiContainer>
  );
}

export default PostWikiPage;

const PostWikiContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 200px auto;
  width: fit-content;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
`;

const PostTitleHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const PostTitleHeader = styled.h1`
  margin: 10px;
  color: #505050;
  font-size: 30px;
  font-weight: 600;
`;

const PostTitle = styled.input`
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

const CancelPost = styled.button`
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

const PostDes = styled.textarea`
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

const PostButton = styled.button`
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
