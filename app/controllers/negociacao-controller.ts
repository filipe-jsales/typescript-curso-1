import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController{
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    constructor(){
        this.inputData = document.querySelector("#data") as HTMLInputElement;
        console.log(this.inputData);
        this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement;
        this.inputValor = document.querySelector("#valor") as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }
    
    public adiciona(): void{
        const negociacao = Negociacao.criaNegociacao(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        //validando dia da semana 
        if (!this.isDiaUtil(negociacao.data)){
            this.mensagemView.update("Transações não são permitidas final de semana");
            return;
        }
        console.log('Dia da semana: ', negociacao.data.getDay())
        this.negociacoes.adiciona(negociacao);
        this.atualizaView();
        this.limparFormulario();
    }

    private isDiaUtil(data: Date){
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO
    }


    public limparFormulario(): void{
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Cadastrado com sucesso!');
    }
}