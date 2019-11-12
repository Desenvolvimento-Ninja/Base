import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {retry, timeout} from 'rxjs/operators';
import {AppComponent} from '../app/app.component';

export const link = 'http://api.broowl.net/';
export type Callback = (response: Response) => void;

export interface ResponseInterface {
    readonly api;
    readonly error: boolean;
    readonly code: number;
    readonly message: string;
    readonly return: any;
}

const LOGIN_FIELD = 'cpf';
const PASSWORD_FIELD = 'password';

@Injectable()
export default class Base {
    url = 'http://localhost:8000/';
    development = false;

    constructor(
        public app: AppComponent,
        readonly http: HttpClient,
    ) {
        const self = this;
        console.log(self.url);

        // Se estiver em producao
        if (document.URL.indexOf('localhost') === -1) {
            self.url = link;
            self.development = false;
        } else {
            self.url = 'http://localhost:8000/';
            if (self.url.indexOf('localhost') > -1) {
                self.development = true;
            }
        }
    }

    public new() {
        return new Io(this);
    }
}

class Io {
    public retry = 5;
    public timeout = 90 * 1000;

    public success = false;
    public log = false;
    public cache = true;
    public error = true;
    public exception = true;
    public loader: any = true;

    private headers: HttpHeaders;

    constructor(private base: Base) {}

    public set(field: 'log' | 'cache' | 'error' | 'loader' | 'exception' | 'success', value: boolean) {
        this[field] = value;
        return this;
    }

    public async get(url, args ?: { [a: string]: any }): Promise<Response> {
        const self = this;
        const response = new Response();

        if (self.loader) {
            self.loader = self.base.app.new.loader();
            await self.loader.show();
        }

        return new Promise(async (resolve: Callback, reject) => {
            await self.setHeaders();

            self.base.http
                .get(self.base.url + url, {headers: self.headers, params: args || {}})
                .pipe(retry(self.retry))
                .pipe(timeout(self.timeout))
                .subscribe(
                    (data: Response) => {
                        for (const item in data) {
                            response[item] = data[item];
                        }

                        if (self.log) {
                            console.log('app/helpers/Api/Api/post', response, this);
                        }

                        if (self.loader) {
                            self.loader.dismiss();
                        }

                        if (response.error === false) {
                            resolve(response);
                        } else {
                            if (self.error) {
                                self.error_alert(data);
                            }

                            if (self.exception) {
                                reject(response);
                            } else {
                                resolve(response);
                            }
                        }
                    },
                    (error) => {
                        if (error.error) {
                            for (const item in error.error) {
                                response[item] = error.error[item];
                            }
                        }

                        console.error('app/helpers/Api/Api/get', error, this);

                        if (self.error) {
                            self.error_alert(response);
                        }

                        if (self.loader) {
                            self.loader.dismiss();
                        }

                        if (self.exception) {
                            reject(response);
                        } else {
                            resolve(response);
                        }
                    }
                );
        });

    }
    public async post(url: string, args: { [a: string]: any }): Promise<Response> {
        const self = this;
        const response = new Response();

        if (self.loader) {
            self.loader = self.base.app.new.loader();
            await self.loader.show();
        }

        return new Promise<Response>(async (resolve, reject) => {
            await self.setHeaders();

            self.base.http
                .post(self.base.url + url, args, {headers: self.headers})
                .pipe(retry(self.retry))
                .pipe(timeout(self.timeout))
                .subscribe(
                    (data: Response) => {
                        for (const item in data) {
                            response[item] = data[item];
                        }

                        if (self.log) {
                            console.log('app/helpers/Api/Api/post', response, this);
                        }

                        if (self.loader) {
                            self.loader.dismiss();
                        }

                        if (response.error === true) {
                            if (self.error) {
                                self.error_alert(data);
                            }

                            if (self.exception) {
                                reject(response);
                            } else {
                                resolve(response);
                            }
                        } else {

                            if (self.success) {
                                self.success_alert(data);
                            }

                            resolve(response);
                        }
                    },
                    (error: any) => {
                        if (error.error) {
                            for (const item in error.error) {
                                response[item] = error.error[item];
                            }
                        }

                        console.error('app/helpers/Api/Api/post', error, response, this);

                        if (self.error) {
                            self.error_alert(response);
                        }

                        if (self.exception) {
                            reject(response);
                        } else {
                            resolve(response);
                        }

                        if (self.loader) {
                            self.loader.dismiss();
                        }
                    }
                );
        });
    }
    public async put(url: string, args: { [a: string]: any }): Promise<Response> {
        const self = this;
        const response = new Response();

        if (self.loader) {
            self.loader = self.base.app.new.loader();
            await self.loader.show();
        }

        return new Promise<Response>(async (resolve, reject) => {
            await self.setHeaders();

            self.base.http
                .put(self.base.url + url, args, {headers: self.headers})
                .pipe(retry(self.retry))
                .pipe(timeout(self.timeout))
                .subscribe(
                    (data: Response) => {
                        for (const item in data) {
                            response[item] = data[item];
                        }

                        if (self.log) {
                            console.log('app/helpers/Api/Api/put', response, this);
                        }

                        if (self.loader) {
                            self.loader.dismiss();
                        }

                        if (response.error === true) {
                            if (self.error) {
                                self.error_alert(data);
                            }

                            if (self.exception) {
                                reject(response);
                            } else {
                                resolve(response);
                            }
                        } else {

                            if (self.success) {
                                self.success_alert(data);
                            }

                            resolve(response);
                        }
                    },
                    (error) => {
                        if (error.error) {
                            for (const item in error.error) {
                                response[item] = error.error[item];
                            }
                        }

                        console.error('app/helpers/Api/Api/put', error, response, this);

                        if (self.error) {
                            self.error_alert(response);
                        }

                        if (self.loader) {
                            self.loader.dismiss();
                        }

                        if (self.exception) {
                            reject(response);
                        } else {
                            resolve(response);
                        }
                    }
                );
        });
    }
    public async delete(url: string): Promise<Response> {
        const self = this;
        const response = new Response();

        if (self.loader) {
            self.loader = self.base.app.new.loader();
            await self.loader.show();
        }

        return new Promise<Response>(async (resolve, reject) => {
            await self.setHeaders();

            self.base.http
                .delete(self.base.url + url, {headers: self.headers})
                .pipe(retry(self.retry))
                .pipe(timeout(self.timeout))
                .subscribe(
                    (data: Response) => {
                        for (const item in data) {
                            response[item] = data[item];
                        }

                        if (self.log) {
                            console.log('app/helpers/Api/Api/delete', response, this);
                        }

                        if (self.loader) {
                            self.loader.dismiss();
                        }

                        resolve(response);

                        if (response.error === true) {
                            if (self.error) {
                                self.error_alert(data);
                            }

                            if (self.exception) {
                                reject(response);
                            } else {
                                resolve(response);
                            }
                        } else {

                            if (self.success) {
                                self.success_alert(data);
                            }

                            resolve(response);
                        }
                    },
                    (error) => {
                        if (error.error) {
                            for (const item in error.error) {
                                response[item] = error.error[item];
                            }
                        }

                        console.error('app/helpers/Api/Api/delete', error, response, this);

                        if (self.error) {
                            self.error_alert(response);
                        }

                        if (self.loader) {
                            self.loader.dismiss();
                        }

                        if (self.exception) {
                            reject(response);
                        } else {
                            resolve(response);
                        }
                    }
                );
        });
    }

    private async success_alert(data: Response) {
        return await this.base.app.new.alert(
            'Sucesso',
            data.message || 'Atividade realizada com sucesso!',
            'success'
        ).show();
    }
    private async error_alert(data: Response) {
        console.log(`error_alert`, data);
        return await this.base.app.new.alert(
            'Erro',
            data.message || 'Erro de comunicação com o servidor',
            'error'
        ).show();
    }

    private async setHeaders() {
        const self = this;
        const cache = JSON.parse(await localStorage.getItem('user') || '{}');
        const [login, password] = [cache[LOGIN_FIELD] || null, cache[PASSWORD_FIELD] || null];

        self.headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        if (login && password) {
            self.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(login + ':' + password)
            });
        }
    }
}

export class Response implements ResponseInterface {
    public readonly api: any = {};
    public readonly error: boolean = true;
    public readonly code: number = 900;
    public readonly message: string = 'Erro ao conectar com servidor, por favor, confira sua conexão com a internet.';
    public readonly return: any = null;

    public get success() {
        return this.error === false;
    }
}
