import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import confetti from "canvas-confetti";

import { Square } from './components/Square';
import { TURNS} from "./constants"
import { checkWinner, checkEndGame} from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import { saveGameToStorage, resetGameStorage } from './logic/storage';
function App() {
const [board,setBoard] = useState( () =>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
})

const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
}) 

const [winner,setWinner] = useState(null) // null es que no hay ganador, false es que hay un empate

const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
    
}


const updateBoard = (index) => {
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({board: newBoard,turn: newTurn})
   

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
        confetti()
        setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
        confetti()
        setWinner(false)
    }
}


return (
    <main className='board'>
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
            {
            board.map((square,index) => {
                return (
                    <Square
                    key={index}
                    //EL key vendria ser un indice de cada elemento
                    //para asi poder renderizarlo
                    index={index}
                    updateBoard={updateBoard}
                    >
                        {board[index]}
                    </Square>
                )
            })
        }
        </section>

        <section className='turn'>
            <Square isSelected={turn == TURNS.X}>
                {TURNS.X}
            </Square>
            <Square isSelected={turn == TURNS.O}>
                {TURNS.O}
            </Square>
        </section>

       <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
 
 )
}

export default App
