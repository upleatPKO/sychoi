import { useParams } from "react-router-dom";

// 유저가 URL파라미터에 입력한거 가져오려면 useParams()
// arrow function에서 return과 중괄호는 동시에 생략가능

function Detail(props) {

    let {id} = useParams(); 
    let 찾은상품 = props.shoes.find((x)=>x.id == id);

    return (
        <div className="container">
            <div className="row">
            <div className="col-md-6">
                <img src={'https://codingapple1.github.io/shop/shoes' + (찾은상품.id+1) +'.jpg'} width="100%" alt="" />
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{ 찾은상품.title }</h4> 
                <p>{ 찾은상품.content }</p>
                <p>{ 찾은상품.price }</p>
                <button className="btn btn-danger">주문하기</button> 
            </div>
            </div>
        </div> 
    )
}
export default Detail;

