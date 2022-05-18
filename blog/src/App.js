/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천','강남 우동 맛집','파이썬 독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <button onClick={()=>{
        let copy = [...글제목];
        copy[0] = '여자 코트 추천';
        글제목변경(copy);
      }}>글수정</button>
      <button onClick={()=>{
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy);
      }}>가나다순</button>

      {/* <div className="list">
        <h4>{ 글제목[0] }<span onClick={ ()=>{ 따봉변경(따봉+1) } }>👍</span>{ 따봉 }</h4>
        <p>5월 9일 발행</p>
      </div> 
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>5월 9일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=>{
          if(modal == false) setModal(true);
          else setModal(false);
        }}>{ 글제목[2] }</h4>
        <p>5월 9일 발행</p>
      </div> */}

      {
        글제목.map(function(a, i){ // a는 array안에 있는 각각의 자료임, i는 반복문 돌때 마다 0부터 1씩 증가
          return (
            <div className="list" key={ i }>
              <h4 onClick={()=>{setModal(!modal); setTitle(i);}}>{ 글제목[i] }
              <span onClick={(e)=>{ 
                e.stopPropagation();
                let copy = [...따봉];
                copy[i] = copy[i] + 1;
                따봉변경(copy)
               }}>👍</span>{ 따봉[i] }
               </h4>
              <p>5월 9일 발행</p>
              <button onClick={()=>{
                let copy = [...글제목];
                 copy.splice(i, 1);
                 글제목변경(copy);
               }}>삭제</button>
            </div> 
          )
        })
      }

      <input onChange={(e)=>{입력값변경(e.target.value);}} /> 

      <Profile />

      <button onClick={()=>{
        let copy = [...글제목];
        copy.unshift(입력값);
        글제목변경(copy);
      }}>글추가</button>

      {
        modal == true ? <Modal 글제목변경={글제목변경} 글제목={글제목} title={title}/> : null
      } 
    </div>
  );
}

function Modal(props){
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        let copy = [...props.글제목];
        copy[0] = '여자코트추천';
        props.글제목변경(copy);
      }}>글수정</button>
    </div>
  )
}

//component만드는 기본 문법 (예전 리액트 문법)
class Profile extends React.Component {
  constructor(){
    super();
    this.state = { name : 'kim', age : 30 }
  }

  changeName(){
    this.setState( {name: 'Park'} )
  }

  render(){
     return (
       <div>
          <h3>프로필입니다</h3>
          <p>저는 { this.state.name }</p>
          <button onClick = {this.changeName.bind(this)}> 버튼 </button>
        </div>
     )
  }
}




export default App;
