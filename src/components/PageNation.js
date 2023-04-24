import { useContext } from 'react';
import styled from 'styled-components';
import { WikiContext } from '../context/WikiContext';
import usePagination from '../hooks/usePagiantion';

function PageNation({ listLength }) {
  const { currentPageCount, setCurrentPageCount } = useContext(WikiContext);
  const {
    pageCountArr,
    handleCurrentPageCount,
    incrementCurrentPageCount,
    decrementCurrentPageCount
  } = usePagination(listLength, currentPageCount, setCurrentPageCount);

  return (
    <PageNationContainer>
      <PageButton onClick={decrementCurrentPageCount}>{'<'}</PageButton>
      {pageCountArr.map((number) => {
        return (
          <PageButton
            key={number}
            currentPage={currentPageCount + 1 === number}
            onClick={() => handleCurrentPageCount(number)}
          >
            {number}
          </PageButton>
        );
      })}
      <PageButton onClick={incrementCurrentPageCount}>{'>'}</PageButton>
    </PageNationContainer>
  );
}

export default PageNation;

const PageNationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button`
  margin: 3px;
  background-color: ${({ currentPage }) =>
    currentPage ? '#c0c0c0' : '#f0f0f0'};
  border: 1px solid #c0c0c0;
  border-radius: 5px;
  color: #505050;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: #c0c0c0;
  }
`;
