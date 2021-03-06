import { connect } from 'react-redux';
import { toggleTodo, VisibilityFilters } from '../actions'
import TodoList from '../dumb/TodoList';
import { visibilityFilters } from '../actions/index';

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter)       
    }
};
const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}
const mapDispatchProps = dispatch => {
    return {
        toggleTodo: id => {
            dispatch(toggleTodo(id));
        }
    }
}

const VisibleTodoList = connect(mapStateToProps, mapDispatchProps)(TodoList);

export default VisibleTodoList;