import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import TestStore from "./testStore";
import QuestionStore from "./questionStore";

interface Store{
    commonStore: CommonStore,
    userStore: UserStore,
    testStore: TestStore,
    questionStore: QuestionStore
}

export const store: Store = {
   commonStore: new CommonStore(),
   userStore: new UserStore(),
   testStore: new TestStore(),
   questionStore: new QuestionStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}