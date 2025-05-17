import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Todo = () => {
  const [task, setTask] = useState('');
  const [allTask, setAllTask] = useState([]);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  function handlePress() {
    if (task.trim() === '') return setErr(true);
    setErr(false);

    if (editTaskId !== null) {
      const edititedTask = allTask.map(val =>
        val.id === editTaskId ? {...val, value: task} : val,
      );
      setAllTask(edititedTask);
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setEditTaskId(null);
      }, 2000);
      setTask('');
      return;
    }

    setAllTask(preVal => [
      {id: Math.random().toString(), value: task},
      ...preVal,
    ]);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
    setTask('');
  }

  function handleDelete(id) {
    setAllTask(allTask.filter(val => val.id !== id));
  }

  function handleEdit(id) {
    const editedTask = allTask.find(t => t.id === id);
    setTask(editedTask.value);
    setEditTaskId(id);
  }

  return (
    <View style={style.container}>
      <View>
        <Text style={style.todoHead}>TO DO List</Text>
        <TextInput
          placeholder="enter the task"
          style={style.taskInput}
          onChangeText={setTask}
          value={task}
        />
        {show && (
          <Text style={style.successMsg}>
            {editTaskId !== null ? '✅ Task Updated' : '✅ Task Added'}
          </Text>
        )}
        <Text
          style={[
            {textAlign: 'center', color: 'red'},
            {display: err ? 'flex' : 'none'},
          ]}>
          *task not to be empty
        </Text>
        <TouchableOpacity style={style.addTask} onPress={handlePress}>
          <Text style={style.addTaskText}>
            {editTaskId !== null ? 'Update Task' : 'Add Task'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={style.taskList}
        contentContainerStyle={{paddingBottom: 20}}
        data={allTask}
        renderItem={({item}) => (
          <View style={style.todoShow}>
            <Text style={style.todoText}>{item.value}</Text>
            <TouchableOpacity
              style={style.editTask}
              onPress={() => handleEdit(item.id)}>
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

export const style = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 20,
    flex: 1,
  },
  addTask: {
    backgroundColor: 'blue',
    margin: 'auto',
    marginTop: 10,
    width: '80%',
  },
  addTaskText: {
    textAlign: 'center',
    color: '#fff',
    margin: 10,
    fontSize: 20,
  },
  todoHead: {
    fontSize: 30,
    textAlign: 'center',
    marginHorizontal: 20,
    fontWeight: 700,
    marginBottom: 20,
  },
  taskInput: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  todoShow: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  successMsg: {
    textAlign: 'center',
    color: 'green',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  todoText: {
    fontSize: 25,
    marginHorizontal: 10,
    marginVertical: 20,
    flex: 1,
  },
  editTask: {
    marginRight: 10,
    padding: 5,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#90EE90',
  },
  editText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 600,
  },
  deleteP: {
    backgroundColor: 'red',
    paddingVertical: 15,
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 10,
  },
  deleteC: {
    backgroundColor: 'white',
    width: 10,
    height: 2,
  },
});

export default Todo;
