import conexao from './conection.js';

export async function listarContato() {
    let sql = 'select * from tb_agenda';

    let resp = await conexao.query(sql);
    let dados = resp[0];

    return dados;
}

export async function inserir(contato) {
    let sql = 'insert into tb_agenda (nm_contato, ds_telefone, ds_email, bt_favorito, dt_cadastro) values(?, ?, ?, ?, ?)';
    let resp = await conexao.query(sql, [contato.nome, contato.telefone, contato.email, contato.favorito, contato.cadastro]);
    let dados = resp[0];
    contato.id = dados.insertId;
    return contato;
}

export async function buscarNome(nome){
    let sql = 'select * from tb_agenda where nm_contato = ?';
    let resp = await conexao.query(sql, [nome]);
    let dados = resp[0];
    return dados;
}

export async function agendaFavorito(){
    let sql = 'select * from tb_agenda where bt_favorito = 1';
    let resp = await conexao.query(sql)

    let dados = resp[0];
    return dados
}

export async function buscarData(data1,data2){
    let sql = 'select * from tb_agenda where dt_cadastro between ? and ?';
    let resp = await conexao.query(sql, [data1, data2])

    let dados = resp[0]
    return dados
}

export async function deletarContato(id){
    let comando = 'delete from tb_agenda where id_agenda = ?'
    
    let [info] = await conexao.query(comando, [id])

    let linha = info.affectedRows;
    return linha;
}

export async function alterarContato(id, contato){
    let comando = `update tb_agenda set 
    nm_contato = ?,
    ds_telefone = ?, 
    ds_email = ?,
    bt_favorito = ?,
    dt_cadastro = ?
    where id_agenda = ?`;
    
    let [info] = await conexao.query(comando, [
        contato.nome,
        contato.telefone,
        contato.email,
        contato.favorito,
        contato.cadastro,
        id
    ])

    let linha = info.affectedRows;
    return linha;
}
