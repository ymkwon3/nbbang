import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../elements/index";

import { RiSearchLine } from "react-icons/ri";
import { actionCreator as searchAction } from '../redux/modules/post';

// const SearchBox = (props) => {

//     class Handler_class extends Component {
//         state = {
//             inputValue: ""
//         }
//     };

//     handleChange = (e) => {     // input값으로 inputValue 변경 함수
//         const {taeget: value} = e
//         this.setState({
//             inputValue: e.target.value,
//         })
//     }

//     const handleClick = (e) => {
//         this.setState({
//         inputValue:""
//         })
//     };

    
//     return (
//         <div>
//             <input type="text" placeholder="검색어를 입력해주세요" onChange={(e) => this.handleChange(e)} />
//             <Button _onClick={() => this.handleClick()}><RiSearchLine size="27.22" color="#19253D" /></Button>
//         </div>
//     );
    
// }

// export default SearchBox;



export default function SearchBox() {
    // const [searchTerm, setSearchTerm] = React.useState("");
    const dispatch = useDispatch();
    // const { searchTerm, setSearchTerm } = props;


    const [searchTerm, setSearchTerm] = React.useState("");
    console.log(searchTerm)


    // const handleClick = (e) => {
    //     this.setState({
    //         inputValue:""
    //     })

    // }

    return (
        <div>
            <input type="text" placeholder="검색어를 입력해주세요" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
            <Button _onClick={() => dispatch(searchAction.searchPost(searchTerm))}><RiSearchLine size="27.22" color="#19253D" /></Button>
        </div>
    )
};
// 인풋에 입력시 온체인지 발생
// handleChange 함수에서 현재 input ㅏㄱㅂㅅ을 이벤트 객체에서 target.value 로 받아온다.
// 이벤트 객체를 통해서 전달받은 값을 setState를 통해 새로운 input state 값으로 수정.
// onSubmit 함