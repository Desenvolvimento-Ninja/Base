import Api, {Response, Callback} from "../helpers/Api";

export default class Base {
    LINK = this.constructor.name.toLowerCase();

    cache: any = undefined;

    constructor(public Api: Api, public id ?: number | string){
    }

    protected get api(){
        return this.Api.new();
    }

    protected async data(): Promise<any> {
        const self = this;

        if (typeof self.cache === "undefined") {
            return await self.get();
        }

        if (typeof self.cache !== "undefined") {
            return self.cache;
        }
    }

    protected async new(args: any): Promise<Response>{
        return await this.api.post(this.LINK, args);
    }

    protected async get(args ?: any, callback ?: Callback): Promise<any | null>{
        if(!this.id) return null;

        const communication = await this.api.get(this.LINK + '/' + this.id, args, callback);
        return this.cache = await communication.return;
    }

    protected async getAll(args ?: any, callback ?: Callback): Promise<any | null>{
        const communication = await this.api.get(this.LINK, args, callback);
        return this.cache = await communication.return;
    }

    protected async search(args ?: any, name ?: string, page ?: number, callback ?: Callback){
        const communication = await this.api.get(this.LINK + '/search', args, callback);
        return this.cache = await communication.return;
    }

    protected async update(args: any): Promise<Response>{
        return await this.api.put(this.LINK + '/' + this.id, args);
    }

    protected async delete(): Promise<Response>{
        return await this.api.delete(this.LINK + '/' + this.id);
    }
}
