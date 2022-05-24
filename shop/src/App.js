import {useState} from "react";
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import './App.css';
import data from './data.js';
import Detail from './pages/detail.js';
import axios from 'axios';
//import bg from './img/bg.png';

// inline 스타일로 배경이미지 넣을 때 : <div className="main-bg" style={{ backgroundImage : 'url(' + bg +')'}}></div>
// public 폴더 안에 파일은 압축되지 않음
// publc 폴더 이미지 쓰는 권장방식 : <img src={process.env.PUBLIC_URL + '/logo192.png'} /> 
// 페이지 이동도와주는 useNavigate()
// navigate(1):앞으로 한번 가기, navigage(-1) : 뒤로 1번 가기

// ajax 사용하면 새로고침 없이도 GET/POST요청 가능
// ajax 쓰려면 옵션 3개 중 택1  : 1.XMLHttpRequest 2.fetch() 3.axios(엑시오스) : npm install axios
// POST 요청하는 법 : axios.post('URL', {name : 'choi'}) => 이거 실행하면 서버로 {name : 'choi'} 자료가 전송된다.

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{ navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/detail')}}>Detail</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      {/* 
        <Link to="/">홈</Link>
        <Link to="/detail">상세페이지</Link> 
      */}

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <Container>
                <Row>
                    {
                      shoes.map((a, i)=>{
                          return (
                          <Card shoes = {a} i = {i} />
                          )
                      })
                    }
                </Row>
            </Container>
            <button onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((결과)=>{ //결과는 실제로 가져온 데이터
                let copy = [...shoes, ...결과.data]; // shoes에 가져온 데이터 추가
                setShoes(copy);
              })
              .catch(()=>{ 
                console.log('실패')
              }) // ajax 코드가 실패했을 때

              Promise.all([axios.get('/url1'), axios.get('/url2')])
              .then(()=>{

              })
            }}>더보기</button>
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

        {/* 
          Nested Routes : <Route>안에 <Route>를 넣을 수 있는데 이것을 Nested Routes라고 부른다.
          nested routes의 element 보여주는 곳은 <Outlet>
         */}
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버</div>} />
          <Route path="location" element={<div>위치정보</div>} />
        </Route> 
        
        <Route path="*" element={<div>없는 페이지 입니다.</div>} />
      </Routes>
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  return(
    <Col>
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="80%" alt="" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </Col>
  )
}
export default App;
