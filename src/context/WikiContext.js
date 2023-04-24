import React, { useState } from 'react';

export const WikiContext = React.createContext(null);

function WikiProvider({ children }) {
  // 위키 데이터
  const [wikiData, setWikiData] = useState([
    {
      id: 1,
      title: 'Javascript',
      description: 'HTML, CSS와 함께 프론트엔드 개발의 기본이 되는 언어입니다'
    },
    { id: 2, title: 'CSS', description: 'HTML 태그의 디자인을 담당합니다' },
    {
      id: 3,
      title: 'HTML',
      description: '태그와 그에 할당된 CSS를 통해 Layout을 구성합니다'
    },
    {
      id: 4,
      title: 'React',
      description:
        'Javascript를 이용해 프론트엔드 개발을 쉽게 할 수 있게 해주는 Framework 입니다'
    },
    {
      id: 5,
      title: 'Router',
      description: 'React에서 페이지 이동을 하게 해주는 개념입니다'
    },
    {
      id: 6,
      title: 'Context',
      description: 'React에서 전역전으로 상태를 관리할 때 쓰이는 개념입니다'
    },
    {
      id: 7,
      title: 'Layout',
      description:
        'HTML과 CSS를 통해서 또는 Javascript가 반영되어 최종적으로 사용자에게 보이는 화면 구성입니다.'
    }
  ]);

  // 현재 페이지 정보 (5개씩 보여줄 때)
  const [currentPageCount, setCurrentPageCount] = useState(0);

  // 작성중인 게시글의 정보
  const [postInfo, setPostInfo] = useState({ title: '', description: '' });

  // 게시글 정보 핸들링 함수
  const handlePostInfo = (event) => {
    const { name, value } = event.target;
    setPostInfo({ ...postInfo, [name]: value });
  };

  // 게시글 작성 버튼 활성화 여부
  const postDisabled =
    postInfo.title.length === 0 || postInfo.description.length === 0;

  // 위키 데이터를 Id 순으로 정렬한 뒤 5개씩 끊어서 현재 보고있는 페이지의 리스트
  const currentList = wikiData
    .sort((a, b) => a.id - b.id)
    .slice(currentPageCount * 5, currentPageCount * 5 + 5);

  // C - naviate 함수를 콜백으로 받아서 실행함 (위키 게시글을 등록하면 다시 메인으로 이동해야함)
  const postWiki = (title, description, callback) => {
    setWikiData([...wikiData, { id: wikiData.length + 1, title, description }]);
    setPostInfo({ title: '', description: '' });
    callback('/');
  };

  // U - 위키 게시글을 수정하는 함수
  const editWiki = (id, title, description) => {
    const instance = [...wikiData];
    const elseWiki = instance.filter((wiki) => wiki.id !== id);
    const currentWiki = { id, title, description };
    console.log(currentWiki, instance);

    setWikiData([currentWiki, ...elseWiki]);
  };

  // D- 위키 게시글 삭제하는 함수
  const deleteWiki = (id, callback) => {
    const deltedWikiList = wikiData.filter((wiki) => wiki.id !== id);
    setWikiData(deltedWikiList);
    callback('/');
  };

  // 위키 게시글 작성 취소 함수
  const cancelPost = (callback) => {
    setPostInfo({ title: '', description: '' });
    callback('/');
  };

  return (
    <WikiContext.Provider
      value={{
        wikiData,
        currentPageCount,
        setCurrentPageCount,
        currentList,
        postWiki,
        editWiki,
        deleteWiki,
        postInfo,
        handlePostInfo,
        postDisabled,
        cancelPost
      }}
    >
      {children}
    </WikiContext.Provider>
  );
}

export default WikiProvider;
