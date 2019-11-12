import { Injectable } from '@angular/core';
import Api, {Response} from './Api';
import Model from "./Model";
export interface UserInterface {
    id: number
}

const LINK = 'me';

@Injectable()
export default class Me extends Model{
    constructor(public Api: Api){
        super(Api);
    }

    async login(login: string, password: string): Promise<UserInterface | false>{
        const self = this;
        const user = { login: login, password: password };
        await localStorage.setItem('user', JSON.stringify(user));

        const response = await self.api.new().get(LINK);

        if(!response.success){
            return false;
        }

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

    async get(args ?: any): Promise<UserInterface | null>{
        const self = this;
        const response = await self.api.new().get(LINK);

        if(!response.success){
            return null;
        }

        await localStorage.setItem('user', JSON.stringify(response.return));

        return response.return;
    }

    async update(args: any): Promise<Response> {
        const self = this;
        const data = await self.get();

        for(let item in args){
            data[item] = args[item];
        }

        const update = await self.api.new().put(LINK, args);

        if(await update.success){
            await self.get();
        }

        return update;
    }

    async logout(){
        return await localStorage.removeItem('user');
    }
}
