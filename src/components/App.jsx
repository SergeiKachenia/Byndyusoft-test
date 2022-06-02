import styles  from '../App.css'
import React, {useState} from 'react';

export function App() {
const [error, setError] =useState('');
const [result, setResult] = useState('');
const [inputData, setInputData] = useState({value: ''});

const handleChange= (e) => { setInputData({...inputData,
  value: e.target.value})}

const minValSum = (digits) => {
                // принимает на вход строку из инпута, делает из нее массив строк,
                // чистит все пробелы,лишние запятые и любые другие знаки и превращает в массив чисел

              let digitsArr = digits.split(',').filter(item => item !== '').map(parseFloat)
              // для удобства
              console.log(digitsArr);
              if (inputData.value === '') {
                setResult('');
                setError('Поле не должно быть пустым');
            }
              else if (digitsArr.some(isNaN)) {
                setResult('');
                setError('Вы добавили в последовательность строку. Данные невалидны.');
            } else if (digitsArr.length < 3) {
                setResult('');
                setError('Пожалуйста, введите минимум три числа');
              } else if (digitsArr.length > 20) {
                setResult('');
                setError('Пожалуйста, введите до двадцати чисел')
              } else {
                // сортирует по возрастанию массив чисел, обрезает все, кроме первых двух и конкатенирует их
                  const result = digitsArr.sort((x, y) => x - y).slice(0, 2).reduce((acc, i) => acc + i, 0);
                  setError('');
                  setResult('Результат: ' + result);
                  setInputData({value: ''})
              }
  }

  const clickHandler = () => {
  minValSum(inputData.value);
  }

  const display = result? 'block' : 'none';


  return (
    <div className="page-wrapper">
        <h1 className='test-heading'>Тестовое задание Byndyusoft</h1>
        <p className="heading">Введите от трех до двадцати любых чисел через запятую</p>
        <form>
            <input className="input-numbers js-input" type="text" value={inputData.value} onChange={handleChange} placeholder="Введите последовательность чисел"/>
            <button className='test-button' type="button" onClick={clickHandler} >Проверка</button>
        </form>
        <p className="result-message" data-testid="result" style={{display}}>{result}</p>
        <p className="error-message" data-testid="error">{error}</p>
        </div>
  );
}

export default App;
