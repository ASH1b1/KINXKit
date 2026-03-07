/**
 * Jest 测试配置文件
 */

export default {
  // 测试环境
  testEnvironment: 'node',

  // TypeScript 配置
  preset: 'ts-jest/presets/default-esm',

  // 模块路径映射
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },

  // 转换配置
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          esModuleInterop: true,
          allowSyntheticDefaultImports: true
        }
      }
    ]
  },

  // 测试文件匹配模式
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/__tests__/**/*.test.ts'
  ],

  // 覆盖率配置
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],

  // 覆盖率阈值
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // 覆盖率报告格式
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov'
  ],

  // 覆盖率输出目录
  coverageDirectory: 'coverage',

  // 忽略模式
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/'
  ],

  // 模块目录
  moduleDirectories: [
    'node_modules',
    'src'
  ],

  // 清除模拟
  clearMocks: true,

  // 最大工作线程数
  maxWorkers: '50%',

  // 详细输出
  verbose: true
};
