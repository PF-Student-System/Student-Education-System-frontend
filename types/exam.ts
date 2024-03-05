// exam.ts

export interface Exam {
    examName: string;
    questions: Question[];
}

export interface Question {
    questionText: string;
    options: string[];
    correctOptionIndex: number;
}

export const myExam: Exam = {
    examName: "Sample Exam",
    questions: [
        {
            questionText: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Rome"],
            correctOptionIndex: 1
        },
        {
            questionText: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Cell membrane"],
            correctOptionIndex: 2
        },
        {
            questionText: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter", "Mercury"],
            correctOptionIndex: 0
        },
        {
            questionText: "Who wrote 'Romeo and Juliet'?",
            options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
            correctOptionIndex: 0
        },
        {
            questionText: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "NaCl", "O2"],
            correctOptionIndex: 0
        },
        {
            questionText: "What is the largest mammal?",
            options: ["Elephant", "Blue whale", "Giraffe", "Polar bear"],
            correctOptionIndex: 1
        }
    ]
};
