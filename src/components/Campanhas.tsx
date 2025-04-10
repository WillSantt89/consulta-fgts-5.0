import React, { useState, useEffect } from 'react';
import { Eye, Play, FileDown } from 'lucide-react';

interface Campanha {
  id: number;
  nome: string;
  status: string;
  total: number;
  comSaldo: number;
  semSaldo: number;
  erro: number;
  data: string;
}

const Campanhas: React.FC = () => {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);

  useEffect(() => {
    // Simular carregamento de campanhas
    setCampanhas([
      {
        id: 15,
        nome: 'Campanha 15',
        status: 'Pausada',
        total: 5,
        comSaldo: 0,
        semSaldo: 0,
        erro: 0,
        data: '09/04/2025'
      },
      // Adicione mais campanhas conforme necessário
    ]);
  }, []);

  const iniciarConsulta = async (campanhaId: number) => {
    const campanha = campanhas.find(c => c.id === campanhaId);
    if (!campanha) return;

    // Aqui você deve implementar a lógica para obter os CPFs da campanha
    // Por enquanto, vamos usar CPFs de exemplo
    const cpfs = ['123.456.789-00', '987.654.321-00', '111.222.333-44'];

    for (const cpf of cpfs) {
      try {
        const response = await fetch('https://santanacred-n8n-chatwoot.igxlaz.easypanel.host/webhook/consulta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cpf: cpf.replace(/\D/g, '') }) // Remove caracteres não numéricos
        });

        if (!response.ok) {
          throw new Error(`Erro na consulta: ${response.status}`);
        }

        const result = await response.json();
        
        // Atualizar o estado da campanha com base no resultado
        setCampanhas(prevCampanhas => prevCampanhas.map(c => {
          if (c.id === campanhaId) {
            return {
              ...c,
              comSaldo: result.codigo === "SIM" ? c.comSaldo + 1 : c.comSaldo,
              semSaldo: result.codigo !== "SIM" ? c.semSaldo + 1 : c.semSaldo,
              total: c.total + 1
            };
          }
          return c;
        }));

        // Aqui você pode implementar a lógica para salvar os resultados da consulta
        console.log(`Resultado da consulta para CPF ${cpf}:`, result);

      } catch (error) {
        console.error(`Erro ao consultar CPF ${cpf}:`, error);
        setCampanhas(prevCampanhas => prevCampanhas.map(c => {
          if (c.id === campanhaId) {
            return { ...c, erro: c.erro + 1, total: c.total + 1 };
          }
          return c;
        }));
      }
    }

    // Atualizar o status da campanha para 'Em andamento' ou 'Concluída'
    setCampanhas(prevCampanhas => prevCampanhas.map(c => {
      if (c.id === campanhaId) {
        return { ...c, status: 'Concluída' };
      }
      return c;
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Campanhas de Consultas</h2>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Nova Campanha
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Com Saldo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem Saldo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Erro</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campanhas.map((campanha) => (
              <tr key={campanha.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campanha.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.comSaldo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.semSaldo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.erro}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.data}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Eye size={18} />
                  </button>
                  <button 
                    className="text-green-600 hover:text-green-900 mr-2"
                    onClick={() => iniciarConsulta(campanha.id)}
                  >
                    <Play size={18} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <FileDown size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campanhas;
