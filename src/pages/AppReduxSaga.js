import React, {Component} from 'react';
import {createStore, combineReducers, bindActionCreators, applyMiddleware} from "redux";
import {Provider, connect} from "react-redux";
import createSagaMiddleware, {delay} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";

// Reducer:
const initialState = {
    gruss: "Salve",
    name: "Mr. Know Body"
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

// Middleware:
//const middleware = applyMiddleware(thunk);
const middleware = createSagaMiddleware();
const storeEnhancer = applyMiddleware(middleware);

// Erzeugung des Application-Store mit dem Root-Reducer:
const store = createStore(rootReducer, storeEnhancer);

// Create Saga:
const saga = function*() {
    console.log("saga");
    yield takeEvery("ONCHANGE_GRUSS", grussListener)
};

const grussListener = function*({gruss}) {
    yield delay(3000);
    yield put({type: "UPDATE_GRUSS", gruss: gruss.toUpperCase()});
};
middleware.run(saga);


// Erzeugung der Presentation-Komponente, deren Eingabe-Werte
// durch den Container befüllt werden (Dependency Injection)
const Presentation = ({gruss, name, createUpdateGrussAction, createUpdateNameAction}) => {
    return (
        <div>
            <DataDisplay
                gruss={gruss}
                name={name}/>
            <DataInput
                gruss={gruss}
                name={name}
                onGrussChange={(e) => createUpdateGrussAction(e.target.value)}
                onNameChange={(e) => createUpdateNameAction(e.target.value)}/>

        </div>)
}

// Komponente der Presentation zur Anzeige des States:
function DataDisplay({gruss, name}) {
    return <div className="presentationRead">
        <p>{gruss}, {name}!!</p>
        <p>Wie gehts Dir?</p>
    </div>
}

// Komponente der Presentation zum Update des States:
function DataInput({gruss, name, onGrussChange, onNameChange}) {
    return <div className="presentationWrite">
        Gruss: <input type="text" content={gruss} onChange={onGrussChange}/>
        <span
            style={{color:"red"}}>(Displayed with Delay by using Effects in a saga-generator function using redux-saga)</span><br/>
        Name: <input type="text" content={name} onChange={onNameChange}/><br/>
    </div>
}

// ActionCreators:
const createUpdateGrussAction = (gruss) => ({
    type: "ONCHANGE_GRUSS", gruss
});
const createUpdateNameAction = (name) => ({
    type: "UPDATE_NAME", name
});

// Erzeugung des Containers, der Zugang zum State besitzt
// und die Presentation mit dem State verbindet
const mapStateProps = state => {
    return {gruss: state.reducer1.gruss, name: state.reducer2.name}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    createUpdateGrussAction,
    createUpdateNameAction
}, dispatch);

// Der Container befüllt die Presentation mittels
// Auslesen des State und Schreiben in den State mittels
// des dispatch-Callbacks.
const Container = connect(mapStateProps, mapDispatchToProps)(Presentation)

export default () =>(
    <Provider store={store}>
        <Container />
    </Provider>
);

