import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import Task from '../Task';
import { useState } from 'react';

interface TaskItem {
  id: string;
  completed: boolean;
  title: string;
  description?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  taskList: {
    marginTop: 20,
  },
});

export default function Index() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: taskTitle,
          description: taskDescription,
          completed: false,
        },
      ]);
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Afazeres</Text>
      <TextInput
        style={styles.input}
        placeholder="Título da tarefa"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição (opcional)"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <Button title="Adicionar tarefa" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Task
            title={item.title}
            description={item.description}
            completed={item.completed}
            onDelete={() => deleteTask(item.id)}
            onToggleComplete={() => toggleTaskComplete(item.id)}
          />
        )}
        style={styles.taskList}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}
