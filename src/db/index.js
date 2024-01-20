import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import { title } from 'process';

export const POCKET_BASE_URL = "https://quattro-lingo.pockethost.io/";

export class DatabaseClient {
    constructor() {
        this.client = new PocketBase(POCKET_BASE_URL);
        this.client.autoCancellation(false);
    }

    async authenticate(email, password) {
        try {
            const result = await this.client.collection("users").authWithPassword(email, password);
            console.log('authenticate result:', result);
            if (!result?.token) {
                throw new Error("Invalid email or password");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid email or password");
        }
    }

    async register(username, email, password) {
        try {
            const result = await this.client.collection("users").create({
                username: username,
                email: email,
                password: password,
                passwordConfirm: password,
            });
            console.log('register result:', result);
            return result;
        } catch (err) {

        }
    }

    async isAuthenticated(cookieStore) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.isValid || false
    }

    async getUser(cookieStore) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.model;
    }

    async getOptionByID(id) { 
        try {
            const result = await this.client.collection("options").get(id);
            console.log('get option by id:', result);
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    async getQuestionByQuizId(id) {
        try {
            const result = await this.client.collection("quizzes").getOne(id);
            console.log('get question by id:', result);
            return result;
        } catch (err) {
            console.error(err);
        }
    }
    

    async getFullQuizById(id) {
        try {
            const result = [];
            const questions = await this.client.collection("quizzes").getQuestionByQuizId(id).questions;

            for (const question of questions) {
                const options = await this.client.collection("questions").getOptionsByQuestionId(question.id);
                for (const option of options) {
                    const answer = await this.client.collection("options").getAnswerByOptionId(option.id);
                    result[question.id] = {
                        question: question.question,
                        options: options,
                        answer: answer,
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    async getAnswerByQuestionID(id) {
        try {
            const result = await this.client.collection("answers").getOne(id);
            console.log('get answer by id:', result);
            return result;
        } catch (err) {
            console.error(err);
        }
    }
s
    async createOptions(optionslist, answer) {
        const optionsid = [];
        try {
            for (const option of optionslist) {
                var is_correct = false;
                if (option == answer) {
                    is_correct = true;
                }
                const record = {
                    answer: option,
                    is_correct: is_correct,
                }
                const result = await this.client.collection("options").create(record);
                console.log('created answer:', result);
                optionsid.push(result.id);
            }
            return optionsid
        } catch (err) {
            console.error(err);
        }
    }

    async createQuestion(question, optionsid) {
        try {
            const record = {
                question: question,
                options: optionsid
            }
            const result = await this.client.collection("questions").create(record);
            console.log('created question:', result);
            return result.id;

        } catch (err) {
            console.error(err);
        }
    }

    async createQuiz(title, language, questionsid, user) {
        try {
            const record = {
                'title': title,
                'language': language,
                'questions': questionsid,
                'user': user,
            }
            const result = await this.client.collection("quizzes").create(record);
            console.log('created quiz', result);
        } catch (err) {
            console.error(err);
        }
    }

    async generateQuiz(list, title, language) {
        const cookieStore = cookies();
        const user = await this.getUser(cookieStore);
        try {
            const questionsid = [];
            
            for (const item of list) {
                const answersid = await this.createOptions(item.options, item.answer);
                console.log(answersid)
                console.log(item.question)
                const questionid = await this.createQuestion(item.question, answersid);
                questionsid.push(questionid);
            }
            this.createQuiz(title, language, questionsid, user.id)
        } catch (err) {
            console.error(err);
        }
    }
}

export const db = new DatabaseClient();

export default db;