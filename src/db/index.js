import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';

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

    async register(email, password) {
        try {
            const result = await this.client.collection("users").create({
                email,
                password,
                passwordConfirm: password,
            });

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

    async generateQuiz(list) {
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
            this.createQuiz('Quiz', 'Language', questionsid, user.id)
        } catch (err) {
            console.error(err);
        }
    }
}

export const db = new DatabaseClient();

export default db;