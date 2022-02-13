
'use strict'

const abrirFormulario = () => {
    document.getElementById('tabela').classList.add('d-none')
    document.getElementById('formulario').classList.remove('d-none')
}

const abreHolerit = () => {
    document.getElementById('holerit').classList.remove('d-none')
    document.getElementById('tabela').classList.add('d-none')
}

const fechaHolerit = () => {
    document.getElementById('holerit').classList.add('d-none')
    document.getElementById('tabela').classList.remove('d-none')
}
const getArmazenamentoLocal = () => JSON.parse(localStorage.getItem('db_funcionario')) ?? []
const setArmazenamentoLocal = (dbfuncionario) => {
    localStorage.setItem("db_funcionario", JSON.stringify(dbfuncionario))
}
// const openModal = () => document.getElementById('modal').classList.add('active')

const fecharFormulario = () => {
    atualizarTabela()
    document.getElementById('tabela').classList.remove('d-none')
    document.getElementById('formulario').classList.add('d-none')
    limparFormulario()
}

const limparFormulario = () => {
    const fields = document.querySelectorAll('.modificavel')
    const valores = document.querySelectorAll('[type="number"]')
    document.getElementById("#inss")
    fields.forEach(field => field.value = "")
    valores.forEach(valores => valores.value = "0")
    document.getElementById('nome').dataset.index = 'new'
}

const lerFuncionario = () => getArmazenamentoLocal()
const atualizarTabela = () => {
    const dbfuncionario = lerFuncionario()
    limpaTabela()
    dbfuncionario.forEach(criarLinha)
}

const dataAtualFormatada = (data) => {
    data = new Date(data)
    return `${(data.getMonth()+1).toString().padStart(2, '0')}/${data.getFullYear()}`
}
const criarLinha = (funcionario, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${funcionario.nome}</td>
        <td>${funcionario.departamento}</td>
        <td>${dataAtualFormatada(funcionario.data)}</td>
        <td>R$ ${funcionario.salario}</td>
        <td>
            <button type="button" class="btn btn-primary"  id="edit-${index}" >
                <i class="fa fa-fw fa-1x py-1 fa-pencil-square-o" ></i> 
                Editar
            </button>
        </td>
        <td>  
            <button type="button"  class="btn btn-primary"  id="delete-${index}" >
                <i class="fa fa-fw fa-1x py-1 fa-trash" ></i>
                Excluir
            </button>
        </td>
        <td>  
            <button type="button"  class="btn btn-primary"  id="ver-${index}" >
                <i class="fa fa-fw fa-1x py-1 fa-file-pdf-o" ></i>
                Ver
            </button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(newRow)
}
const limpaTabela = () => {
    const rows = document.querySelectorAll('#tabela>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}
const criarFuncionario = (funcionario) => {
    const dbfuncionario = lerFuncionario()
    dbfuncionario.push (funcionario)
    setArmazenamentoLocal(dbfuncionario)
}
const atualizarFuncionario = (index, funcionario) => {
    const dbfuncionario = lerFuncionario()
    dbfuncionario[index] = funcionario
    setArmazenamentoLocal(dbfuncionario)
}


const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}
const salvarFuncionario = () => {
    // debugger
    if (isValidFields()) {
        const funcionario = {
            razaoSocial: document.getElementById('razaoSocial').value,
            cnpj: document.getElementById('cnpj').value,
            data: document.getElementById('data').value,
            nome: document.getElementById('nome').value,
            salario: document.getElementById('salario').value,
            departamento: document.getElementById('departamento').value,
            diasreferenciasalario: document.getElementById('diasreferenciasalario').value,
            diasextra50: document.getElementById('diasextra50').value,
            cargahoraria: document.getElementById('cargahoraria').value,
            diasextra100: document.getElementById('diasextra100').value,
            diasadicionalnoturno: document.getElementById('diasadicionalnoturno').value,
            quantdependente: document.getElementById('quantdependente').value,
            adiantamentos: document.getElementById('adiantamentos').value,
            diasfaltas: document.getElementById('diasfaltas').value,
            dsedias: document.getElementById('dsedias').value,
            inss: document.getElementById('inss').value,
            irrf: document.getElementById('irrf').value,
            vt: document.getElementById('vt').value,
            vr: document.getElementById('vr').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            criarFuncionario(funcionario)
            atualizarTabela()
            fecharFormulario()
        } else {
            atualizarFuncionario(index, funcionario)
            atualizarTabela()
            fecharFormulario()
        }
    }
}

const setDadosFormulario = (funcionario) => {
    document.getElementById('razaoSocial').value = funcionario.razaoSocial
    document.getElementById('cnpj').value = funcionario.cnpj
    document.getElementById('data').value = funcionario.data
    document.getElementById('nome').value = funcionario.nome
    document.getElementById('departamento').value = funcionario.departamento
    document.getElementById('salario').value = funcionario.salario
    document.getElementById('diasreferenciasalario').value = funcionario.diasreferenciasalario
    document.getElementById('cargahoraria').value = funcionario.cargahoraria
    document.getElementById('diasextra50').value = funcionario.diasextra50
    document.getElementById('diasextra100').value = funcionario.diasextra100
    document.getElementById('diasadicionalnoturno').value = funcionario.diasadicionalnoturno
    document.getElementById('quantdependente').value = funcionario.quantdependente
    document.getElementById('adiantamentos').value = funcionario.adiantamentos
    document.getElementById('diasfaltas').value = funcionario.diasfaltas
    document.getElementById('dsedias').value = funcionario.dsedias
    document.getElementById('inss').value = funcionario.inss
    document.getElementById('irrf').value = funcionario.irrf
    document.getElementById('vt').value = funcionario.vt
    document.getElementById('vr').value = funcionario.vr
    document.getElementById('nome').dataset.index = funcionario.index
}

const editarFuncionario = (index) => {
    const funcionario = lerFuncionario()[index]
    funcionario.index = index
    setDadosFormulario(funcionario)
    abrirFormulario()

}
const deletarFuncionario = (index) => {
    const dbfuncionario = lerFuncionario()
    dbfuncionario.splice(index, 1)
    setArmazenamentoLocal(dbfuncionario)
    
}

const preencheHolerit = (index) => {
    const funcionario = lerFuncionario()[index]
    // document.querySelector('#razaososcial_').innerHTML("<p>${funcionario.razaoSocial}</p>")
    var $wrapper = document.querySelector('#razaososcial_'),
        HTMLNovo = `${funcionario.razaoSocial}`;
        $wrapper.innerHTML = HTMLNovo;
    var meses = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
    var data = new Date(funcionario.data)
    var mes = data.getMonth()
    var ano = data.getFullYear()
    var diaext = meses[mes] + " de " + ano;
    var $wrapper = document.querySelector('#nomefuncionario_'),
        HTMLNovo = `${funcionario.nome}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#departamento_'),
        HTMLNovo = `${funcionario.departamento}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#data_'),
        HTMLNovo = `${diaext}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#cnpj_'),
        HTMLNovo = `${funcionario.cnpj}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#diassalario_'),
        HTMLNovo = `${funcionario.diasreferenciasalario} Dias`;
        $wrapper.innerHTML = HTMLNovo;
    var valorSalario=parseFloat(funcionario.salario.replace(".","").replace(",","."));
    var valorSalar = valorSalario.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#salario_'),
        HTMLNovo = `${valorSalar}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#extra50_'),
        HTMLNovo = `${funcionario.diasextra50}H`;
        $wrapper.innerHTML = HTMLNovo;
        var valordahora =parseFloat(valorSalario)/parseInt(funcionario.cargahoraria)
        var valordodia =parseFloat(valorSalario)/parseInt(funcionario.diasreferenciasalario)
    var valor_extra50 = valordahora*parseFloat(funcionario.diasextra50)*1.5
    var valor_extra50a=valor_extra50.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#extra50_vlr'),
        HTMLNovo = `${String(valor_extra50a)}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#extra100_'),
        HTMLNovo = `${funcionario.diasextra100}H`;
        $wrapper.innerHTML = HTMLNovo;
    var valor_extra100 = valordahora*parseFloat(funcionario.diasextra100)*2
    var valor_extra100a = valor_extra100.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#extra100_vlr'),
        HTMLNovo = `${valor_extra100a}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#adicionalnoturno_'),
        HTMLNovo = `${funcionario.diasadicionalnoturno}H`;
        $wrapper.innerHTML = HTMLNovo;
    
    var valor_adicionalnoturno = valordahora*parseFloat(funcionario.diasadicionalnoturno)*0.2
    
    var valor_adicionalnoturnoa = valor_adicionalnoturno.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var valorsalariofamilia = parseFloat(0)
    var $wrapper = document.querySelector('#adicionalnoturno_vlr'),
        HTMLNovo = `${valor_adicionalnoturnoa}`;
        $wrapper.innerHTML = HTMLNovo;
    if (parseFloat(valorSalario)<=1655.89){
        var $wrapper = document.querySelector('#salariofamilia_'),
            HTMLNovo = `${funcionario.quantdependente}`;
            $wrapper.innerHTML = HTMLNovo;
        valorsalariofamilia = (parseFloat(funcionario.quantdependente)*54.47)
        var valorsalariofamiliaa = valorsalariofamilia.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        
        // valorsalariofamilia = valorsalariofamilia.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        var $wrapper = document.querySelector('#salariofamilia_valor'),
            HTMLNovo = `${valorsalariofamiliaa}`;
            $wrapper.innerHTML = HTMLNovo;
    } else{
        valorsalariofamilia = parseFloat(0)
    }

     
    var adiantamento = funcionario.adiantamentos.replace(".","").replace(",",".");
    var adiantamentoa =parseFloat(adiantamento).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#adiantamento_'),
        HTMLNovo = `${adiantamentoa}`;
        $wrapper.innerHTML = HTMLNovo;
    //#endregion
    var valorfalta = valordodia*funcionario.diasfaltas
    var valorfaltaa = valorfalta.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        
    var $wrapper = document.querySelector('#faltasatrasos_'),
        HTMLNovo = `${funcionario.diasfaltas}`;
        $wrapper.innerHTML = HTMLNovo;    
    var $wrapper = document.querySelector('#faltasatrasos_valor'),
        HTMLNovo = `${valorfaltaa}`;
        $wrapper.innerHTML = HTMLNovo;
    var somatotalvencimentos = parseFloat(valorSalario)+parseFloat(valor_extra50)+parseFloat(valor_extra100)+parseFloat(valor_adicionalnoturno)+parseFloat(valorsalariofamilia)
    
    var somatotalvencimentosa = somatotalvencimentos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var DSRvalor = valordodia*funcionario.dsedias
    var DSRvalora = DSRvalor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#dse_'),
        HTMLNovo = `${funcionario.dsedias}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#dse_valor'),
        HTMLNovo = `${DSRvalora}`;
        $wrapper.innerHTML = HTMLNovo;
    var valorinss = parseFloat(funcionario.inss)/100*valorSalario
    var valorinssa = valorinss.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#inss_'),
        HTMLNovo = `${funcionario.inss}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#inss_valor'),
        HTMLNovo = `${valorinssa}`;
        $wrapper.innerHTML = HTMLNovo;
    var valorirrf = (parseFloat(funcionario.irrf)/100*(valorSalario-valorinss))*0.01
    var valoriirrfa = valorirrf.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#irrf_'),
        HTMLNovo = `${funcionario.irrf}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#irrf_valor'),
        HTMLNovo = `${valoriirrfa}`;
        $wrapper.innerHTML = HTMLNovo;
    var valorvt = parseFloat(funcionario.vt)*valorSalario/100
    var valorvta = valorvt.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var valorvr = parseFloat(funcionario.vr)*valorSalario/100
    var valorvra = valorvr.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#vt_'),
        HTMLNovo = `${funcionario.vt}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#vt_valor'),
        HTMLNovo = `${valorvta}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#vr_'),
        HTMLNovo = `${funcionario.vr}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#vr_valor'),
        HTMLNovo = `${valorvra}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#somatotalvencimentos_'),
        HTMLNovo = `${somatotalvencimentosa}`;
        $wrapper.innerHTML = HTMLNovo;
    
    var $wrapper = document.querySelector('#somatotalvencimentoss_'),
        HTMLNovo = `${somatotalvencimentosa}`;
        $wrapper.innerHTML = HTMLNovo;
    var totaldescontos = parseFloat(adiantamento)+parseFloat(valorfalta)+parseFloat(DSRvalor)+parseFloat(valorinss)+parseFloat(valorirrf)+parseFloat(valorvt)+parseFloat(valorvr)
    
    var totaldescontosa = totaldescontos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#totaldescontos'),
        HTMLNovo = `${totaldescontosa}`;
        $wrapper.innerHTML = HTMLNovo;
    var totalliquido =parseFloat(somatotalvencimentos)-parseFloat(totaldescontos)
    var totalliquidoa = totalliquido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#totalliquido'),
        HTMLNovo = `${totalliquidoa}`;
        $wrapper.innerHTML = HTMLNovo;
        
    var $wrapper = document.querySelector('#somatotalvencimentosss_'),
        HTMLNovo = `${somatotalvencimentosa}`;
        $wrapper.innerHTML = HTMLNovo;
    var $wrapper = document.querySelector('#salariobase_'),
        HTMLNovo = `${valorSalar}`;
        $wrapper.innerHTML = HTMLNovo;
    var basecalculoirrf = somatotalvencimentos-valorinss
    var basecalculoirrfa = basecalculoirrf.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var $wrapper = document.querySelector('#basecalculo_irrf'),
        HTMLNovo = `${basecalculoirrfa}`;
        $wrapper.innerHTML = HTMLNovo;
    var valor_inss = somatotalvencimentos*0.08
    var valor_inssa = valor_inss.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
   
    var $wrapper = document.querySelector('#valor_inss'),
        HTMLNovo = `${valor_inssa}`;
        $wrapper.innerHTML = HTMLNovo;
}
const editarDeletar = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editarFuncionario(index)
        } else if (action == 'delete') {
            const funcionario = lerFuncionario()[index]
            const response = confirm(`Deseja realmente excluir o Funcionario ${funcionario.nome}`)
            if (response) {
                deletarFuncionario(index)
                atualizarTabela()
            }
        } else {
            preencheHolerit(index)
            abreHolerit()
        }
    }
}
document.getElementById('cadastrar').addEventListener('click', abrirFormulario)

document.getElementById('cancelar').addEventListener('click', fecharFormulario)
document.getElementById('vertabela').addEventListener('click', fechaHolerit)
document.getElementById('salvar').addEventListener('click', salvarFuncionario)

document.querySelector('#tabela>tbody').addEventListener('click', editarDeletar)

atualizarTabela() 



Array.prototype.forEach.call(document.body.querySelectorAll("*[data-mask]"), applyDataMask);

function applyDataMask(field) {
    var mask = field.dataset.mask.split('');
    
    // For now, this just strips everything that's not a number
    function stripMask(maskedData) {
        function isDigit(char) {
            return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
    }
    
    // Replace `_` characters with characters from `data`
    function applyMask(data) {
        return mask.map(function(char) {
            if (char != '_') return char;
            if (data.length == 0) return char;
            return data.shift();
        }).join('')
    }
    
    function reapplyMask(data) {
        return applyMask(stripMask(data));
    }
    
    function changed() {   
        var oldStart = field.selectionStart;
        var oldEnd = field.selectionEnd;
        
        field.value = reapplyMask(field.value);
        
        field.selectionStart = oldStart;
        field.selectionEnd = oldEnd;
    }
    
    field.addEventListener('click', changed)
    field.addEventListener('keyup', changed)
}            

