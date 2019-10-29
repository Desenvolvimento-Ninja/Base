<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Essa é uma página de exemplo de controller
 * Pode ser acessada pelo link http://localhost:8000/welcome/
 */

class Welcome extends MY_Controller {

    public function metodo_get()
    {
        # http://localhost:8000/welcome/metodo/1
        $this->response()->success([], 'Exemplo chamando outro método como get');
    }

    public function index_get($id)
    {
        # GET - http://localhost:8000/welcome/1
        $this->get('blah'); // GET param
        $this->response()->error(404, $id . ' Não encontrado');
    }

    public function index_post()
    {
        # POST - http://localhost:8000/welcome/1
        $this->post('blah'); // POST param
        $this->response()->success([], 'Criado com sucesso!');
    }

    public function index_put($id)
    {
        # PUT - http://localhost:8000/welcome/1
        $this->put('blah'); // PUT param
        $this->response()->success([], 'Atualizado o id ' . $id);
    }

    public function index_delete($id)
    {
        # DELETE - http://localhost:8000/welcome/1
        $this->response()->success([], 'Deletado o id ' . $id);
    }
}
