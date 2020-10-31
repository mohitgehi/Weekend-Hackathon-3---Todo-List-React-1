import React from "react";
import "./../styles/App.css";

function App() 
{

	const [tasks, setTasks] = React.useState([]);
	const task = React.useRef();
	const editedTask = React.useRef();
	const [selectedTask, setSelectedTask] = React.useState(null);

	const saveTask = () => {
		if (task.current.value === '') return;
		const value = task.current.value;
		task.current.value = '';
		setTasks(tasks => [...tasks, {
			id: value + tasks.length,
			name: value
		}])
	}

	const editTask = (id) => {
		if (editedTask.current.value === '') return;
		const value = editedTask.current.value;
		editedTask.current.value = '';
		let tasksRep = tasks.map(task => {
			let newTask = {...task}
			if(task.id === id) newTask.name = value;
			return newTask
		})
		setTasks(tasks => tasksRep)
		setSelectedTask(null);
	}

	const deleteTask = (id) => {
		let tasksRep = tasks.filter(task => task.id !== id)
		setTasks(tasks => tasksRep)
	} 

	const edit = (id) => {
		setSelectedTask(id)
	}

	return (
	<div id="main">
	//Do not alter main div
	//Please do not alter the functional component as tests depend on the type of component.
	<textarea id="task" ref={task} rows="4" cols="50"></textarea>
	<button id="btn" onClick={saveTask}>save</button>
	<ol>
		{
			tasks.map(task => (
				<li key={task.id}>
					<span   className="list">{task.name}</span>
					<button className="delete" onClick={() => deleteTask(task.id)}>delete</button>
					<button className="edit" onClick={() => edit(task.id)}>edit</button>
					{
						selectedTask === task.id ? 
						<>
						<textarea ref={editedTask} className="editTask" rows="4" cols="50"></textarea>
						<button className="saveTask" onClick={() => editTask(task.id)}>save</button>
						</>
						:
						null
					}
				</li>
			))
		}
	</ol>
	</div>
	);
}


export default App;
