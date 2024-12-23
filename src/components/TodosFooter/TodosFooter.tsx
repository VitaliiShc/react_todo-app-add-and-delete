import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { TodoFilter } from '../TodoFilter';
import { StatusFilter } from '../../types/StatusFilter';
import { Todo } from '../../types/Todo';

type Props = {
  filterValue: StatusFilter;
  setFilterValue: Dispatch<SetStateAction<StatusFilter>>;
  todos: Todo[];
  deleteTodoHandler: (todoId: number) => Promise<void>;
};

export const TodosFooter: React.FC<Props> = props => {
  const { filterValue, setFilterValue, todos, deleteTodoHandler } = props;

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const activeTodosQuantity = useMemo(
    () => todos.length - completedTodos.length,
    [completedTodos, todos],
  );

  const hasCompleted = useMemo(
    () => Boolean(completedTodos.length),
    [completedTodos],
  );

  const clearCompleted = useCallback(() => {
    completedTodos.forEach(todo => {
      return deleteTodoHandler(todo.id);
    });
  }, [completedTodos, deleteTodoHandler]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosQuantity} items left
      </span>

      <TodoFilter filterValue={filterValue} setFilterValue={setFilterValue} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
