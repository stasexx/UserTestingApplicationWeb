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

    setUser = (name: string) => {
        this.user.name = name;
        console.log(name)
      }

    login = async (creds: UserName) =>{
        // eslint-disable-next-line no-useless-catch
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.accessToken);
            console.log(user.accessToken);
        } catch (error) {
            throw error;
        }

    }

    getCurrentUserId = (): string | null => {
        return this.user?.id ?? null;
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}