import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer, updateTaskAC
} from './tasks-reducer';
import {TasksStateType} from '../../app/App';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Hi
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Hi
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Hi
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2",
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Hi
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2",
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Hi
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2",
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Hi
            }
        ]
    };
})


test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'id exists',
        description: ''
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC("2", {status:TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("2", {title:"Node JS"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Node JS");
    expect(endState["todolistId1"][1].title).toBe("JS")
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: "dvdv",
        order: 0,
        title: 'new todolist',
        addedDate: ''
    });

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined()
});

test('empty arrays should be added when we set TodolistsList', () => {

    const action = setTodolistsAC([
        {id: '1', title: "title 1", order: 0, addedDate: ''},
        {id: '2', title: "title 2", order: 0, addedDate: ''}
    ])

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);

    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
});
test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)

});