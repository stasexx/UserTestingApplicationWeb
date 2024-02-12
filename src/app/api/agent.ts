import axios, { AxiosResponse } from 'axios';
import { store } from '../stores/store';
import { Token, User, UserName } from '../models/user';
import { Test } from '../models/test';
import { QuestionOption } from '../models/question';


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = 'http://localhost:5002';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    try {
        await sleep(1);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;
const responseBodyItems = <T> (response: AxiosResponse<T>) => response.data.items;

const requests = 
{
    getMapping: <T> (url: string) => axios.get<T>(url).then(responseBodyItems),
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    postUrl: <T> (url: string) => axios.post<T>(url).then(responseBody),
    put: <T> (url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    putUrl: <T> (url: string) => axios.put<T>(url).then(responseBody)
}

const Account = {
    current: () => requests.get('/users/get'),
    login: (user: UserName) => requests.post<Token>('/users/login', user),
    register: (user: UserName) => requests.post<User>('users/register', user)
}

const Tests = {
    list: (id: string) => requests.getMapping<Test[]>(`/tests/list/${id}?pageNumber=1&pageSize=30`),
}

const Questions = {
    list: (id: string) => requests.get<QuestionOption[]>(`/questions/list/${id}?pageNumber=1&pageSize=30`),
}

const Testing = {
    submit: (testId: string, userId: string, score: number) => requests.putUrl<null>
    (`/update/testId=${testId}/userId=${userId}/score=${score}`),
}

const agent = 
{
    Account,
    Tests,
    Questions,
    Testing
}

export default agent;