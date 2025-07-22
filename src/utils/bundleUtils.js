// Função para remover duplicatas de bundles baseada no bundleid
export const removeDuplicateBundles = (bundles) => {
  if (!Array.isArray(bundles)) return [];
  
  const seen = new Set();
  return bundles.filter(bundle => {
    if (!bundle.bundleid || seen.has(bundle.bundleid)) {
      return false;
    }
    seen.add(bundle.bundleid);
    return true;
  });
};

// Função para validar estrutura de bundle
export const validateBundle = (bundle) => {
  return bundle && 
         typeof bundle === 'object' && 
         bundle.bundleid && 
         bundle.name;
};

// Função para limpar e validar array de bundles
export const cleanBundlesArray = (bundles) => {
  if (!Array.isArray(bundles)) return [];
  
  return removeDuplicateBundles(
    bundles.filter(validateBundle)
  );
};
