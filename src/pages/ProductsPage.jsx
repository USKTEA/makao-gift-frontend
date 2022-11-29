import { Link } from 'react-router-dom';

export default function ProductsPage() {
  return (
    <>
      <div>이것은 배너입니다.</div>
      <p>인기선물을 한 자리에 모았어요</p>
      <ul>
        <li>
          <Link to="/">
            <div>
              <img src="https://ui.assets-asda.com/dm/asdagroceries/7622210400970_T1?defaultImage=asdagroceries/noImage&resMode=sharp2&id=sUwSd0&fmt=jpg&dpr=off&fit=constrain,1&wid=256&hei=256" alt="상품사진" />
            </div>
            <span>제조사</span>
            <p>여기에는 상품 옵션이 들어가고 최대 두 줄입니다요</p>
            <span>00,000원</span>
          </Link>
        </li>
      </ul>
      <nav>
        <ul>
          <li>
            <Link
              to="/products?page=1"
              className="page-number"
            >
              1
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
