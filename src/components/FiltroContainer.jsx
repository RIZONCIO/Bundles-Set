import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../styles/Filtros.css';
import { getBundlesFromIndexedDB } from '../utils/indexedDB';
import { cleanBundlesArray } from '../utils/bundleUtils';
import { fetchFilterOptions } from '../config/filterApi';

export default function FiltroContainer({ onFilterResults, bundles = [] }) {
  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState({});
  const [ordenacao, setOrdenacao] = useState('mais-procurados');
  const [allBundles, setAllBundles] = useState([]);
  const [precoRange, setPrecoRange] = useState({ min: 0, max: 500 });
  const [precoAtual, setPrecoAtual] = useState({ min: 0, max: 500 });
  const [precoDebounced, setPrecoDebounced] = useState({ min: 0, max: 500 });
  const filtrosWrapperRef = useRef(null);

  const [filtrosDinamicos, setFiltrosDinamicos] = useState({
    Sistema: ["Windows", "Mac", "Linux"],
    Gêneros: [],
    Desenvolvedor: [],
    Distribuidora: [],
  });

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const apiResponse = await fetchFilterOptions();
        
        if (apiResponse.success) {
          const { genres, categories, platforms, priceRange} = apiResponse.data;
          
          setFiltrosDinamicos({
            Sistema: platforms || ["Windows", "Mac", "Linux"],
            Gêneros: genres || [],
            Categorias: categories || [],
            Distribuidora: [],
          });
          
          if (priceRange) {
            setPrecoRange(priceRange);
            setPrecoAtual(priceRange);
            setPrecoDebounced(priceRange);
          }
          
          console.log('✅ Filtros carregados da API:', apiResponse.headers);
          return;
        }
        
        // Fallback: carregar do IndexedDB
        console.log('⚠️ API indisponível, usando dados locais...');
        const storedBundles = await getBundlesFromIndexedDB("allBundles");
        setAllBundles(storedBundles);
        
        // Extrair filtros dos dados locais
        const generos = new Set();
        const desenvolvedores = new Set();
        const distribuidoras = new Set();
        const precos = [];
        
        storedBundles.forEach(bundle => {
          // Coletar preços para calcular range
          if (bundle.final_price && bundle.final_price > 0) {
            precos.push(bundle.final_price / 100); // Converter centavos para reais
          }
          
          if (bundle.page_details) {
            // Gêneros
            if (bundle.page_details.gênero) {
              bundle.page_details.gênero.forEach(genre => generos.add(genre));
            }
            
            // Desenvolvedores
            if (bundle.page_details.desenvolvedor) {
              bundle.page_details.desenvolvedor.forEach(dev => desenvolvedores.add(dev));
            }
            
            // Distribuidoras
            if (bundle.page_details.distribuidora) {
              bundle.page_details.distribuidora.forEach(pub => distribuidoras.add(pub));
            }
          }
        });
        
        // Calcular range de preços dos dados locais
        if (precos.length > 0) {
          const minPreco = Math.floor(Math.min(...precos));
          const maxPreco = Math.ceil(Math.max(...precos));
          const range = { min: minPreco, max: maxPreco };
          setPrecoRange(range);
          setPrecoAtual(range);
          setPrecoDebounced(range);
        }
        
        setFiltrosDinamicos(prev => ({
          ...prev,
          Gêneros: Array.from(generos).sort(),
          Desenvolvedor: Array.from(desenvolvedores).sort().slice(0, 20), // Limitar a 20
          Distribuidora: Array.from(distribuidoras).sort().slice(0, 15), // Limitar a 15
        }));
        
      } catch (error) {
        console.error('Erro ao carregar opções de filtro:', error);
        // Usar valores padrão em caso de erro
        const defaultRange = { min: 0, max: 500 };
        setPrecoRange(defaultRange);
        setPrecoAtual(defaultRange);
        setPrecoDebounced(defaultRange);
      }
    };

    loadFilterOptions();
  }, []);

  // Aplicar filtros
  const aplicarFiltros = useCallback(() => {
    let bundlesFiltrados = bundles.length > 0 ? bundles : allBundles;
    
    // Aplicar filtros selecionados
    Object.entries(filtrosSelecionados).forEach(([categoria, opcoesSelecionadas]) => {
      if (opcoesSelecionadas.length > 0) {
        bundlesFiltrados = bundlesFiltrados.filter(bundle => {
          switch (categoria) {
            case 'Sistema':
              return opcoesSelecionadas.some(sistema => {
                if (sistema === 'Windows') return bundle.available_windows;
                if (sistema === 'Mac') return bundle.available_mac;
                if (sistema === 'Linux') return bundle.available_linux;
                return false;
              });
              
            case 'Gêneros':
              return bundle.page_details?.gênero?.some(genre => 
                opcoesSelecionadas.includes(genre)
              );
              
            case 'Desenvolvedor':
              return bundle.page_details?.desenvolvedor?.some(dev => 
                opcoesSelecionadas.includes(dev)
              );
              
            case 'Distribuidora':
              return bundle.page_details?.distribuidora?.some(pub => 
                opcoesSelecionadas.includes(pub)
              );
              
            default:
              return true;
          }
        });
      }
    });
    
    // Aplicar filtro de preço do slider
    if (precoDebounced.min > precoRange.min || precoDebounced.max < precoRange.max) {
      bundlesFiltrados = bundlesFiltrados.filter(bundle => {
        const preco = bundle.final_price / 100; // Converter centavos para reais
        return preco >= precoDebounced.min && preco <= precoDebounced.max;
      });
    }
    
    // Aplicar ordenação
    switch (ordenacao) {
      case 'ordem-alfabetica':
        bundlesFiltrados.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'menor-preco':
        bundlesFiltrados.sort((a, b) => a.final_price - b.final_price);
        break;
      case 'maior-preco':
        bundlesFiltrados.sort((a, b) => b.final_price - a.final_price);
        break;
      case 'maior-desconto':
        bundlesFiltrados.sort((a, b) => b.discount_percent - a.discount_percent);
        break;
      default: // mais-procurados ou padrão
        // Manter ordem original ou por popularidade
        break;
    }
    
    onFilterResults?.(cleanBundlesArray(bundlesFiltrados));
  }, [filtrosSelecionados, ordenacao, bundles, allBundles, precoDebounced, precoRange, onFilterResults]);

  useEffect(() => {
    aplicarFiltros();
  }, [aplicarFiltros]);

  const handleFiltroChange = (categoria, opcao, checked) => {
    setFiltrosSelecionados(prev => ({
      ...prev,
      [categoria]: checked 
        ? [...(prev[categoria] || []), opcao]
        : (prev[categoria] || []).filter(item => item !== opcao)
    }));
  };

  const handlePrecoChange = useCallback((values) => {
    // Validar valores para evitar estados inválidos
    if (Array.isArray(values) && values.length === 2) {
      const [min, max] = values;
      if (typeof min === 'number' && typeof max === 'number' && min <= max) {
        setPrecoAtual({
          min: Math.max(min, precoRange.min),
          max: Math.min(max, precoRange.max)
        });
      }
    }
  }, [precoRange.min, precoRange.max]);

  // Debounce para aplicar filtros após mudanças no preço
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPrecoDebounced(precoAtual);
    }, 300); // 300ms de debounce
    
    return () => clearTimeout(timeoutId);
  }, [precoAtual]);

  // Verificar se o preço foi alterado do valor padrão usando useMemo para performance
  const isPrecoAlterado = useMemo(() => {
    return precoAtual.min > precoRange.min || precoAtual.max < precoRange.max;
  }, [precoAtual.min, precoAtual.max, precoRange.min, precoRange.max]);

  // Memoizar a formatação dos valores de preço para evitar re-renders
  const precoFormatado = useMemo(() => ({
    min: Math.round(precoAtual.min),
    max: Math.round(precoAtual.max)
  }), [precoAtual.min, precoAtual.max]);

  // Função para formatar o texto do filtro de preço de forma compacta
  const formatarTextoPreco = useMemo(() => {
    if (!isPrecoAlterado) return null;
    
    const min = precoFormatado.min;
    const max = precoFormatado.max;
    
    // Formato compacto para evitar mudanças bruscas de tamanho
    if (min === max) {
      return `R$ ${min}`;
    } else if (min === precoRange.min && max < precoRange.max) {
      return `≤ R$ ${max}`;
    } else if (min > precoRange.min && max === precoRange.max) {
      return `≥ R$ ${min}`;
    } else {
      return `${min}-${max}`;
    }
  }, [isPrecoAlterado, precoFormatado.min, precoFormatado.max, precoRange.min, precoRange.max]);

  useEffect(() => {
    function handleClickFora(event) {
      if (!filtrosWrapperRef.current?.contains(event.target)) {
        setDropdownAberto(null);
      }
    }

    document.addEventListener("click", handleClickFora);
    return () => document.removeEventListener("click", handleClickFora);
  }, []);

  return (
    <section className="filtro-container">
      <div className="filtro-header">
        <div className="listar-por">
          <span>Listar por:</span>
          <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
            <option value="mais-procurados">MAIS PROCURADOS</option>
            <option value="ordem-alfabetica">ORDEM ALFABÉTICA</option>
            <option value="menor-preco">MENOR PREÇO</option>
            <option value="maior-preco">MAIOR PREÇO</option>
            <option value="maior-desconto">MAIOR DESCONTO</option>
          </select>
        </div>
      </div>

      <div className="filtros-wrapper" ref={filtrosWrapperRef}>
        {Object.entries(filtrosDinamicos).map(([titulo, opcoes]) => (
          <div className="filtro-item" key={titulo}>
            <button
              className="filtro-btn"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownAberto(dropdownAberto === titulo ? null : titulo);
              }}
            >
              {titulo}
              {filtrosSelecionados[titulo]?.length > 0 && (
                <span className="filtro-count">({filtrosSelecionados[titulo].length})</span>
              )}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginLeft: '6px', verticalAlign: 'middle' }}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ul className={`filtro-dropdown ${dropdownAberto === titulo ? 'ativo' : ''}`}>
              {opcoes.map((opcao) => (
                <li key={opcao}>
                  <label>
                    <input 
                      type="checkbox" 
                      value={opcao}
                      checked={filtrosSelecionados[titulo]?.includes(opcao) || false}
                      onChange={(e) => handleFiltroChange(titulo, opcao, e.target.checked)}
                    />
                    {opcao}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Slider de Preço */}
        <div className="filtro-item filtro-preco">
          <button
            className="filtro-btn"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownAberto(dropdownAberto === 'Preço' ? null : 'Preço');
            }}
          >
            Preço
            {formatarTextoPreco && (
              <span className="filtro-count">{formatarTextoPreco}</span>
            )}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginLeft: '6px', verticalAlign: 'middle' }}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={`filtro-dropdown filtro-preco-dropdown ${dropdownAberto === 'Preço' ? 'ativo' : ''}`}>
            <div className="preco-slider-container">
              <div className="preco-inputs">
                <div className="preco-input-group">
                  <label>Mín: R$ {precoFormatado.min}</label>
                </div>
                <div className="preco-input-group">
                  <label>Máx: R$ {precoFormatado.max}</label>
                </div>
              </div>
              
              <div className="preco-slider-wrapper">
                {precoRange.max > precoRange.min && (
                  <Slider
                    range
                    min={precoRange.min}
                    max={precoRange.max}
                    value={[precoAtual.min, precoAtual.max]}
                    onChange={handlePrecoChange}
                    step={1}
                    allowCross={false}
                    trackStyle={[{ backgroundColor: '#66C0F4' }]}
                    handleStyle={[
                      { backgroundColor: '#66C0F4', borderColor: '#66C0F4' },
                      { backgroundColor: '#66C0F4', borderColor: '#66C0F4' }
                    ]}
                    railStyle={{ backgroundColor: '#3c3c3c' }}
                  />
                )}
              </div>
              
              <div className="preco-display">
                <span>R$ {precoFormatado.min}</span>
                <span>-</span>
                <span>R$ {precoFormatado.max}</span>
              </div>
              
              <button
                className="preco-reset"
                onClick={() => {
                  const resetRange = { min: precoRange.min, max: precoRange.max };
                  setPrecoAtual(resetRange);
                  setPrecoDebounced(resetRange);
                }}
              >
                Resetar
              </button>
            </div>
          </div>
        </div>
        
        {/* Botão para limpar filtros */}
        {(Object.values(filtrosSelecionados).some(filtros => filtros?.length > 0) || 
          isPrecoAlterado) && (
          <button 
            className="limpar-filtros"
            onClick={() => {
              setFiltrosSelecionados({});
              const resetRange = { min: precoRange.min, max: precoRange.max };
              setPrecoAtual(resetRange);
              setPrecoDebounced(resetRange);
            }}
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </section>
  );
}
