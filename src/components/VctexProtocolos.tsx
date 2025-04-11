import React, { useState, useEffect } from 'react';
    import { Search, Calendar, RefreshCw, ChevronLeft, ChevronRight, AlertCircle, Filter, X } from 'lucide-react';

    interface Protocolo {
      data: string;
      protocolo: string;
    }

    const VctexProtocolos: React.FC = () => {
      // States for API data and loading
      const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      
      // States for pagination
      const [currentPage, setCurrentPage] = useState<number>(1);
      const [itemsPerPage, setItemsPerPage] = useState<number>(10);
      const [totalPages, setTotalPages] = useState<number>(1);
      
      // States for filtering
      const [showFilters, setShowFilters] = useState<boolean>(false);
      const [protocoloFilter, setProtocoloFilter] = useState<string>('');
      const [dataFilter, setDataFilter] = useState<string>('');
      const [filteredProtocolos, setFilteredProtocolos] = useState<Protocolo[]>([]);
      
      // Fetch protocolos from API
      const fetchProtocolos = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await fetch('https://n8n-queue-2-n8n-webhook.igxlaz.easypanel.host/webhook/vctex/protocolos');
          
          if (!response.ok) {
            throw new Error(`Erro ao buscar protocolos: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (data.merged && Array.isArray(data.merged)) {
            setProtocolos(data.merged);
            setFilteredProtocolos(data.merged);
            setTotalPages(Math.ceil(data.merged.length / itemsPerPage));
          } else {
            setProtocolos([]);
            setFilteredProtocolos([]);
            setTotalPages(1);
          }
          
          setLoading(false);
        } catch (err) {
          console.error('Erro ao buscar protocolos:', err);
          setError(err instanceof Error ? err.message : 'Erro ao carregar os protocolos');
          setLoading(false);
        }
      };
      
      // Load protocolos on component mount
      useEffect(() => {
        fetchProtocolos();
      }, []);
      
      // Apply filters whenever filter values change
      useEffect(() => {
        applyFilters();
      }, [protocoloFilter, dataFilter, protocolos]);
      
      // Update total pages whenever filtered results or items per page change
      useEffect(() => {
        setTotalPages(Math.ceil(filteredProtocolos.length / itemsPerPage));
        // Reset to first page when filters change
        setCurrentPage(1);
      }, [filteredProtocolos, itemsPerPage]);
      
      // Function to apply filters
      const applyFilters = () => {
        let filtered = [...protocolos];
        
        // Filter by protocolo number
        if (protocoloFilter) {
          filtered = filtered.filter(p => 
            p.protocolo.includes(protocoloFilter)
          );
        }
        
        // Filter by date
        if (dataFilter) {
          // Convert dataFilter to date format used in the API (YYYY-MM-DD)
          const filterDate = dataFilter.split('T')[0]; // Get only the date part if there's a time component
          
          filtered = filtered.filter(p => 
            p.data.includes(filterDate)
          );
        }
        
        setFilteredProtocolos(filtered);
      };
      
      // Reset filters
      const resetFilters = () => {
        setProtocoloFilter('');
        setDataFilter('');
      };
      
      // Format date for display
      const formatDate = (dateString: string): string => {
        try {
          // Convert from "YYYY-MM-DD HH:MM:SS" to a more readable format
          const date = new Date(dateString);
          return date.toLocaleString('pt-BR');
        } catch (e) {
          return dateString; // Return original string if parsing fails
        }
      };
      
      // Handle page change
      const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
      };
      
      // Calculate items to display based on current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, filteredProtocolos.length);
      const currentItems = filteredProtocolos.slice(startIndex, endIndex);
      
      return (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">
                VCTEX Protocolos
              </h2>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filtros
                </button>
                
                <button
                  onClick={fetchProtocolos}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
              </div>
            </div>
            
            {/* Filtros */}
            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Filtrar Protocolos</h3>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Limpar Filtros
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="protocolo-filter" className="block text-xs font-medium text-gray-700 mb-1">
                      Número do Protocolo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="protocolo-filter"
                        value={protocoloFilter}
                        onChange={(e) => setProtocoloFilter(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 pl-9 border"
                        placeholder="Buscar por número do protocolo..."
                      />
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="data-filter" className="block text-xs font-medium text-gray-700 mb-1">
                      Data
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="data-filter"
                        value={dataFilter}
                        onChange={(e) => setDataFilter(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 pl-9 border"
                      />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Exibição dos resultados */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-600">Carregando protocolos...</span>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-lg text-red-700 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            ) : filteredProtocolos.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                  Nenhum protocolo encontrado
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Não foram encontrados protocolos com os filtros selecionados.
                  Tente alterar os filtros ou verificar se existem protocolos cadastrados.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Número do Protocolo
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentItems.map((protocolo, index) => (
                        <tr key={`${protocolo.protocolo}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatDate(protocolo.data)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {protocolo.protocolo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {/* Placeholder for action buttons - will be implemented in next steps */}
                            <div className="flex justify-end space-x-2">
                              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                                Ações
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Anterior
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Próximo
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Mostrando <span className="font-medium">{startIndex + 1}</span> a <span className="font-medium">{endIndex}</span> de{' '}
                          <span className="font-medium">{filteredProtocolos.length}</span> resultados
                        </p>
                      </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Anterior</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                          </button>
                          
                          {/* Simplified page number display */}
                          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                            Página {currentPage} de {totalPages}
                          </span>
                          
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Próximo</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      );
    };

    export default VctexProtocolos;
