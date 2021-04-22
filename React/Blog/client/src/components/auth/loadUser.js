import store from "../../store";
import { USER_LOADING_REQUEST } from "../../redux/types";

// 이건 functional component가 아니고 그냥 함수!
function loadUser(){
    try {
        store.dispatch({ //스토어에서 
            type: USER_LOADING_REQUEST,
            payload: localStorage.getItem("token"),
        });
    } catch (e) {
        console.log(e);
    }
}

export default loadUser;