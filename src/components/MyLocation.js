// /* global kakao */
// import React from "react";
// import { Button, Flex } from "../elements";

// import {BiCurrentLocation} from "react-icons/bi";

// function MyLocation() {
//     function setCenter() {            
    
//         navigator.geolocation.getCurrentPosition(
//             position => {
//                 console.log(position)
//                 const userLat = position.coords.latitude;
//                 const userLng = position.coords.longitude;
                
//                 // 이동할 위도 경도 위치를 생성합니다 
//                 var moveLatLon = new kakao.maps.LatLng(userLat, userLng);
                
//                 // 지도 중심을 이동 시킵니다
//                 map.setCenter(moveLatLon);
//             }
//         )

//         // 이동할 위도 경도 위치를 생성합니다 
//         var moveLatLon = new kakao.maps.LatLng(userLat, userLng);
//         return(
//             // 지도 중심을 이동 시킵니다
//             map.setCenter(moveLatLon);
//         )
//     }
    
    
//     const buttonStyles = {
//         width: "50px",
//         height: "50px",
//         borderRadius: "0",
//       };

//     return(
//         <Button
//             styles={{
//                 ...buttonStyles,
//                 borderRadius:"15px",
//                 boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
//                 margin:"0 0 5px"
//             }}
//             // _onClick={() => setCenter()}
//         >
//             <BiCurrentLocation/>
//         </Button>
        
//     )
// }

// export default MyLocation;