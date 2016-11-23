import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

class Counter extends React.Component {
    render(){
        const {value, onIncreaseClick} = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}></button>
            </div>
        )
    }
}
Counter.PropTypes = {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
}

//Action
const increaseAction = {type : 'INCREASE'};

//Reducer
function counter(state = {count : 0},action){
    var count = state.count;
    switch(action.type){
        case 'INCREASE' : return {count : count+1};
        default : return state;
    }
}
//Store
const store = createStore(counter);

// Map Redux state to component props
const mapStateToProps = (state) => ({value : state.count});

// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => ({
    onIncreaseClick : () => {
        store.dispatch(increaseAction);
    }
})

// Connected Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)