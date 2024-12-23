import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  deleteTodoHandler: (todoId: number) => Promise<void>;
  todoIdsToDel: number[];
};

export const TodoList: React.FC<Props> = props => {
  const { todos, tempTodo, deleteTodoHandler, todoIdsToDel } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodoHandler={deleteTodoHandler}
          isLoading={todoIdsToDel.includes(todo.id)}
        />
      ))}
      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          isLoading
          deleteTodoHandler={deleteTodoHandler}
        />
      )}
    </section>
  );
};
