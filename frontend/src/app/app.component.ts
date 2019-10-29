import {Component} from '@angular/core';
import swal, {SweetAlertType} from 'sweetalert2';
import * as $ from "jquery";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'frontend';

    public _api = {
        calls: []
    };

    get new() {
        return new New(this);
    }
}


class New {
    constructor(protected app: AppComponent) {

    }

    alert(title: string, message: string, type: SweetAlertType = 'info') {
        return new Alert(this.app, title, message, type);
    }

    loader() {
        return new Loader(this.app);
    }

    confirm(title: string = 'Você tem Certeza?', message: string = 'Você tem certeza de que deseja fazer isso?', confirmButtonText = 'OK', cancelButtonText = 'Cancelar') {
        return new Promise(resolve => {
            swal.fire({
                title: title,
                text: message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                // cancelButtonColor: '#d33',
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText
            }).then((result) => {
                if (result.value) {
                    resolve(true);
                }
            });
        });
    }
}

class Alert {
    constructor(protected app: AppComponent, protected title: string, protected message: string, protected type: SweetAlertType = 'info') {

    }

    show() {
        swal.fire(this.title, this.message, this.type);
    }
}

class Loader {
    constructor(protected app: AppComponent) {

    }

    show() {
        this.app._api.calls.push('loader');
        if (this.app._api.calls.length > 0) {
            $('#loader').addClass('active');
        }
    }

    dismiss() {
        this.app._api.calls.pop();
        if (this.app._api.calls.length == 0) {
            $('#loader').removeClass('active');
        }
    }
}
