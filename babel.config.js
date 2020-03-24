const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
        node: 'current',
      },
      useBuiltIns: 'usage',
    },
  ],
  '@babel/preset-typescript',
];

const plugins = [
  [
    'module-resolver',
    {
      root: ['./'],
      alias: {
        '@': './src',
        '~': './tsrc',
      },
    },
  ],
];

module.exports = { presets, plugins };
