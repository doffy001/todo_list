import cn from 'classnames';

export default function Main({ todos, setTodos, isAllCompleted }: Readonly<{ todos: any, setTodos: any, isAllCompleted: boolean }>) {
  const handleToggleAll = (): void => {
    setTodos(todos.map((todo: any): any => {
      return {
        ...todo,
        isCompleted: !isAllCompleted,
      }
    }))
  }

  const handleToggleTodoItem = (i: number): void => {
    setTodos(todos.map((todo: any, j: number): any => {
      return {
        ...todo,
        isCompleted: (i === j ? !todo.isCompleted : todo.isCompleted),
      }
    }))
  }

  const handleDbClickTodoItem = (e: any, i: number): void => {
    setTimeout(() => {
      e.target.closest('li').querySelector('.edit').focus();
    }, 0);
    setTodos(todos.map((todo: any, j: number): any => ({
      ...todo,
      isEditing: (i === j ? !todo.isEditing : todo.isEditing),
    })))
  }

  const handleSaveValue = (e: any, i: number): void => {
    if (e.type !== 'blur' && e.key !== 'Enter' && e.key !== 'Escape') return;
    let isEscape: boolean = false;
    if (e.type === 'blur' || e.key === 'Enter') {
      if (!isEscape) {
        const newValue = e.target?.value.trim();
        setTodos(todos.map((todo: any, j: number): any => {
          return i === j
          ? {
            ...todo,
            value: newValue || todo.value,
            isEditing: false,
          }
          : {
            ...todo
          }
        }))
        e.target.value = newValue;
      };
    } else if (e.key === 'Escape') {
      isEscape = true;
      const newValue = '';
      setTodos(todos.map((todo: any, j: number): any => {
        if (i === j) e.target.value = todo.value;
        return i === j
        ? {
          ...todo,
          value: newValue || todo.value,
          isEditing: false,
        }
        : {
          ...todo
        }
      }))
    }
  }

  return !todos.length
    ? <></>
    : (
      <>
        { /* This section should be hidden by default and shown when there are todos */ }
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={handleToggleAll}
            checked={isAllCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            { /* These are here just to show the structure of the list items */ }
            { /* List items should get the className `editing` when editing and `completed` when marked as completed */ }
            {
              todos.map((todo: any, i: number) => (
                <li
                  key={todo.id}
                  className={cn({
                    'completed': todo.isCompleted,
                    'editing': todo.isEditing,
                  })}
                >
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => {handleToggleTodoItem(i)}}
                    />
                    <label onDoubleClick={(e) => {handleDbClickTodoItem(e, i)}}>{todo.value}</label>
                    <button className="destroy"></button>
                  </div>
                  <input
                    className="edit"
                    onBlur={(e) => {handleSaveValue(e, i)}}
                    onKeyDown={(e) => {handleSaveValue(e, i)}}
                    defaultValue={todo.value}
                  />
                </li>
              ))
            }
            {/* <li className="completed">
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Taste JavaScript</label>
                <button className="destroy"></button>
              </div>
              <input className="edit" />
            </li>
            <li>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Buy a unicorn</label>
                <button className="destroy"></button>
              </div>
              <input className="edit" />
            </li> */}
          </ul>
        </section>
      </>
    )
}