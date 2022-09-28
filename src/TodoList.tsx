import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, ObjectType, TasksType} from './App';
import {Button} from "./components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
    setTodo : (arr : Array<ObjectType>) => void
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.id)
    }

    const addTaskHandler = () => {
        props.addTask(title, props.id)
        setTitle('')
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID, props.id)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    return <div>
        <h3> {props.title}
            <Button name={'del todo'} callBack={removeTodolistHandler}/>
            {/*<button onClick={() => {'removeTodolist'}}>x</button>*/}
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button name={'+'} callBack={addTaskHandler}/>
            {/*<button onClick={() => {'addTask'}}>+</button>*/}
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }

                    // const removeTaskHandler=()=>{
                    //     props.removeTask(t.taskId,props.id)
                    // }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={'delete task'} callBack={() => removeTaskHandler(t.taskId)}/>
                        {/*<button onClick={() => {'removeTask'}}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <Button name={'All'} callBack={() => props.changeFilter('all', props.id)}/>
            {/*<Button name={'All'} callBack={() => changeFilterHandler('all')}/>*/}
            <Button name={'Active'} callBack={() => changeFilterHandler('active')}/>
            <Button name={'Completed'} callBack={() => changeFilterHandler('completed')}/>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""} onClick={()=>{}}>All</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""} onClick={()=>{}}>Active</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""} onClick={()=>{}}>Completed</button>*/}
        </div>
        <p></p>
        {
            props.students.map((el, idx) => {
                return <div key={idx}>{el}</div>
            })
        }
    </div>
}


