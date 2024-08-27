const prompt = require("prompt-sync")();
const fs = require("fs");

const modelos = [];
const marcas = [];
const precos = [];

function carregaDados() {
    if (fs.existsSync("carros.txt")) {
        const carros = fs.readFileSync("carros.txt", "utf-8").split("\n");

        for (let i = 0; i < carros.length; i++) {
            const partes = carros[i].split(";");
            
            modelos.push(partes[0]);
            marcas.push(partes[1]);
            precos.push(Number(partes[2]));
        }
    }
}

function gravaDados() {
    const carros = [];

    for (let i = 0; i < modelos.length; i++) {
        carros.push(modelos[i] + ';' + marcas[i] + ';' + precos[i]);
    }

    fs.writeFileSync("carros.txt", carros.join("\n"));

    console.log("Dados salvos em arquivo...");
}

function inclusao() {
    console.log("\nInclusão de Veículos");
    console.log('-'.repeat(30));

    const modelo = prompt("Modelo do Veículo: ");
    const marca = prompt("Marca............: ");
    const preco = Number(prompt("Preço R$.........: "));

    modelos.push(modelo);
    marcas.push(marca);
    precos.push(preco);

    console.log("Ok! Veículo Cadastrado com Sucesso!");
}

function listagem() {
    console.log("\nLista dos Veículos Cadastrados");
    console.log('-'.repeat(30));

    console.log("Nº Modelo do Veículo.......: Marca......: Preço R$:");
    console.log('='.repeat(30));

    for (let i = 0; i < modelos.length; i++) {
        //console.log("%s %s %s %s" , String(i + 1).padEnd(2), modelos[i].padEnd(25), marcas[i].padEnd(12), precos[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(9));
        console.log(`${String(i + 1).padEnd(2)}, ${modelos[i].padEnd(25)}, ${marcas[i].padEnd(12)}, ${precos[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(9)}`);
    }
}

function pesquisaMarca(marca) {
    console.log("\nPesquisa por Marca");
    console.log('-'.repeat(30));

    console.log("Nº Modelo do Veículo.......: Preço R$:")
    console.log('='.repeat(30));


    for (let i = 0; i < marcas.length; i++) {
        if (marca.toLowerCase() == marcas[i].toLowerCase()) {
            //console.log("%s %s %s", String(i + 1).padEnd(2), modelos[i].padEnd(25), precos[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(9));
            console.log(`${String(i + 1).padEnd(2)}, ${modelos[i].padEnd(25)}, ${precos[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(9)}`);
        }
    }
}

function pesquisaPreco(menorPreco, maiorPreco) {
    console.log("\nPesquisa por Preço");
    console.log('-'.repeat(30));

}

function alteracao() {
    console.log("\nAlteração de Preço de Veículo");
    console.log('-'.repeat(30));

    const modelo = prompt("Modelo: ");

}

function exclusao() {
    console.log("\nExclusão de Veículo");
    console.log('-'.repeat(30));

    const modelo = prompt("Modelo: ");
}

// ---------------------------------------------------- Programa Principal

carregaDados();

do {
    console.log("\nRevenda Avenida - Controle de Veículos");
    console.log('='.repeat(30));
    console.log("1. Inclusão de Veículos");
    console.log("2. Lista dos Veículos Cadastrados");
    console.log("3. Pesquisa por Marca");
    console.log("4. Pesquisa por Intervalo de Preços");
    console.log("5. Alteração de Preço de Veículo");
    console.log("6. Exclusão de Veículo");
    console.log("7. Finalizar");
    
    const opcao = Number(prompt("Opção: "));

    // pode substituir por varios if, else
    switch (opcao) {
        case 1:
            inclusao();
            break;
        case 2:
            listagem();
            break;
        case 3:
            pesquisaMarca(prompt("Marca: "));
            break;
        case 5:
            const menorPreco = Number(prompt("Menor preço R$: "));
            const maiorPreco = Number(prompt("Maior preço R$: "));
            pesquisaPreco(menorPreco, maiorPreco);
            break;
        case 5:
            alteracao();
            break;
        case 6:
            exclusao();
            break;
        default:
            break;
    }

    if (opcao == 7) {
        break;
    }

} while (true)

gravaDados();
