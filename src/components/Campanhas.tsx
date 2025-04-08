import React, { useState } from 'react';
import { Upload, Download, Play, RefreshCcw, Filter, FileText, ChevronUp, ChevronDown } from 'lucide-react';

const Campanhas: React.FC = () => {
  const [activeView, setActiveView] = useState('lista'); // 'lista' ou 'nova' ou 'detalhes'
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [selectedCampanha, setSelectedCampanha] = useState<any>(null);
  
  // Simulação de campanhas existentes
  const campanhas = [
    {
      id: 1,
      nome: 'Campanha Janeiro/2023',
      status: 'concluido',
      total: 320,
      comSaldo: 248,
      semSaldo: 62,
      erro: 10,
      data: '10/01/2023'
    },
    {
      id: 2,
      nome: 'Campanha Dezembro/2022',
      status: 'concluido',
      total: 450,
      comSaldo: 312,
      semSaldo: 123,
      erro: 15,
      data: '15/12/2022'
    },
    {
      id: 3,
      nome: 'Campanha Novembro/2022',
      status: 'concluido',
      total: 275,
      comSaldo: 183,
      semSaldo: 82,
      erro: 10,
      data: '22/11/2022'
    },
    {
      id: 4, 
      nome: 'Campanha Fevereiro/2023',
      status: 'em_andamento',
      total: 150,
      processados: 68,
      data: '05/02/2023'
    }
  ];
  
  // Dados de exemplo para a visualização detalhada da campanha
  const detalheCampanha = {
    id: 1,
    nome: 'Campanha Janeiro/2023',
    status: 'concluido',
    dataInicio: '10/01/2023 08:30',
    dataFim: '10/01/2023 09:45',
    totalCPFs: 320,
    resultados: [
      { nome: 'João da Silva', cpf: '123.456.789-00', telefone: '(11) 98765-4321', status: 'com_saldo', saldo: 2480.45, ultimaTentativa: '10/01/2023 08:31' },
      { nome: 'Maria Oliveira', cpf: '987.654.321-00', telefone: '(11) 91234-5678', status: 'com_saldo', saldo: 1850.32, ultimaTentativa: '10/01/2023 08:32' },
      { nome: 'José Santos', cpf: '456.789.123-00', telefone: '(11) 95678-1234', status: 'sem_saldo', saldo: 0, ultimaTentativa: '10/01/2023 08:33' },
      { nome: 'Ana Pereira', cpf: '789.123.456-00', telefone: '(11) 94321-8765', status: 'erro', saldo: null, ultimaTentativa: '10/01/2023 08:34' },
      { nome: 'Carlos Ferreira', cpf: '321.654.987-00', telefone: '(11) 97890-1234', status: 'com_saldo', saldo: 3240.50, ultimaTentativa: '10/01/2023 08:35' }
    ]
  };
  
  // Simula upload de arquivo CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      // Simulando preview de dados do CSV
      setPreviewData([
        { nome: 'João da Silva', cpf: '123.456.789-00', telefone: '(11) 98765-4321' },
        { nome: 'Maria Oliveira', cpf: '987.654.321-00', telefone: '(11) 91234-5678' },
        { nome: 'José Santos', cpf: '456.789.123-00', telefone: '(11) 95678-1234' },
        { nome: 'Ana Pereira', cpf: '789.123.456-00', telefone: '(11) 94321-8765' },
      ]);
    }
  };
  
  // Simulação de início de campanha
  const iniciarCampanha = () => {
    setActiveView('lista');
    
    // Simulando progresso da campanha
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };
  
  // Renderiza lista de campanhas
  const renderListaCampanhas = () => (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-800">Campanhas de Consultas</h2>
        <button
          onClick={() => setActiveView('nova')}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 flex items-center"
        >
          <Upload className="h-4 w-4 mr-2" />
          Nova Campanha
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campanha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Com Saldo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sem Saldo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Erro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campanhas.map((campanha) => (
              <tr key={campanha.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{campanha.nome}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campanha.status === 'concluido' ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Concluído
                    </span>
                  ) : campanha.status === 'em_andamento' ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Em Andamento ({Math.round((campanha.processados / campanha.total) * 100)}%)
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Agendada
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campanha.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campanha.comSaldo || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campanha.semSaldo || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campanha.erro || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campanha.data}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => {
                      setSelectedCampanha(campanha);
                      setActiveView('detalhes');
                    }}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Ver
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Exportar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
  
  // Renderiza formulário para nova campanha
  const renderNovaCampanha = () => (
    <>
      <div className="mb-6 flex items-center">
        <button
          onClick={() => setActiveView('lista')}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          ← Voltar
        </button>
        <h2 className="text-xl font-medium text-gray-800">Nova Campanha</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <label htmlFor="campanha-nome" className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Campanha
          </label>
          <input
            type="text"
            id="campanha-nome"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm py-2 px-3 border"
            placeholder="Ex: Campanha Fevereiro/2023"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Arquivo CSV com CPFs
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                  <span>Selecionar arquivo</span>
                  <input 
                    id="file-upload" 
                    name="file-upload" 
                    type="file" 
                    accept=".csv"
                    className="sr-only"
                    onChange={handleFileUpload} 
                  />
                </label>
                <p className="pl-1">ou arraste e solte</p>
              </div>
              <p className="text-xs text-gray-500">
                CSV com colunas: Nome, CPF, Telefone
              </p>
            </div>
          </div>
        </div>
        
        {uploadedFile && (
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Preview: {uploadedFile.name}
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CPF
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previewData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {row.nome}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {row.cpf}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {row.telefone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Mostrando {previewData.length} de {previewData.length} registros
            </p>
          </div>
        )}
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Agendamento
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="agendamento-imediato"
                name="agendamento"
                className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                defaultChecked
              />
              <label htmlFor="agendamento-imediato" className="ml-2 block text-sm text-gray-700">
                Executar imediatamente
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="agendamento-programado"
                name="agendamento"
                className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
              />
              <label htmlFor="agendamento-programado" className="ml-2 block text-sm text-gray-700">
                Agendar para data específica
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="tempo-entre-consultas" className="block text-sm font-medium text-gray-700 mb-1">
              Tempo entre consultas (ms)
            </label>
            <input
              type="number"
              id="tempo-entre-consultas"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm py-2 px-3 border"
              defaultValue="500"
              min="100"
              max="5000"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: 500ms (consultas muito rápidas podem ser bloqueadas)
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setActiveView('lista')}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={iniciarCampanha}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 flex items-center"
            disabled={!uploadedFile}
          >
            <Play className="h-4 w-4 mr-2" />
            Iniciar Campanha
          </button>
        </div>
      </div>
    </>
  );
  
  // Renderiza detalhes de uma campanha
  const renderDetalhesCampanha = () => (
    <>
      <div className="mb-6 flex items-center">
        <button
          onClick={() => setActiveView('lista')}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          ← Voltar
        </button>
        <h2 className="text-xl font-medium text-gray-800">{detalheCampanha.nome}</h2>
        <span className="ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Concluído
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total de CPFs</div>
          <div className="text-2xl font-bold text-gray-800">{detalheCampanha.totalCPFs}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Com Saldo</div>
          <div className="text-2xl font-bold text-green-600">
            {detalheCampanha.resultados.filter(r => r.status === 'com_saldo').length} 
            <span className="text-sm text-gray-500 font-normal">
              ({Math.round((detalheCampanha.resultados.filter(r => r.status === 'com_saldo').length / detalheCampanha.totalCPFs) * 100)}%)
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Sem Saldo</div>
          <div className="text-2xl font-bold text-gray-600">
            {detalheCampanha.resultados.filter(r => r.status === 'sem_saldo').length}
            <span className="text-sm text-gray-500 font-normal">
              ({Math.round((detalheCampanha.resultados.filter(r => r.status === 'sem_saldo').length / detalheCampanha.totalCPFs) * 100)}%)
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Erro</div>
          <div className="text-2xl font-bold text-red-600">
            {detalheCampanha.resultados.filter(r => r.status === 'erro').length}
            <span className="text-sm text-gray-500 font-normal">
              ({Math.round((detalheCampanha.resultados.filter(r => r.status === 'erro').length / detalheCampanha.totalCPFs) * 100)}%)
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">Resultados da Campanha</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md" title="Filtrar">
              <Filter className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md" title="Exportar">
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Saldo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Tentativa
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {detalheCampanha.resultados.map((resultado, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{resultado.nome}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {resultado.cpf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {resultado.telefone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resultado.status === 'com_saldo' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Com Saldo
                      </span>
                    ) : resultado.status === 'sem_saldo' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Sem Saldo
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Erro
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {resultado.saldo !== null ? `R$ ${resultado.saldo.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {resultado.ultimaTentativa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {resultado.status === 'erro' ? (
                      <button className="text-blue-600 hover:text-blue-900 flex items-center justify-end">
                        <RefreshCcw className="h-4 w-4 mr-1" />
                        Reprocessar
                      </button>
                    ) : (
                      <button className="text-gray-600 hover:text-gray-900">
                        Ver Detalhes
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
  
  // Renderiza o conteúdo principal com base na view ativa
  const renderContent = () => {
    switch (activeView) {
      case 'lista':
        return renderListaCampanhas();
      case 'nova':
        return renderNovaCampanha();
      case 'detalhes':
        return renderDetalhesCampanha();
      default:
        return renderListaCampanhas();
    }
  };
  
  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default Campanhas;
