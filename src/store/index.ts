import { createStore } from "redux";

const initialState = 0; 

type Increment = {
    type: "increment";
};

type Decrement = {
    type: "decrement";
};

type Actions = Increment | Decrement; 

function reducer(state = initialState, action: Actions){

    switch (action.type){
        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        default:
            return state;
    }
}

// function createStore(reducer){
//     let state;
//     let listeners = [];

//     function getState(){
//         return state;
//     }

//     function dispatch(action){
//         state = reducer(state, action);
//         listeners.forEach((l)=> l());
//     }

//     function subscribe(listener){
//         listeners.push(listener);
//         return function unsubscribe(){
//             listeners =listeners.filter((l) => l !== listener)
//         };
//     }
//     dispatch({type: "INIT"});

//     return{
//         getState,
//         dispatch,
//         subscribe,
//     };
// }
export const store = createStore(reducer)

const render = () => console.log(store.getState());

const unsubscribe = store.subscribe(render);

render();

store.dispatch({type: "increment"});
store.dispatch({type: "increment"});
store.dispatch({type:"decrement"});
unsubscribe();
store.dispatch({type: "increment"});