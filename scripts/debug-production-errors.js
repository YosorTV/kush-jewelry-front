#!/usr/bin/env node

/**
 * Production Error Debugging Script
 * 
 * This script helps reproduce production errors locally by:
 * 1. Testing external API connectivity
 * 2. Validating environment variables
 * 3. Simulating production conditions
 * 4. Running health checks
 */

const https = require('https');
const http = require('http');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}\n`),
};

// Required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_STRAPI_URL',
  'AUTH_SECRET',
  'NEXTAUTH_URL',
];

// Optional but important environment variables
const optionalEnvVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
];

async function checkEnvironmentVariables() {
  log.section('🔍 Checking Environment Variables');
  
  let hasErrors = false;
  
  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar]) {
      log.success(`${envVar} is set`);
    } else {
      log.error(`${envVar} is missing`);
      hasErrors = true;
    }
  }
  
  // Check optional variables
  for (const envVar of optionalEnvVars) {
    if (process.env[envVar]) {
      log.success(`${envVar} is set`);
    } else {
      log.warning(`${envVar} is not set (optional)`);
    }
  }
  
  return !hasErrors;
}

function testUrl(url, timeout = 10000) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const startTime = Date.now();
    
    const req = protocol.get(url, (res) => {
      const duration = Date.now() - startTime;
      resolve({
        success: true,
        status: res.statusCode,
        duration,
        headers: res.headers,
      });
    });
    
    req.on('error', (error) => {
      const duration = Date.now() - startTime;
      resolve({
        success: false,
        error: error.message,
        duration,
      });
    });
    
    req.setTimeout(timeout, () => {
      req.destroy();
      const duration = Date.now() - startTime;
      resolve({
        success: false,
        error: 'Request timeout',
        duration,
      });
    });
  });
}

async function testExternalConnectivity() {
  log.section('🌐 Testing External API Connectivity');
  
  const urls = [
    process.env.NEXT_PUBLIC_STRAPI_URL,
    'https://api.github.com', // Test general internet connectivity
  ].filter(Boolean);
  
  let allSuccess = true;
  
  for (const url of urls) {
    log.info(`Testing ${url}...`);
    
    const result = await testUrl(url);
    
    if (result.success) {
      log.success(`${url} responded with status ${result.status} (${result.duration}ms)`);
    } else {
      log.error(`${url} failed: ${result.error} (${result.duration}ms)`);
      allSuccess = false;
    }
  }
  
  return allSuccess;
}

async function testStrapiEndpoints() {
  log.section('📡 Testing Strapi Endpoints');
  
  if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
    log.error('NEXT_PUBLIC_STRAPI_URL not set, skipping Strapi tests');
    return false;
  }
  
  const endpoints = [
    'api/global',
    'api/currency-change',
  ];
  
  let allSuccess = true;
  
  for (const endpoint of endpoints) {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${endpoint}`;
    log.info(`Testing ${endpoint}...`);
    
    const result = await testUrl(url);
    
    if (result.success) {
      if (result.status === 200) {
        log.success(`${endpoint} is working (${result.duration}ms)`);
      } else {
        log.warning(`${endpoint} returned status ${result.status} (${result.duration}ms)`);
      }
    } else {
      log.error(`${endpoint} failed: ${result.error} (${result.duration}ms)`);
      allSuccess = false;
    }
  }
  
  return allSuccess;
}

async function simulateProductionLoad() {
  log.section('⚡ Simulating Production Load');
  
  if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
    log.warning('Skipping load test - NEXT_PUBLIC_STRAPI_URL not set');
    return true;
  }
  
  const concurrentRequests = 5;
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/global`;
  
  log.info(`Making ${concurrentRequests} concurrent requests to ${url}...`);
  
  const promises = Array(concurrentRequests).fill().map(() => testUrl(url));
  const results = await Promise.all(promises);
  
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;
  const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
  
  if (failed === 0) {
    log.success(`All ${concurrentRequests} requests succeeded (avg: ${avgDuration.toFixed(0)}ms)`);
    return true;
  } else {
    log.error(`${failed}/${concurrentRequests} requests failed (avg: ${avgDuration.toFixed(0)}ms)`);
    return false;
  }
}

function generateRecommendations(results) {
  log.section('💡 Recommendations');
  
  if (!results.envVars) {
    log.error('Fix missing environment variables in production');
    log.info('Check your deployment configuration and ensure all required variables are set');
  }
  
  if (!results.connectivity) {
    log.error('External API connectivity issues detected');
    log.info('Check firewall settings, network configuration, and API endpoint status');
  }
  
  if (!results.strapi) {
    log.error('Strapi API issues detected');
    log.info('Verify Strapi server is running and accessible from production environment');
    log.info('Check Strapi server logs for errors');
  }
  
  if (!results.load) {
    log.error('Performance issues under load');
    log.info('Consider implementing request retry logic and circuit breakers');
    log.info('Monitor server resources and scale if necessary');
  }
  
  if (results.envVars && results.connectivity && results.strapi && results.load) {
    log.success('All tests passed! The error might be intermittent or environment-specific');
    log.info('Consider implementing the error monitoring solution for better debugging');
  }
}

async function main() {
  console.log(`${colors.cyan}${colors.bright}🔧 Production Error Debugging Tool${colors.reset}\n`);
  
  const results = {
    envVars: await checkEnvironmentVariables(),
    connectivity: await testExternalConnectivity(),
    strapi: await testStrapiEndpoints(),
    load: await simulateProductionLoad(),
  };
  
  generateRecommendations(results);
  
  log.section('📋 Summary');
  Object.entries(results).forEach(([test, passed]) => {
    if (passed) {
      log.success(`${test}: PASSED`);
    } else {
      log.error(`${test}: FAILED`);
    }
  });
  
  const allPassed = Object.values(results).every(Boolean);
  
  if (allPassed) {
    log.success('\n🎉 All tests passed!');
    process.exit(0);
  } else {
    log.error('\n❌ Some tests failed. Review the recommendations above.');
    process.exit(1);
  }
}

// Load environment variables from .env.local if available
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv not available, continue without it
}

main().catch(error => {
  log.error(`Script failed: ${error.message}`);
  process.exit(1);
});