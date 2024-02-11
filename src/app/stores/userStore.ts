import agent from "../api/agent";
import { User, UserName } from "../models/user";
import {makeAutoObservable, runInAction} from 'mobx'
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !! this.user;
    }

    login = async (creds: UserName) =>{
        // eslint-disable-next-line no-useless-catch
        try{
            const user = await agent.Account.login(creds);
            runInAction(()=>{
                this.user = user;
            })
            console.log(user);
        } catch (error) {
            throw error;
        }

    }
}