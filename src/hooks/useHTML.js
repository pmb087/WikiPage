import { useState, useEffect } from 'react';
import sanitize from 'sanitize-html';

export default function useHTML(wikiData, currentTitle, currentDescription) {
  // 링크로 변환된 내용 문자열이 담기는 State
  const [convertedDescription, setConvertedDescription] = useState('');

  // 현재 게시물 제목이 언급된 타 게시물의 제목 링크가 담기는 State
  const [convertedTitleArray, setConvertedTitleArray] = useState([]);

  // 변환된 a태그를 클릭할 시 기본 동작을 막고 href의 링크 뒷부분(라우팅 경로)를 추출하여
  // navigate를 콜백함수로 받아 실행하는 함수
  const contentClickHandler = (event, callback) => {
    event.preventDefault();
    const targetLink = event.target.closest('a');
    if (targetLink === null) return;

    setConvertedTitleArray([]);
    const linkArr = targetLink.href.split('/');
    const id = linkArr[linkArr.length - 1];

    callback(`/detail/${id}`);
  };

  // 현재 게시물이 언급된 타 게시물의 제목을 링크로 변환하여 하단에 추가하는 로직
  useEffect(() => {
    setConvertedTitleArray([]);
    const instance = [];
    wikiData.forEach(({ id, title, description }) => {
      if (description.includes(currentTitle) && currentTitle !== title) {
        const convertedTitle = `<a href="/detail/${id}" style="margin-right: 2px"}>${title}</a>`;
        instance.push(convertedTitle);
      }
      setConvertedTitleArray(instance);
    });
  }, [wikiData, currentTitle]);

  // 현재 게시물 내용에 포함된 타 게시물 제목을 링크로 변환하는 로직
  useEffect(() => {
    let alreadyIncludes = [];
    let countedTitle = {};
    let currentResult = sanitize(currentDescription);
    wikiData
      .sort((a, b) => b.title.length - a.title.length)
      .forEach(({ title, id }) => {
        if (currentTitle === title) return;
        alreadyIncludes.forEach((el) => {
          if (el.includes(title)) {
            if (countedTitle[title] === undefined) countedTitle[title] = 1;
            else countedTitle[title]++;
          } else countedTitle[title] = 0;
        });
        let currentStart = 0;
        while (currentResult.includes(title, currentStart)) {
          const currentIndex = currentResult.indexOf(title);

          if (countedTitle[title] > 0) {
            countedTitle[title]--;
            currentStart = currentIndex + 1;
            continue;
          }

          const titleLength = title.length;
          const [left, right] = [
            currentResult.slice(0, currentIndex),
            currentResult.slice(currentIndex + titleLength)
          ];
          const convertedTitle = `${left}<a href="/detail/${id}" style="margin-right: 2px">${title}</a>${right}`;
          currentResult = convertedTitle;
          alreadyIncludes.push(title);
          break;
        }
      });
    setConvertedDescription(currentResult);
  }, [wikiData, currentDescription, currentTitle]);

  return {
    convertedDescription: { __html: convertedDescription },
    contentClickHandler,
    convertedTitleArray
  };
}
