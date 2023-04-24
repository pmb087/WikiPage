import { useState } from 'react';

export default function useEditing(wikiData, id) {
  const currentWikiData = wikiData.find((wiki) => wiki.id === Number(id));

  // 인자로 넘겨받은 id와 일치하는 게시글의 제목, 내용 초기값
  const { title, description } = currentWikiData;

  // 현재 보고있는 게시글의 제목, 내용 (수정될 수 있다)
  const [input, setInput] = useState({ title, description });

  const disabledInput =
    input.title.length === 0 || input.description.length === 0;

  // editing 페이지 내부에서 작성되는 제목, 내용을 핸들링하는 함수
  const handleInputValue = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  // editing 페이지에서 수정을 완료한 경우
  // 1. callback으로 handleEdit 함수를 전달받아서 context에서 관리되는 wikiData를 수정한다.
  // 2. 수정을 완료한 id의 detail 페이지로 이동한다.
  const handleEdit = (navigate, callback, id) => {
    callback(id, input.title, input.description);
    navigate(`/detail/${id}`);
  };

  // detail 페이지에서 수정 버튼을 누른 경우 callback으로 navigate함수를 전달받아 페이지를 이동한다.
  const activateEditMode = (callback, id) => callback(`/detail/${id}/edit`);

  // editing 페이지에서 수정을 취소한 경우
  // 1. 게시글의 제목과 내용을 초기값으로 되돌린다.
  // 2. 수정중인 게시글의 id를 기준으로 detail 페이지로 돌아간다.
  const cancelEdit = (callback, id) => {
    setInput({ title, description });
    callback(`/detail/${id}`);
  };

  return {
    input,
    disabledInput,
    currentWikiData,
    handleInputValue,
    handleEdit,
    cancelEdit,
    activateEditMode
  };
}
