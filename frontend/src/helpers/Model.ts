import Api, {Response, Callback} from "./Api";
import {Injectable} from "@angular/core";

@Injectable()
export default class Model {
    constructor(public api: Api){
    }

    new(link: string, id ?: number | string){
        return new Object(this.api, link, id);
    }
}

class Object {
    public api;

    constructor(readonly Api: Api, readonly link: string, readonly id ?: number | string){
        this.api = this.Api.new();
    }

    protected async new(args: any): Promise<Response>{
        return await this.api.post(this.link, args);
    }

    protected async get(args ?: any): Promise<Response>{
        if(!this.id) throw new Error('Você precisa preencher um id');
        return await this.api.get(this.link + '/' + this.id, args);
    }

    protected async getAll(args ?: any, page: number = 0, limit = 10): Promise<Response | null>{
        return await this.api.get(this.link + '/' + page + '/' + limit, args);
    }

    protected async search(args ?: any, page: number = 0, limit = 10){
        return await this.api.get(this.link + '/search/' + page + '/' + limit, args);
    }

    protected async update(args: any): Promise<Response>{
        if(!this.id) throw new Error('Você precisa preencher um id');
        return await this.api.put(this.link + '/' + this.id, args);
    }

    protected async delete(): Promise<Response>{
        if(!this.id) throw new Error('Você precisa preencher um id');
        return await this.api.delete(this.link + '/' + this.id);
    }
}
