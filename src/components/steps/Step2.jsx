import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import InfoCard from '../InfoCard';
import { calculateIngredientLine, calculateTotalCost } from '../../utils/calculations';

const Step2 = ({ recipeData, setRecipeData }) => {
    const [currentIngredient, setCurrentIngredient] = useState({
        produto: '',
        quantidade_liquida: '',
        unidade: 'g',
        preco_bruto_unidade: '',
        rendimento_percentual: 100
    });

    const addIngredient = () => {
        if (currentIngredient.produto && currentIngredient.quantidade_liquida) {
            const calculated = calculateIngredientLine(currentIngredient);
            setRecipeData({
                ...recipeData,
                ingredientes: [...recipeData.ingredientes, calculated]
            });
            setCurrentIngredient({
                produto: '',
                quantidade_liquida: '',
                unidade: 'g',
                preco_bruto_unidade: '',
                rendimento_percentual: 100
            });
        }
    };

    const removeIngredient = (index) => {
        const newIngs = [...recipeData.ingredientes];
        newIngs.splice(index, 1);
        setRecipeData({ ...recipeData, ingredientes: newIngs });
    };

    const totalCost = calculateTotalCost(recipeData.ingredientes);

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <InfoCard
                title="2. Ingredientes e Fator de Correção"
                text="O 'Rendimento %' representa o quanto do produto é aproveitado. Se o ingrediente não tem perda (ex: açúcar), use 100%. Se tem casca ou osso, o valor é menor."
            />

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-lg">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-amber-500"><Plus size={18} /> Novo Ingrediente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Produto</label>
                        <input
                            className="w-full p-2 bg-slate-800 border-none rounded-lg text-white"
                            value={currentIngredient.produto}
                            onChange={(e) => setCurrentIngredient({ ...currentIngredient, produto: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Qtd Líquida</label>
                        <div className="flex bg-slate-800 rounded-lg overflow-hidden">
                            <input
                                type="number"
                                className="w-full p-2 bg-transparent border-none text-white outline-none"
                                value={currentIngredient.quantidade_liquida}
                                onChange={(e) => setCurrentIngredient({ ...currentIngredient, quantidade_liquida: e.target.value })}
                            />
                            <select
                                className="bg-slate-700 text-amber-500 font-bold px-2 outline-none border-l border-slate-600"
                                value={currentIngredient.unidade}
                                onChange={(e) => setCurrentIngredient({ ...currentIngredient, unidade: e.target.value })}
                            >
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                                <option value="unid">unid</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400">Preço p/ Kg ou L (R$)</label>
                        <input
                            type="number"
                            className="w-full p-2 bg-slate-800 border-none rounded-lg text-white"
                            value={currentIngredient.preco_bruto_unidade}
                            onChange={(e) => setCurrentIngredient({ ...currentIngredient, preco_bruto_unidade: e.target.value })}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Aproveitamento %</label>
                        <input
                            type="number"
                            className="w-full p-2 bg-slate-800 border-none rounded-lg text-white"
                            value={currentIngredient.rendimento_percentual}
                            onChange={(e) => setCurrentIngredient({ ...currentIngredient, rendimento_percentual: e.target.value })}
                        />
                    </div>
                </div>
                <button
                    onClick={addIngredient}
                    className="mt-6 w-full bg-amber-500 text-slate-900 py-3 rounded-xl font-black hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                >
                    ADICIONAR À FICHA
                </button>
            </div>

            <div className="overflow-hidden border-2 border-slate-100 rounded-2xl shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black border-b">
                        <tr>
                            <th className="px-4 py-4 uppercase">Insumo</th>
                            <th className="px-4 py-4 uppercase">Qtd Líq.</th>
                            <th className="px-4 py-4 uppercase text-center text-amber-500">Unid</th>
                            <th className="px-4 py-4 uppercase">Rend %</th>
                            <th className="px-4 py-4 uppercase">Qtd Bruta</th>
                            <th className="px-4 py-4 uppercase">Custo Real</th>
                            <th className="px-4 py-4 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {recipeData.ingredientes.map((ing, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-4 font-bold text-slate-700">{ing.produto}</td>
                                <td className="px-4 py-4">{ing.quantidade_liquida}</td>
                                <td className="px-4 py-4 text-center font-bold text-slate-400">{ing.unidade}</td>
                                <td className="px-4 py-4">{ing.rendimento_percentual}%</td>
                                <td className="px-4 py-4 font-mono text-slate-500">{ing.qto_bruta}{ing.unidade}</td>
                                <td className="px-4 py-4 font-black text-amber-600">R$ {ing.preco_liquido}</td>
                                <td className="px-4 py-4 text-center">
                                    <button onClick={() => removeIngredient(idx)} className="text-slate-300 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-slate-900 text-white">
                        <tr>
                            <td colSpan="4" className="px-4 py-4 text-right text-xs uppercase opacity-70">Total da Preparação:</td>
                            <td className="px-4 py-4 text-lg font-black text-amber-400">R$ {totalCost}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Step2;
