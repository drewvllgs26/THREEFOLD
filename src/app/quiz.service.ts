import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private app = initializeApp(environment.firebaseConfig);
    private firestore = getFirestore(this.app);

    constructor() { }

    async getQuestions(quizId: string): Promise<any[]> {
        try {
            const questionsCollection = collection(this.firestore, `quizzes/${quizId}/questions`);
            const questionsSnapshot = await getDocs(questionsCollection);
            const questionsList = questionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return questionsList;
        } catch (e) {
            console.error('Error fetching questions:', e);
            return [];
        }
    }

    async saveResult(quizId: string, result: { correct: number; incorrect: number;}): Promise<void> {
        try {
            const resultsCollection = collection(this.firestore, `quizzes/${quizId}/result`);
            await addDoc(resultsCollection, result);
        } catch (e) {
            console.error('Error saving result:', e);
        }
    }
    
}
