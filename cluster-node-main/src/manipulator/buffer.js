import sharp from 'sharp';

export async function criarBuffer(fileName) {
    const { data, info } = await sharp(fileName)
        .raw() 
        .toBuffer({ resolveWithObject: true }) 

    return { data, info } 
}

export function bufferParaMatriz(buffer, info) {
    const matriz = [] 

    for (let y = 0; y < info.height; y++) {
        const linha = [] 

        
        for (let x = 0; x < info.width; x++) {
            
            const idx = (y * info.width + x) * info.channels

            const pixel = [] 
            for (let c = 0; c < info.channels; c++) {
                pixel.push(buffer[idx + c]) 
            }
            linha.push(pixel) 
        }
        matriz.push(linha) 
    }
    return matriz 
}

function reconstruirImagem(matrizToBuffer, info, id) {
    sharp(matrizToBuffer, {
        raw: {
            width: info.width,      
            height: info.height,    
            channels: info.channels 
        }
    })
        .toFile(`img-reconstructed-${id}.png`) 
        .then(() => console.log('Imagem salva!')) 
        .catch(console.error); 
}

export function matrizParaBuffer(matriz, info, id) {
    const buffer = Buffer.alloc(info.width * info.height * info.channels)

    for (let y = 0; y < info.height; y++) {
        for (let x = 0; x < info.width; x++) {
            const idx = (y * info.width + x) * info.channels 
            const pixel = matriz[y][x] 

            
            for (let c = 0; c < info.channels; c++) {
                buffer[idx + c] = pixel[c]
            }
        }
    }

    reconstruirImagem(buffer, info, id)
}
