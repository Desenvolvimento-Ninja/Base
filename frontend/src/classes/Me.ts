import { Injectable } from '@angular/core';
import Api, {Callback, Response} from '../helpers/Api';
import Base from "../classes/Base";
export interface UserInterface {
    id: number
}

@Injectable()
export default class Me extends Base{
    constructor(public Api: Api){
        super(Api);
    }

    async login(login: string, password: string){
        const self = this;
        const user = { login: login, password: password };
        await localStorage.setItem('user', JSON.stringify(user));

        const response = await self.api.get(self.LINK);

        if(!response.success){
            return false;
        }

        self.cache = response.return;
        await localStorage.setItem('user', JSON.stringify(response.return));
        return response.return;
    }

    get logged(): Promise<boolean>{
        const self = this;
        return new Promise(async resolve => {
            const user = await self.get();
            resolve("id" in user);
        });
    }

    async get(args ?: any, callback ?: Callback): Promise<UserInterface | null>{
        const self = this;
        const response = await self.api.get(self.LINK);

        if(!response.success){
            return null;
        }

        self.cache = response.return;
        await localStorage.setItem('user', JSON.stringify(response.return));

        if(callback){
            callback(response.return)
        }

        return response.return;
    }

    async update(args: any): Promise<Response> {
        const self = this;
        const data = await self.get();

        for(let item in args){
            data[item] = args[item];
        }

        const update = await super.update(args);

        if(await update.success){
            await self.get();
        }

        return update;
    }

    async logout(){
        return await localStorage.removeItem('user');
    }
}
