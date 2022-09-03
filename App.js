import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { render } from 'react-dom';
import { Text, View,SafeAreaView, Platform, Button, TouchableOpacity} from 'react-native';
import styles from './styleSheet'

export default class App extends Component {

  constructor (){
    super()
    this.state ={
      inputText : "",
      resultText : ""
    }
    this.ops=['AC','DEL','+','-','*','/']
  }

  calculateResult(){
    const text = this.state.inputText
    //console.log(text,eval(text))
    this.setState({
      resultText : eval(text)
    })

  }

  validate(){
    const text = this.state.inputText.split('').pop()
    switch(text){
      case '+':
      case '-':
      case '*':
      case '/':
        return false 
    }
    return true
  }

  buttonPressed(text){
    if(text == '='){
      return this.validate() && this.calculateResult()
    }
    this.setState({
      inputText : this.state.inputText + text
    })
  }

  operate(operation){
    if(operation == 'AC'){
      this.setState({
        inputText : "",
        resultText : ""
      })
    }
    switch(operation){
      case 'DEL':
        let text = this.state.inputText.split('')
        text.pop()
        this.setState({
          inputText : text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.inputText.split('').pop()
        if(this.ops.indexOf(lastChar)>0) return
        if(this.state.text == "") return
        this.setState({
          inputText : this.state.inputText + operation
        })
    }
  }

  render() {
    let num=[[7,8,9],[4,5,6],[1,2,3],['.',0,'=']]
    let nums=[]
    for(let i=0; i<4; i++){
      let row=[]
      for(let j=0; j<3; j++){
        row.push(
          <TouchableOpacity key={num[i][j]} onPress={() => this.buttonPressed(num[i][j])} style={styles.touch}>
            <Text style={styles.btnText}>{num[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      nums.push(<View key={i} style={styles.numrow}>{row}</View>)
    }

    let operations=[]
    for(let i=0; i<6; i++){
      operations.push(<TouchableOpacity key={this.ops[i]} onPress={() => this.operate(this.ops[i])} style={styles.touch}>
        <Text style={styles.btnText}>{this.ops[i]}</Text>
      </TouchableOpacity>)
    }
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.inputText}>{this.state.inputText}</Text>
        </View>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
              {nums}
          </View>
          <View style={styles.operators}>
                {operations}
          </View>
        </View>
      </View>
    );
  }
  }
  
