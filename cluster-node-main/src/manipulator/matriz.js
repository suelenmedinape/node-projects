export function dividirMatriz(array, numVariaveis) {
    const tamanhoParte = Math.floor(array.length / numVariaveis)

    const resto = array.length % numVariaveis

    const resultado = [] 
    let inicio = 0       

    for (let i = 0; i < numVariaveis; i++) {
        let tamanhoAtual = tamanhoParte 
        if (i < resto) {
            tamanhoAtual++ 
        }

        resultado.push(array.slice(inicio, inicio + tamanhoAtual))

        inicio += tamanhoAtual
    }
    return resultado 
}
