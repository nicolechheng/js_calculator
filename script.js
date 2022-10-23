class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currOperandTextElement = currOperandTextElement
        this.clear()
    }

    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {

    }

    appendNumber(number) {
        this.currOperand = number
    }

    chooseOperation(operation) {

    }

    compute() {
    
    }

    updateDisplay() {
        this.currOperandTextElement.innerText = this.currOperand
    }

}

const numbersButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-equals]")
const allClearButton = document.querySelector("[data-equals]")
const prevOperandTextElement = document.querySelector("[data-prev-operand]")
const currOperandTextElement = document.querySelector("[data-curr-operand]")

const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
