# [프론트엔드 개발자 실무 과제]

### **과제 요구사항**

- 위키페이지는 제목과 본문으로 구성되며 각각 텍스트입니다.

- 메인페이지에서는 여러개의 위키페이지제목이 목록으로 나옵니다.

- 메인페이지에 목록으로 보여지는 제목의 갯수는 5개이며, 5개가 넘어가면 페이지를 구분해서 표시합니다.

- 위키페이지 제목을 클릭하면 제목과 본문을 볼 수 있습니다.

- 위키페이지 본문에 다른 위키페이지의 제목이 있으면 자동으로 링크가 걸리고,클릭하면 해당 위키페이지로 이동합니다.

- 메인페이지에서 추가 버튼을 누르면 새로이 입력할 수 있는 창이 나오고, 제목과 내용을 입력할 수 있습니다.

- 위키내용페이지에는 수정 버튼이 있고, 수정을 누르면 내용을 수정해서 저장할 수 있습니다.

- 위키페이지 아래에는 위키페이지 제목을 포함하는 내용이 담긴 위키페이지의 제목을 나열합니다.

---

### **주요 구현사항**

컴포넌트 파일은 상태관리 로직을 최대한 숨기고 커스텀훅을 사용하여 분리했습니다.

또한 구현부에 조건부 렌더링과 같은 제 3자가 볼 때 한눈에 알아보기 어려운 구현방식은 지양했습니다.

- #### **Context API**

  - 전체 위키 게시글 데이터
  - 위키 게시글 **CUD** 및 유틸 함수
    - **R**의 경우 데이터를 **Context**에서 **State**로 선언했기 때문에 **Provider**에 포함시키는 것으로 대체
  - 현재 페이지네이션 상태값

  <br/>

  페이지 네이션의 경우 위키 게시글 데이터의 길이에 따라 영향을 받기 때문에
  하나의 **Context**에서 함께 관리했습니다.

- #### **useEditing**

  - 게시글 상세, 게시글 수정과 관련된 유틸함수
  - 게시글 수정과 관련된 상태값

    - 수정의 경우 라우팅 경로를 `/detail/:id/edit` 과 같이 분리했기 때문에 게시글 수정을 시작하고 게시글의 정보 초깃값을 따로 저장할 필요 없이 **WikiEditing** 컴포넌트에서 **useEditing** 커스텀훅을 실행하여 반환받은 객체를 사용했습니다 (커스텀훅 실행시에 넘겨준 인자를 통해 해당 게시글의 정보를 초깃값으로 자동 저장합니다).

    ```javascript
    export default function useEditing(wikiData, id) {
      const currentWikiData = wikiData.find((wiki) => wiki.id === Number(id));

      // 인자로 넘겨받은 id와 일치하는 게시글의 제목, 내용 초기값
      const { title, description } = currentWikiData;

      // 현재 보고있는 게시글의 제목, 내용 (수정될 수 있다)
      const [input, setInput] = useState({ title, description });

      ...

    }
    ```

- **useHTML**

  - 게시글 내용에 포함된 타 게시글 제목을 링크로 자동 변환하는 로직
    - **React** 의 경우 바닐라 자바스크립트에서 **HTML**을 직접 조작하는 `innerHTML`과 같은 방법을 사용하면 가상 돔에서 변경된 부분을 감지할 수 없기 때문에 특수한 메서드인 `dangerouslysetinnerhtml`을 사용하여 업데이트 했습니다.
    - `dangerouslysetinnerhtml`을 사용하여 **HTML**을 직접 조작하는 경우 게시글 내용에 **XSS**공격을 위한 문자열을 작성했다면 보안상 문제가 생길 수 있습니다, 때문에 **sanitize-html** 라이브러리를 사용하여 커스텀훅의 인자로 받아온 게시글 내용을 `let currentResult = sanitize(currentDescription);` 이와 같이 처리해준 뒤 링크처리를 시행했습니다.
    - 게시글 A의 제목이 게시글 B의 제목에 포함되는 경우 유저 입장에서 고려해봤을 때 길이가 더 긴 게시글 제목을 의도했을 것이라고 생각하여 해당 키워드를 링크로 변환하는 처리를 전체 게시글 데이터를 각 게시글 제목의 길이를 기준으로 내림차순으로 정렬하여 시행했습니다.
      - 이미 변환된 더 긴 길이의 제목에 대해 짧은 길이의 제목을 변환처리 하는 과정에서 중복될 상황을 예방하기 위해서 먼저 처리된 게시글 제목을 배열에 저장해 둔 다음 현재 처리할 제목을 해당 배열의 원소들과 비교하며 각각에 대해 `true`가 반환되면 `{[title]: number}`의 형식으로 카운트된 횟수를 누적하여 현재 제목을 포함하지만 이미 링크처리된 문자열을 건너뛸 수 있도록 처리했습니다.
    - 한 게시물에 같은 링크가 여러번 존재 할 이유가 없다고 생각되어서 한번 링크처리된 키워드는 이후 문자열에 등장해도 무시하도록 했습니다.
  - 현재 게시글의 제목이 타 게시글 내용에 포함된 경우 해당 타 게시글 링크 배열을 반환하는 로직
    - 전체 위키 게시글의 데이터를 순회하며 해당 게시글의 내용에 현재 게시글의 제목이 포함되어 있으면 링크처리된 문자열을 배열에 `push`하는 방식으로 구현했습니다.
      - 이 과정에서 포함된 게시글의 제목이 현재 게시글의 제목과 같다면 무시하도록 처리했습니다.
  - 변환된 링크를 클릭했을 시 페이지를 이동하는 로직

    - `a`태그는 페이지를 이동하며 새로고침하는 기본동작이 포함되어있기 때문에 이전에 기록된 상태값이 전부 초기화됩니다, 하지만 이를 방지하기 위해 리액트 내장 컴포넌트인 `Link`를 사용하기에는 문자열을 **HTML**로 변환하는 작업을 통해 해당 기능을 구현하고 있었기 때문에 해당 문자열을 변환한 뒤 `Link` 컴포넌트로 인식하여 동작하지 않았습니다.

      - `a`태그의 기본동작을 막고 해당 `a`태그의 `href` 속성에 할당된 주소를 가져와서 `navigate` 객체로 상태값을 전달하며 페이지를 이동하도록 구현했습니다.

      ```javascript
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
      ```

- #### **usePagination**

  - 총 페이지 수
  - 페이지에 할당된 인덱스 값을 포함하는 데이터
  - 현재 위치한 페이지
  - 페이지 선택 이동 로직
  - 페이지 증감 로직
    - 첫 페이지와 마지막 페이지에서의 초과 이동을 제한하는 예외처리

  ```javascript
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
  ```

---

이상 구현 사항 설명입니다. 감사합니다!
