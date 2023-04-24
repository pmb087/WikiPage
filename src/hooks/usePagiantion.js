export default function usePagination(
  listLength,
  currentPageCount,
  setCurrentPageCount
) {
  // 위키 리스트 총 페이지 수
  const pageCount = Math.ceil(listLength / 5);

  // 페이지네이션을 하기위한 숫자배열
  const pageCountArr = Array(pageCount)
    .fill()
    .map((_, i) => i + 1);

  // 버튼에 할당된 숫자를 이용해서 페이지 이동 (존재하는 페이지만을 가지고 버튼을 생성했기 때문에 예외는 없음)
  const handleCurrentPageCount = (count) => setCurrentPageCount(count - 1);

  // 현재 페이지 + 1로 이동하는 함수(최대 페이지를 넘을 수 없도록 예외처리)
  const incrementCurrentPageCount = () => {
    if (currentPageCount + 1 === pageCount) return;
    setCurrentPageCount((prev) => prev + 1);
  };

  // 현재 페이지 - 1로 이동하는 함수(1페이지보다 이전 페이지는 없으므로 예외처리)
  const decrementCurrentPageCount = () => {
    if (currentPageCount + 1 === 1) return;
    setCurrentPageCount((prev) => prev - 1);
  };

  return {
    pageCountArr,
    handleCurrentPageCount,
    incrementCurrentPageCount,
    decrementCurrentPageCount
  };
}
