document.addEventListener('DOMContentLoaded', function() {
    const flashcardsContainer = document.getElementById('flashcards-container');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');

    // Create add card button
    const addCardBtn = document.createElement('div');
    addCardBtn.className = 'flashcard add-card-btn';
    addCardBtn.innerHTML = `
        <div class='flashcard-content'>
            <span class="plus-icon">+</span>
        </div>
    `;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Add New Flashcard</h2>
            <div class="form-group">
                <label for="question">Question:</label>
                <textarea id="question" required></textarea>
            </div>
            <div class="form-group">
                <label for="answer">Answer:</label>
                <textarea id="answer" required></textarea>
            </div>
            <button class="add-card-submit">Add Card</button>
        </div>
    `;
    document.body.appendChild(modal);

    const flashcards = [
        { question: 'Что такое интеграл?', answer: 'Интеграл - это математическая функция, представляющая собой сумму бесконечно малых величин.' },
        { question: 'Что такое производная?', answer: 'Производная - это мера изменения функции относительно изменения её аргумента.' },
        { question: 'Что такое вектор?', answer: 'Вектор - это направленный отрезок, имеющий длину и направление.' },
        { question: 'Что такое матрица?', answer: 'Матрица - это прямоугольная таблица чисел, расположенных в определенном порядке.' },
        { question: 'Что такое предел функции?', answer: 'Предел функции - это значение, к которому стремится функция при приближении аргумента к заданной точке.' },
        { question: 'Что такое логарифм?', answer: 'Логарифм числа по заданному основанию - это показатель степени, в которую надо возвести основание, чтобы получить данное число.' }
    ];

    function createFlashcard(cardData, animate = true) {
        const cardElement = document.createElement('div');
        cardElement.className = 'flashcard';
        if (animate) {
            cardElement.style.opacity = '0';
            cardElement.style.transform = 'translateY(20px)';
        }
        cardElement.innerHTML = `<div class='flashcard-content'>${cardData.question}</div>`;

        // Add flip animation on click
        cardElement.addEventListener('click', function() {
            const content = this.querySelector('.flashcard-content');
            cardElement.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                content.textContent = content.textContent === cardData.question ? cardData.answer : cardData.question;
                cardElement.style.transform = 'rotateY(360deg)';
            }, 150);
        });

        return cardElement;
    }

    // Create and append flashcards with animation
    flashcards.forEach((card, index) => {
        const cardElement = createFlashcard(card);
        flashcardsContainer.appendChild(cardElement);

        // Animate card entrance
        setTimeout(() => {
            cardElement.style.transition = 'all 0.5s ease';
            cardElement.style.opacity = '1';
            cardElement.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Add the add-card button after all flashcards
    flashcardsContainer.appendChild(addCardBtn);

    // Modal functionality
    addCardBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const addCardSubmit = modal.querySelector('.add-card-submit');
    addCardSubmit.addEventListener('click', () => {
        const question = document.getElementById('question').value.trim();
        const answer = document.getElementById('answer').value.trim();

        if (question && answer) {
            const newCard = createFlashcard({ question, answer }, false);
            flashcardsContainer.insertBefore(newCard, addCardBtn);
            
            // Reset form
            document.getElementById('question').value = '';
            document.getElementById('answer').value = '';
            modal.style.display = 'none';

            // Animate new card
            setTimeout(() => {
                newCard.style.transition = 'all 0.5s ease';
                newCard.style.opacity = '1';
                newCard.style.transform = 'translateY(0)';
            }, 50);
        }
    });

    // Login button click handler
    loginBtn.addEventListener('click', () => {
        alert('Login functionality coming soon!');
    });

    // Signup button click handler
    signupBtn.addEventListener('click', () => {
        alert('Sign up functionality coming soon!');
    });
});