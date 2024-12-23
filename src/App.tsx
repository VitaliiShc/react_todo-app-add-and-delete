import React, { useEffect, useMemo, useState } from 'react';
import { TodosHeader } from './components/TodosHeader';
import { TodoList } from './components/TodoList';
import { TodosFooter } from './components/TodosFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { getTodos, addTodo, USER_ID, deleteTodo } from './api/todos';
import { ErrorMessage } from './types/ErrorMessage';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [filterValue, setFilterValue] = useState<StatusFilter>(
    StatusFilter.All,
  );
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [todoIdsToDel, setTodoIdsToDel] = useState<number[]>([]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterValue) {
        case StatusFilter.Active:
          return !todo.completed;
        case StatusFilter.Completed:
          return todo.completed;
        case StatusFilter.All:
        default:
          return true;
      }
    });
  }, [todos, filterValue]);

  const addNewTodoHandler = async (title: string) => {
    setTempTodo({ title, id: 0, completed: false, userId: USER_ID });
    try {
      await addTodo(title);
      setTodos(await getTodos());
    } catch (err) {
      setErrorMessage(ErrorMessage.AddError);
      throw err;
    } finally {
      setTempTodo(null);
    }
  };

  const deleteTodoHandler = async (todoId: number) => {
    setTodoIdsToDel(prevIds => [...prevIds, todoId]);
    try {
      await deleteTodo(todoId);
      setTodos(await getTodos());
    } catch (err) {
      setErrorMessage(ErrorMessage.DeleteError);
      throw err;
    } finally {
      setTodoIdsToDel(prevIds => prevIds.filter(id => id !== todoId));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setTodos(await getTodos());
      } catch (err) {
        setErrorMessage(ErrorMessage.LoadError);
      }
    })();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader
          addNewTodoHandler={addNewTodoHandler}
          setErrorMessage={setErrorMessage}
          tempTodo={tempTodo}
        />

        {!!todos.length && (
          <>
            <TodoList
              todos={filteredTodos}
              tempTodo={tempTodo}
              deleteTodoHandler={deleteTodoHandler}
              todoIdsToDel={todoIdsToDel}
            />
            <TodosFooter
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              todos={todos}
              deleteTodoHandler={deleteTodoHandler}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
