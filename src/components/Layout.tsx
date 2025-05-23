import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  BarChart, 
  User, 
  Users, 
  MessageSquare, 
  History, 
  UserPlus, 
  Database, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Server,
  FileText,
  ClipboardList,
  Settings,
  KeyRound,
  Building,
  FileSpreadsheet,
  ListChecks
} from 'lucide-react';

const Layout: React.FC = () => {
  const [clientesMenuOpen, setClientesMenuOpen] = useState(false);
  const [propostasMenuOpen, setPropostasMenuOpen] = useState(false);
  const [configMenuOpen, setConfigMenuOpen] = useState(false);
  const [factaMenuOpen, setFactaMenuOpen] = useState(false);
  const [campanhasMenuOpen, setCampanhasMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Sistema FGTS</h1>
        </div>
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <BarChart className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/consulta" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <User className="w-5 h-5 mr-2" />
                Consulta Individual
              </Link>
            </li>
            <li>
              <Link to="/consulta-lote" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <Users className="w-5 h-5 mr-2" />
                Consulta em Lote
              </Link>
            </li>
            <li>
              <Link to="/vctex-lote" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <Server className="w-5 h-5 mr-2" />
                VCTEX Em Lote
              </Link>
            </li>
            <li>
              <Link to="/vctex-protocolos" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <Server className="w-5 h-5 mr-2" />
                VCTEX Protocolos
              </Link>
            </li>
            <li>
              <Link to="/historico-consultas" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <History className="w-5 h-5 mr-2" />
                Histórico de Consultas
              </Link>
            </li>
            <li>
              <Link to="/disparo-whatsapp" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <MessageSquare className="w-5 h-5 mr-2" />
                Disparo WhatsApp
              </Link>
            </li>
            
            {/* Menu CAMPANHAS EM LOTE com submenu */}
            <li className="mt-2">
              <button 
                onClick={() => setCampanhasMenuOpen(!campanhasMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 rounded text-left"
              >
                <div className="flex items-center">
                  <FileSpreadsheet className="w-5 h-5 mr-2" />
                  CAMPANHAS EM LOTE
                </div>
                {campanhasMenuOpen ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
              
              {campanhasMenuOpen && (
                <ul className="pl-6 mt-1 space-y-1">
                  <li>
                    <Link to="/campanhas/consultas-lote" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                      <ListChecks className="w-4 h-4 mr-2" />
                      Consultas em Lote 2.0
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            
            {/* Menu PROPOSTAS com submenu */}
            <li className="mt-2">
              <button 
                onClick={() => setPropostasMenuOpen(!propostasMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 rounded text-left"
              >
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  PROPOSTAS
                </div>
                {propostasMenuOpen ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
              
              {propostasMenuOpen && (
                <ul className="pl-6 mt-1 space-y-1">
                  <li>
                    <Link to="/propostas/digitar" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                      <FileText className="w-4 h-4 mr-2" />
                      Digitar Proposta
                    </Link>
                  </li>
                  <li>
                    <Link to="/propostas/acompanhamento" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Acompanhamento de Propostas
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            
            {/* Menu Configurações API com submenu */}
            <li className="mt-2">
              <button 
                onClick={() => setConfigMenuOpen(!configMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 rounded text-left"
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configurações API
                </div>
                {configMenuOpen ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
              
              {configMenuOpen && (
                <ul className="pl-6 mt-1 space-y-1">
                  <li>
                    <button
                      onClick={() => setFactaMenuOpen(!factaMenuOpen)}
                      className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 rounded"
                    >
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        Banco Facta
                      </div>
                      {factaMenuOpen ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                      }
                    </button>
                    
                    {factaMenuOpen && (
                      <ul className="pl-6 mt-1 space-y-1">
                        <li>
                          <Link to="/configuracoes/facta/cadastro" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                            <KeyRound className="w-4 h-4 mr-2" />
                            Cadastro de API Facta
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            
            {/* Menu Clientes Nova Vida com submenu */}
            <li className="mt-2">
              <button 
                onClick={() => setClientesMenuOpen(!clientesMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 rounded text-left"
              >
                <div className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Clientes Nova Vida
                </div>
                {clientesMenuOpen ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
              
              {clientesMenuOpen && (
                <ul className="pl-6 mt-1 space-y-1">
                  <li>
                    <Link to="/clientes/cadastrar" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Cadastrar Cliente
                    </Link>
                  </li>
                  <li>
                    <Link to="/clientes/buscar" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                      <Search className="w-4 h-4 mr-2" />
                      Buscar Clientes
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
