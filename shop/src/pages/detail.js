import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom"
import { Nav } from "react-bootstrap"
import { addItem } from "./../store.js"
import { useDispatch } from "react-redux"

// 컴포넌트의 Lifecyle (중간중간 코드실행 가능)
// - 페이지에 장착 : mount
// - 가끔 업데이트 : update
// - 필요없으면 제거 : unmount

// Side Effect : 함수의 핵심기능과 상관없는 부가기능

function Detail(props) {
 
    let {id} = useParams();
//  유저가 URL파라미터에 입력한거 가져오려면 useParams()

    let 찾은상품 = props.shoes.find((x)=>x.id == id);
//  let 찾은상품 = props.shoes.find(function(x){ return x.id == id }); 
//  array자료.find(()=>{ return 조건식}) 이렇게 쓰면 조건식에 맞는 자료를 찾아서 이 자리에 남겨준다.
//  find() 콜백함수에 파라미터 넣으면 array자료에 있던 자료를 뜻한다. 
//  조건식 x.id == id : array자료.id == url에 입력한 번호 일 경우 결과를 변수에 담아준다.
//  arrow function에서 return과 중괄호는 동시에 생략가능

    let [alert, setalert] = useState(true);
    let [탭, 탭변경] = useState(0);
    let dispatch =  useDispatch();

    useEffect(()=>{
        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거 = JSON.parse(꺼낸거)
        꺼낸거.push(찾은상품.id)
        꺼낸거 = new Set(꺼낸거)
        꺼낸거 = Array.from(꺼낸거)
        localStorage.setItem('watched', JSON.stringify(꺼낸거))
    }, [])

    useEffect(()=>{
        let a = setTimeout(()=>{ setalert(false) }, 2000)
        
        return ()=>{
            clearTimeout(a) //기존타이머는 제거
        } // clean up function: useEffect 동작 전에 실행, (참고) mount시 실행안됨/unmount시 실행됨
    }, [])
    // mount,update시 코드 실행해주는 useEffect

    // useEffect 안에 있는 코드는 html 렌더링 후에 동작한다.
    // useEffect 안에 적는 코드들은 어려운 연산, 서버에서 데이터가져오는 작업, 타이머 장착하는거
    // useEffect 실행조건 넣을 수 있는 곳은 []

    // useEffect(()=>{ })     1.재렌더링마다 코드실행하고 싶으면
    // useEffect(()=>{ }, []) 2.mount시 1회 코드실행하고 싶으면
    // useEffect(()=>{
    //      return ()=>{ 3.unmount시 1회 코드 실행하고 싶으면}
    //}, [])
    // useEffect(()=>{ }, [state명]) 4.특정 state 변경 시에만 실행하려면 [state명]
    
    return (
        <div className="container">
            {
                alert == true ?
                <div className="alert alert-warning">
                    2초이내 구매시 할인
                </div>
                : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (찾은상품.id+1) +'.jpg'} width="100%" alt="" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{ 찾은상품.title }</h4> 
                    <p>{ 찾은상품.content }</p>
                    <p>{ 찾은상품.price }</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem({id : 찾은상품.id, name : 찾은상품.title , count : 1}))
                    }}>주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                <Nav.Link eventKey="link0" onClick={()=>{탭변경(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link1" onClick={()=>{탭변경(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link2" onClick={()=>{탭변경(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭} />
            <Outlet></Outlet>
            <button onClick={()=>{props.navigate(-1)}}>목록</button>
        </div> 
    )
}

function TabContent({탭}) {
    //if (탭 == 0){return <div>내용0</div>}
    //if (탭 == 1){return <div>내용1</div>}
    //if (탭 == 2){return <div>내용2</div>}
    return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]
}
export default Detail;