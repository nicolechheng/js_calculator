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
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.'))
            return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currOperand === '')
            return
        if(this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(curr))
            return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '%':
                computation = prev / curr
                break
            case '*':
                computation = prev * curr
                break
            default:
                return
        }
        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerNumber = parseFloat(stringNumber.split('.')[0])
        const decimalNumber = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerNumber)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerNumber.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalNumber != null) {
            return `${integerDisplay}.${decimalNumber}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currOperandTextElement.innerText = this.getDisplayNumber(this.currOperand)

        if (this.operation != null) {
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandTextElement.innerText = ''
        }

    }

}

const numbersButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const prevOperandTextElement = document.querySelector("[data-prev-operand]")
const currOperandTextElement = document.querySelector("[data-curr-operand]")

const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

