//VARIABLES
let position = 0
const container = document.querySelector('.reviews__container')
const wrapper = document.querySelector('.reviews__wrapper')
const positionShift = wrapper.clientWidth
const items = document.querySelectorAll('.reviews__item')
const itemsCount = items.length

const positionIndicators = document.querySelectorAll('.reviews__posIndicator')
const posIndicatorsArray = Array.from(positionIndicators)
const pos = document.querySelectorAll('.reviews__posIndicator')
const btnPrev = document.querySelector('.reviews__buttonPrev')
const btnNext = document.querySelector('.reviews__buttonNext')

let index = 0
let activeDot = 0
let clickedDot = 0

const indicatorShiftRight = function() {
    index++
    positionIndicators.item(index).classList.add('reviews__position--active')
    // positionIndicators.item((index-1)).classList.remove('reviews__position--active')
}

const indicatorShiftLeft = function() {
    index--
    positionIndicators.item(index).classList.add('reviews__position--active')
    // positionIndicators.item((index+1)).classList.remove('reviews__position--active')
}


const checkPosIndicators = function() {
    for(const item of positionIndicators) {
        item.classList.contains('reviews__position--active')
        item.classList.remove('reviews__position--active')
    }
}

const checkActiveIndicator = function() {
    for(const item of posIndicatorsArray) {
        if(item.classList.contains('reviews__position--active')) {
            return (activeDot = posIndicatorsArray.indexOf(item) + 1)
        }
    }
}

const setPosition = function() {
    wrapper.style.transform = `translateX(${position}px)`
}


const checkBtns = function() {
    if (btnPrev.disabled = position === 0) {
        btnPrev.classList.add('reviews__button--inactive')
    } else {btnPrev.classList.remove('reviews__button--inactive')}
    
    if (btnNext.disabled = position <= -((itemsCount - 1) * positionShift)) {
        btnNext.classList.add('reviews__button--inactive')
    } else {btnNext.classList.remove('reviews__button--inactive')}
}

// BUTTONS
btnPrev.addEventListener('click', function() {
    position += positionShift

    checkPosIndicators()
    checkBtns()
    setPosition()
    indicatorShiftLeft()
})

btnNext.addEventListener('click', function() { 
    position -= positionShift
    
    checkPosIndicators()
    checkBtns()
    setPosition()
    indicatorShiftRight()
})


//DOTS INDICATOR
for (const indicator of posIndicatorsArray) {
    indicator.addEventListener('click', function() {
        checkActiveIndicator()
        let clickedDot = posIndicatorsArray.indexOf(indicator) + 1
        
        if(clickedDot > activeDot) {
            index += (clickedDot - activeDot)

            position -= positionShift * (clickedDot - activeDot)
            setPosition()
            
            checkPosIndicators()
            indicator.classList.add('reviews__position--active')
            
            checkBtns()
        } else if (clickedDot < activeDot) {
            index -= (activeDot - clickedDot)

            position += positionShift * (activeDot - clickedDot)
            setPosition()

            checkPosIndicators()
            indicator.classList.add('reviews__position--active')

            checkBtns()
        }
    })
}
