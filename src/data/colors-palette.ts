type PaletteProps = {
  name: string;
  color: string;
};

type PalettesProps = {
  title: string;
  palette: PaletteProps[];
};

export const palettes: PalettesProps[] = [
  {
    title: 'minimalista',
    palette: [
      { name: 'branco', color: '#FFFFFF' },
      { name: 'cinza claro', color: '#F7F7F7' },
      { name: 'cinza médio', color: '#CCCCCC' },
      { name: 'cinza escuro', color: '#333333' },
      { name: 'preto', color: '#000000' },
    ],
  },
  {
    title: 'tropical',
    palette: [
      { name: 'laranja tropical', color: '#FFAD61' },
      { name: 'amarelo quente', color: '#FFD662' },
      { name: 'verde menta', color: '#71C7A6' },
      { name: 'verde azulado', color: '#379683' },
      { name: 'azul profundo', color: '#05386B' },
    ],
  },
  {
    title: 'pastéis',
    palette: [
      { name: 'rosa claro', color: '#FFC5E8' },
      { name: 'creme', color: '#FFEDD3' },
      { name: 'azul claro', color: '#C1EFFF' },
      { name: 'lavanda suave', color: '#D4E7FF' },
      { name: 'lilás claro', color: '#FAF4FF' },
    ],
  },
  {
    title: 'monocromática azul',
    palette: [
      { name: 'azul marinho', color: '#003F5C' },
      { name: 'azul acinzentado', color: '#2F4B7C' },
      { name: 'azul roxo', color: '#665191' },
      { name: 'azul vibrante', color: '#A05195' },
      { name: 'lilás escuro', color: '#D45087' },
    ],
  },
  {
    title: 'outono',
    palette: [
      { name: 'caramelo', color: '#D9BF77' },
      { name: 'marrom queimado', color: '#A55C1B' },
      { name: 'terracota', color: '#873E23' },
      { name: 'marrom escuro', color: '#4E2E2D' },
      { name: 'preto amadeirado', color: '#251E1C' },
    ],
  },
  {
    title: 'neutros quentes',
    palette: [
      { name: 'bege claro', color: '#F1E4D4' },
      { name: 'bege médio', color: '#DFD3C3' },
      { name: 'cinza quente', color: '#C2B8A3' },
      { name: 'taupe', color: '#A59F94' },
      { name: 'marrom cinza', color: '#6E6659' },
    ],
  },
  {
    title: 'neon',
    palette: [
      { name: 'vermelho neon', color: '#FF6F61' },
      { name: 'amarelo neon', color: '#FFCC00' },
      { name: 'azul neon', color: '#00D4FF' },
      { name: 'verde limão neon', color: '#39FF14' },
      { name: 'magenta neon', color: '#FF007F' },
    ],
  },
  {
    title: 'suave romântica',
    palette: [
      { name: 'rosa suave', color: '#F4C7C3' },
      { name: 'rosa muito claro', color: '#F8E4E3' },
      { name: 'creme pálido', color: '#FFF1D0' },
      { name: 'azul pálido', color: '#D2E2E6' },
      { name: 'azul acinzentado', color: '#BAC6D8' },
    ],
  },
  {
    title: 'retro',
    palette: [
      { name: 'vermelho', color: '#E63946' },
      { name: 'branco gelo', color: '#F1FAEE' },
      { name: 'azul claro', color: '#A8DADC' },
      { name: 'azul escuro', color: '#457B9D' },
      { name: 'azul profundo', color: '#1D3557' },
    ],
  },
  {
    title: 'psicodélica',
    palette: [
      { name: 'pink vibrante', color: '#F72585' },
      { name: 'roxo forte', color: '#7209B7' },
      { name: 'azul vivo', color: '#4361EE' },
      { name: 'ciano vibrante', color: '#4CC9F0' },
      { name: 'rosa choque', color: '#B5179E' },
    ],
  },
  {
    title: 'vintage',
    palette: [
      { name: 'bege envelhecido', color: '#D4A373' },
      { name: 'marrom suave', color: '#B08968' },
      { name: 'terracota clara', color: '#A98467' },
      { name: 'marrom clássico', color: '#7F5539' },
      { name: 'marrom escuro', color: '#6B4226' },
    ],
  },
  {
    title: 'natureza',
    palette: [
      { name: 'azul petróleo', color: '#264653' },
      { name: 'verde esmeralda', color: '#2A9D8F' },
      { name: 'amarelo desbotado', color: '#E9C46A' },
      { name: 'laranja queimado', color: '#F4A261' },
      { name: 'terracota', color: '#E76F51' },
    ],
  },
  {
    title: 'contraste forte',
    palette: [
      { name: 'preto', color: '#000000' },
      { name: 'branco', color: '#FFFFFF' },
      { name: 'rosa choque', color: '#F72585' },
      { name: 'azul intenso', color: '#3A0CA3' },
      { name: 'azul elétrico', color: '#4361EE' },
    ],
  },
  {
    title: 'verde refrescante',
    palette: [
      { name: 'verde pastel', color: '#D8F3DC' },
      { name: 'verde menta', color: '#B7E4C7' },
      { name: 'verde médio', color: '#95D5B2' },
      { name: 'verde folha', color: '#52B788' },
      { name: 'verde escuro', color: '#2D6A4F' },
    ],
  },
  {
    title: 'amanhecer',
    palette: [
      { name: 'laranja vibrante', color: '#FF9E00' },
      { name: 'laranja suave', color: '#FFBF69' },
      { name: 'amarelo quente', color: '#FFD670' },
      { name: 'amarelo pálido', color: '#EAE2B7' },
      { name: 'bege escuro', color: '#A68A64' },
    ],
  },
  {
    title: 'gelo e fogo',
    palette: [
      { name: 'vermelho fogo', color: '#FF6B6B' },
      { name: 'rosa quente', color: '#FF8787' },
      { name: 'cinza gelo', color: '#ADB5BD' },
      { name: 'cinza frio', color: '#6C757D' },
      { name: 'cinza carvão', color: '#495057' },
    ],
  },
  {
    title: 'noturna',
    palette: [
      { name: 'roxo escuro', color: '#240046' },
      { name: 'roxo profundo', color: '#3C096C' },
      { name: 'púrpura', color: '#5A189A' },
      { name: 'roxo vibrante', color: '#7B2CBF' },
      { name: 'lavanda escura', color: '#9D4EDD' },
    ],
  },
  {
    title: 'água marinha',
    palette: [
      { name: 'branco azulado', color: '#EDF6F9' },
      { name: 'azul piscina claro', color: '#ADE8F4' },
      { name: 'azul piscina médio', color: '#48CAE4' },
      { name: 'azul oceano', color: '#0096C7' },
      { name: 'azul marinho', color: '#03045E' },
    ],
  },
  {
    title: 'pôr do sol',
    palette: [
      { name: 'vermelho vibrante', color: '#F94144' },
      { name: 'laranja intenso', color: '#F3722C' },
      { name: 'laranja claro', color: '#F9844A' },
      { name: 'amarelo quente', color: '#F9C74F' },
      { name: 'verde oliva', color: '#90BE6D' },
    ],
  },
  {
    title: 'escura elegante',
    palette: [
      { name: 'preto suave', color: '#1B1B1E' },
      { name: 'cinza chumbo', color: '#313131' },
      { name: 'cinza médio', color: '#525252' },
      { name: 'cinza claro', color: '#7E7E7E' },
      { name: 'prata escura', color: '#A6A6A6' },
    ],
  },
];
