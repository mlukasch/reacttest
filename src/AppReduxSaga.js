import React, {Component} from 'react';
import './App.css';
import {createStore, combineReducers} from "redux";
import {Provider, connect} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";

// InitialState:
const initialState = {
    gruss: "...",
    name: "Nobody"
}

// Reducers:
const reducer1 = (state = initialState, {type, gruss}) => {
    switch (type) {
        case "UPDATE_GRUSS":
            return {...state, type, gruss};
        case "DROP_GRUSS":
            return {...state, type, gruss: "..."};
        default:
            return state;
    }
}

const reducer2 = (state = initialState, {type, name}) => {
    switch (type) {
        case "UPDATE_NAME":
            return {...state, type, name};
        case "DROP_NAME":
            return {...state, type, name: "..."};
        default:
            return state;
    }
}

const rootReducer = combineReducers(reducer1, reducer2)

// Store:
const store = createStore(rootReducer)

// Container:
/*const Container = props => {
 return
 <div>
 <PresentationRead
 gruss={props.containerState}
 name={props.containerName}
 dispatch={props.containerDispatch}/>
 <PresentationWrite
 onNameChange={(event) => props.containerDispatch({type: "UPDATE_NAME", name: event.target.value})}
 onGrussChange={(event) => props.containerDispatch({type: "UPDATE_GRUSS", name: event.target.value})}/>
 </div>
 }
 */
const Container = props => {
    return
    <div>
        Hallo
        /*<PresentationRead gruss="hallo" name="Maik"/>*/
    </div>
}


const mapStateProps = state => {
    containerGruss: state.gruss
}

const mapDispatchToPros = dispatch => {
    return {containerDispatch: dispatch}
}

//connect(mapStateProps, mapDispatchToPros)(Container)

// Presentations:
function PresentationRead(props) {
    return <div className="presentationRead">
        <p>{props.gruss}, {props.name}!!</p>
        <p>Wie gehts Dir?</p>
    </div>
}

function PresentationWrite(props) {
    return <div className="presentationWrite">
        Gruss: <input type="text" content={props.gruss} onChange={props.onGrussChange}/><br/>
        Name: <input type="text" content={props.name} onChange={props.onNameChange}/><br/>
    </div>
}

class App extends Component {
    render() {
        return (
            // <Provider store={store}>
            <Container />
            //</Provider>
        );
    }
}

export default App;
