import {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {style} from './Todo';
import {
  createTable,
  deleteTask,
  fetchTask,
  insertTask,
  updateTask,
} from './TodoDb';

const TodoDB = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    createTable();
    (async () => {
      const fetchedTask = await fetchTask();
      setTasks(fetchedTask);
    })();
  }, []);

  async function handleSubmit() {
    if (!task) {
      Alert.alert('field should be filled');
      return;
    }
    if (editId === null) {
      await insertTask(task);
      console.log('task added', task);
    } else {
      await updateTask(editId, task);
      console.log('task updated');
      setEditId(null);
    }
    const fetchedTask = await fetchTask();
    setTasks(fetchedTask);
    setTask('');
  }

  async function handleDelete(id) {
    await deleteTask(id);
    const fetchedTask = await fetchTask();
    setTasks(fetchedTask);
  }

  async function handleEdit(item) {
    setTask(item.task);
    setEditId(item.id);
  }

  return (
    <View style={style.container}>
      <View>
        <Text style={style.todoHead}>TO DO List</Text>
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="enter the task"
          style={style.taskInput}
        />
        <TouchableOpacity style={style.addTask} onPress={handleSubmit}>
          <Text style={style.addTaskText}>
            {editId ? 'Edit task' : 'Add Task'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        style={style.taskList}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item}) => (
          <View style={style.todoShow}>
            <Text style={style.todoText}>{item.task}</Text>
            <TouchableOpacity
              style={style.editTask}
              onPress={() => handleEdit(item)}>
              <Text style={style.editText}>Edit Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.deleteP}
              onPress={() => handleDelete(item.id)}>
              <Text style={style.deleteC}></Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TodoDB;
