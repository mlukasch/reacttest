import React, {Component} from 'react';
import {createStore, combineReducers} from "redux";
import {Provider, connect} from "react-redux";

// Reducer:
const initialState = {
    gruss: "...",
    name: "Nobody"
}

// Reducer für gruss-property des state:
const reducer1 = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_GRUSS":
            return {...state, gruss: action.gruss};
        case "DROP_GRUSS":
            return {...state, gruss: "..."};
        default:
            return state;
    }
}

// Reducer für name-property des state:
const reducer2 = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_NAME":
            return {...state, name: action.name};
        case "DROP_NAME":
            return {...state, name: "..."};
        default:
            return state;
    }
}

// Kombination aller Reducer zu einem RootReducer:
const rootReducer = combineReducers({reducer1, reducer2})

// Erzeugung des Application-Store mit dem Root-Reducer:
const store = createStore(rootReducer)

// Erzeugung der Presentation-Komponente, deren Eingabe-Werte
// durch den Container befüllt werden (Dependency Injection)
const Presentation = ({containerState, containerDispatch}) => {
    return (
        <div>
            <DataDisplay
                gruss={containerState.reducer1.gruss}
                name={containerState.reducer2.name}
                dispatch={containerDispatch}/>
            <DataInput
                gruss={containerState.reducer1.gruss}
                name={containerState.reducer2.name}
                onGrussChange={(e) => containerDispatch({type: "UPDATE_GRUSS", gruss: e.target.value})}
                onNameChange={(e) => containerDispatch({type: "UPDATE_NAME", name: e.target.value})}/>

        </div>)
}

// Komponente der Presentation zur Anzeige des States:
function DataDisplay(props) {
    return <div className="presentationRead">
        <p>{props.gruss}, {props.name}!!</p>
        <p>Wie gehts Dir?</p>
    </div>
}

// Komponente der Presentation zum Update des States:
function DataInput(props) {
    return <div className="presentationWrite">
        Gruss: <input type="text" content={props.gruss} onChange={props.onGrussChange}/><br/>
        Name: <input type="text" content={props.name} onChange={props.onNameChange}/><br/>
    </div>
}

// Erzeugung des Containers, der Zugang zum State besitzt
// und die Presentation mit dem State verbindet
const mapStateProps = state => {
    return {containerState: state}
}

const mapDispatchToProps = dispatch => {
    return {containerDispatch: (action) => dispatch(action)}
}
// Der Container befüllt die Presentation mittels
// Auslesen des State und Schreiben in den State mittels
// des dispatch-Callbacks.
const Container = connect(mapStateProps, mapDispatchToProps)(Presentation)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
}

export default App;
