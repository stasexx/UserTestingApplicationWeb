import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import TestStore from "./testStore";



interface Store{
    commonStore: CommonStore,
    userStore: UserStore,
    testStore: TestStore
}

export const store: Store = {
   commonStore: new CommonStore(),
   userStore: new UserStore(),
   testStore: new TestStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}