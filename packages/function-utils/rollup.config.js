import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';

const extensions = ['.js', '.jsx', '.ts', '.tsx']; // 어떤 확장자를 처리 할 지 정함
// babel-preset-react-app를 사용한다면 BABEL_ENV를 필수로 설정해야함.
process.env.BABEL_ENV = 'production';

const outputs = [
  {
    name: 'function-utils',
    file: 'dist/index.esm.js',
    format: 'es',
  },
];

export default outputs.map(output => ({
  input: './src/index.ts',
  output,
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs({
      include: 'node_modules/**',
    }), // CommonJS 형태로 만들어진 모듈도 불러와서 사용 할 수 있게 해줌. 현재 프로젝트 상황에서는 없어도 무방함
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }), // Babel을 사용 할 수 있게 해줌
    json(),
  ], // 아예 소스코드에서 제외함. 에러가 안나도록 peerDependencies에 넣어놔야 함
  external: [
  ],
}));
