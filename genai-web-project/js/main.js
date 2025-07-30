// This file contains the JavaScript code for the web application. It includes functions for interactivity, such as handling user input, managing events, and manipulating the DOM.

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Update active nav button state
        document.querySelectorAll('.nav-button').forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('onclick').includes(sectionId)) {
                button.classList.add('active');
            }
        });
    }
}

function toggleVisibility(elementId, isChecked) {
    const element = document.getElementById(elementId);
    if (isChecked) {
        element.style.display = 'block';
        setTimeout(() => element.style.opacity = 1, 10);
    } else {
        element.style.opacity = 0;
        setTimeout(() => element.style.display = 'none', 500);
    }
}

function switchTab(prefix, tabId) {
    const container = document.getElementById(prefix);
    container.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    container.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(`${prefix}-${tabId}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

const promptDetails = {
    'p-task': { title: '🎯 Task: Be Specific', text: 'Clearly state what you want the AI to do. Use strong action verbs like "Draft," "Summarize," "Compare," "Generate," or "Translate."' },
    'p-context': { title: '🌍 Context: Set the Scene', text: 'Provide relevant background information. Who is the audience? What is the goal? The more context, the more tailored the response.' },
    'p-format': { title: '📑 Format: Define the Structure', text: 'Specify the output format you need. Should it be a bulleted list, a table, an email, a poem, or a JSON object?' },
    'p-persona': { title: '🧑‍💼 Persona: Assign a Role', text: 'Tell the AI who to be. "Act as a marketing expert," or "You are a friendly customer service agent." This shapes the tone and style.' },
    'p-example': { title: '✨ Example: Show, Don\'t Just Tell', text: 'Provide an example of the output you want. This is one of the most effective ways to guide the AI to the desired style and structure.' }
};

function showPromptDetail(detailKey) {
    const detailBox = document.getElementById('prompt-detail-box');
    const detailTitle = document.getElementById('prompt-detail-title');
    const detailText = document.getElementById('prompt-detail-text');

    detailTitle.textContent = promptDetails[detailKey].title;
    detailText.textContent = promptDetails[detailKey].text;

    detailBox.style.display = 'block';
}

let selectedQuizOption = null;
function selectQuizOption(questionId, optionId) {
    selectedQuizOption = optionId;
    document.querySelectorAll(`#quiz-question-container .quiz-option`).forEach(el => el.classList.remove('selected'));
    document.getElementById(`q${questionId}-op${optionId}`).classList.add('selected');
}

function submitQuiz(questionId, correctOptionId) {
    const correctFeedback = document.getElementById(`quiz-feedback-${questionId}-correct`);
    const incorrectFeedback = document.getElementById(`quiz-feedback-${questionId}-incorrect`);

    correctFeedback.style.display = 'none';
    incorrectFeedback.style.display = 'none';

    if (selectedQuizOption === null) {
        alert('Please select an answer!');
        return;
    }

    if (selectedQuizOption === correctOptionId) {
        correctFeedback.style.display = 'block';
    } else {
        incorrectFeedback.style.display = 'block';
    }
}

window.onload = function () {
    const ctx = document.getElementById('synergyChart').getContext('2d');
    const synergyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Brainstorming & Creativity', 'Data Grounding & Accuracy', 'Content Generation', 'Research & Synthesis'],
            datasets: [{
                label: 'Gemini Strengths',
                data: [90, 40, 85, 50],
                backgroundColor: 'rgba(211, 84, 0, 0.6)',
                borderColor: 'rgba(211, 84, 0, 1)',
                borderWidth: 1
            }, {
                label: 'NotebookLM Strengths',
                data: [30, 95, 40, 90],
                backgroundColor: 'rgba(44, 62, 80, 0.6)',
                borderColor: 'rgba(44, 62, 80, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Relative Strength Score'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Complementary Strengths of Gemini and NotebookLM',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });

    // Set initial active nav button
    document.querySelector('.nav-button').classList.add('active');
};