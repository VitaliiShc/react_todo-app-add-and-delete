import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from 'react';
import { ErrorMessage } from '../../types/ErrorMessage';
import { trimString } from '../../utils/trimString';
import { Todo } from '../../types/Todo';

type Props = {
  addNewTodoHandler: (value: string) => Promise<void>;
  setErrorMessage: Dispatch<SetStateAction<ErrorMessage | null>>;
  tempTodo: Todo | null;
};

export const TodosHeader: React.FC<Props> = props => {
  const { addNewTodoHandler, setErrorMessage, tempTodo } = props;

  const inputTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputTitleRef.current && !tempTodo) {
      inputTitleRef.current.focus();
    }
  }, [tempTodo]);

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!trimString(inputValue)) {
      setErrorMessage(ErrorMessage.EmptyTitle);
      setInputValue('');

      return;
    }

    try {
      await addNewTodoHandler(trimString(inputValue));
      setInputValue('');
    } catch (err) {
      throw err;
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={evt => setInputValue(evt.target.value)}
          ref={inputTitleRef}
          disabled={!!tempTodo}
        />
      </form>
    </header>
  );
};
