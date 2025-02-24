import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, FlatList, Pressable } from 'react-native'
import { useReducer, useState } from 'react'
import uuid from 'react-native-uuid'
import Constants from 'expo-constants'

const reducer = (state, action) => {
  switch (action.type) {
    case 'addTodo':
      return [...state, {text: action.todo, id: uuid.v4()}]
    case 'removeTodo':
      return state.filter((todo) => todo.id !== action.id)
    default:
      throw new Error()
  }
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [todo, setTodo ] = useState('')

  const handleAddClick = (todo) => {
    if (todo.trim() === '') {
      return
    } else {
      dispatch({type: 'addTodo', todo})
      setTodo('')
    }
  }

  const handleRemoveClick = (id) => {
    dispatch({type: 'removeTodo', id})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addTodoRow}>
        <TextInput
          value={todo}
          onChangeText={text => setTodo(text)} 
          placeholder='Add new...'
        />
        <Button
          title='Save'
          onPress={() => handleAddClick(todo)}
        />
      </View>
      <FlatList 
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Pressable onPress={() => handleRemoveClick(item.id)}>
            <Text style={styles.text}>{item.text}</Text>
          </Pressable>
        )}
      />
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  addTodoRow: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    marginTop: 8
  }
})
