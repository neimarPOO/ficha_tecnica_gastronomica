export const calculateIngredientLine = (ing) => {
    const qto_bruta = (Number(ing.quantidade_liquida) / (Number(ing.rendimento_percentual) / 100)).toFixed(2);
    const divisor = ing.unidade === 'unid' ? 1 : 1000;
    const preco_liquido = (Number(ing.preco_bruto_unidade) * (Number(qto_bruta) / divisor)).toFixed(2);
    return { ...ing, qto_bruta, preco_liquido };
};

export const calculateTotalCost = (ingredientes) => {
    return ingredientes.reduce((acc, curr) => acc + parseFloat(curr.preco_liquido || 0), 0).toFixed(2);
};

export const calculateCostPerPortion = (totalCost, rendimentoPorcoes) => {
    return (totalCost / (rendimentoPorcoes || 1)).toFixed(2);
};
