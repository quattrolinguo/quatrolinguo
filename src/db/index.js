import PocketBase from 'pocketbase';

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
                email: email,
                password: password,
                passwordConfirm: password,
            });
            console.log('register result:', result);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid email or password");
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

    async getOption(id) {
        try {
            const result = await this.client.collection("options").getOne(id);
            console.log('get option by id:', result);
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    async getOptionIdList(id) {
        try {
            const result = await this.client.collection("questions").getOne(id);
            console.log('get optionIdList:', result.options)
            return result.options;
        } catch (err) {
            console.error(err);
        }
    }

    async getOptionList(questionId) {
        try {
            const optionIdList = await db.getOptionIdList(questionId);
            const optionList = [];
            for (const optionId of optionIdList) {
                const option = await db.getOption(optionId);
                optionList.push(option);
            }
            return optionList
        } catch (err) {
            console.error(err);
        }
    }

    async getQuestion(id) {
        try {
            const result = await this.client.collection("questions").getOne(id);
            console.log('get question by id:', result);
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    async getQuestionIdList(id) {
        try {
            const result = await this.client.collection("quizzes").getOne(id);
            console.log('get questions:', result.questions)
            return result.questions;
        } catch (err) {
            console.error(err);
        }
    }

    async getQuestionList(quizId) {
        try {
            const questionIdList = await db.getQuestionIdList(quizId);
            const questionList = [];
            for (const questionId of questionIdList) {
                const question = await db.getQuestion(questionId);
                questionList.push(question);
            }
            return questionList;
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
        const optionsIdList = [];
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
                console.log('created option:', result);
                optionsIdList.push(result.id);
            }
            return optionsIdList
        } catch (err) {
            console.error(err);
        }
    }

    async createQuestion(question, optionsIdList) {
        try {
            const record = {
                question: question,
                options: optionsIdList
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
            return result.id;
        } catch (err) {
            console.error(err);
        }
    }

    async generateQuiz(userId, list, title, language) {
        try {
            const questionsIdList = [];
            for (const item of list) {
                const optionsIdList = await this.createOptions(item.options, item.answer);
                console.log(optionsIdList)
                const questionId = await this.createQuestion(item.question, optionsIdList);
                await this.updateOptionsWithQuestion(optionsIdList, questionId);
                questionsIdList.push(questionId);
            }
            const quizId = await this.createQuiz(title, language, questionsIdList, userId)
            await this.updateQuestionsWithQuiz(questionsIdList, quizId);


        } catch (err) {
            console.error(err);
        }
    }

    async updateQuestionsWithQuiz(questionsIdList, quizId) {
        try {
            for (const questionId of questionsIdList) {
                const result = await this.client.collection("questions").update(questionId, {
                    'parentQuiz+': quizId,
                });
                console.log('updated question:', result);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async updateOptionsWithQuestion(optionsIdList, questionId) {
        try {
            for (const optionId of optionsIdList) {
                const result = await this.client.collection("options").update(optionId, {
                    'parentQuestion+': questionId,
                });
                console.log('updated option:', result);
            }
        } catch (err) {
            console.error(err);
        }
    }
}


export const db = new DatabaseClient();

export default db;