export function aplicarFiltroPretoBranco(matriz) {
  const height = matriz.length;       
  const width = matriz[0].length;     
  
  for (let y = 0; y < height; y++) {
    
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = matriz[y][x]; 

      const cinza = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

      matriz[y][x] = [cinza, cinza, cinza, a];
    }
  }
  return matriz; 
}
