import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前模块的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 需要过滤的文件和目录规则
const FILTER_RULES = [
  '.DS_Store',
  path.join('duxapp', 'userTheme'),
  path.join('duxapp', 'config', 'userConfig.js')
];

async function main() {
  try {
    // 1. 从当前项目的多个一级目录下查找install.json
    const projectRoot = __dirname; // 假设当前脚本在项目子目录中
    const dirEntries = await fs.readdir(projectRoot, { withFileTypes: true });
    const subDirs = dirEntries
      .filter(dirent => dirent.isDirectory())
      .map(dirent => path.join(projectRoot, dirent.name));

    // 查找所有一级目录中的install.json
    const installJsonPaths = [];
    for (const dir of subDirs) {
      try {
        const potentialPath = path.join(dir, 'install.json');
        await fs.access(potentialPath); // 检查文件是否存在
        installJsonPaths.push(potentialPath);
      } catch {
        // 文件不存在则忽略
      }
    }

    if (installJsonPaths.length === 0) {
      throw new Error('未找到任何install.json文件');
    }

    // 2. 读取所有install.json中的app字段并合并
    const allApps = [];
    for (const jsonPath of installJsonPaths) {
      const installData = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
      const apps = Array.isArray(installData.app) ? installData.app : [installData.app].filter(Boolean);
      allApps.push(...apps);
    }

    // 3. 设置源目录路径
    const sourceDir = path.join(projectRoot, '../duxapp/src');

    // 4. 递归查找所有依赖
    const allDependencies = await resolveDependencies(allApps, sourceDir);

    // 6. 清空并创建目标目录
    const targetDir = path.join(__dirname, 'apps');
    await fs.rm(targetDir, { recursive: true, force: true });
    await fs.mkdir(targetDir, { recursive: true });

    // 复制所有应用
    for (const app of allDependencies) {
      const sourceAppDir = path.join(sourceDir, app);
      const targetAppDir = path.join(targetDir, app);
      
      try {
        await fs.access(sourceAppDir);
        await copyDirectory(sourceAppDir, targetAppDir, app);
        console.log(`已复制应用: ${app}`);
      } catch (err) {
        console.error(`应用 ${app} 不存在于源目录中`);
      }
    }

    console.log('所有应用已成功复制到 apps 目录');
  } catch (error) {
    console.error('处理过程中出错:', error);
  }
}

/**
 * 检查文件是否应该被过滤
 * @param {string} filePath 文件路径
 * @param {string} appName 应用名称
 * @returns {boolean} 是否应该过滤
 */
function shouldFilter(filePath, appName) {
  const relativePath = path.relative(appName, filePath);
  
  return FILTER_RULES.some(rule => {
    return relativePath.includes(rule)
  });
}

/**
 * 递归解析应用依赖
 * @param {string[]} appNames 应用名称数组
 * @param {string} sourceDir 源目录
 * @param {Set<string>} [resolvedApps] 已解析的应用集合
 * @returns {Promise<string[]>} 所有依赖的应用数组
 */
async function resolveDependencies(appNames, sourceDir, resolvedApps = new Set()) {
  for (const appName of appNames) {
    if (resolvedApps.has(appName)) continue;

    resolvedApps.add(appName);
    const appJsonPath = path.join(sourceDir, appName, 'app.json');

    try {
      const appData = JSON.parse(await fs.readFile(appJsonPath, 'utf-8'));
      if (appData.dependencies && Array.isArray(appData.dependencies)) {
        await resolveDependencies(appData.dependencies, sourceDir, resolvedApps);
      }
    } catch (err) {
      console.error(`无法读取应用 ${appName} 的 app.json:`, err.message);
    }
  }

  return Array.from(resolvedApps);
}

/**
 * 复制目录（带过滤功能）
 * @param {string} source 源目录
 * @param {string} target 目标目录
 * @param {string} appName 应用名称
 */
async function copyDirectory(source, target, appName) {
  await fs.mkdir(target, { recursive: true });
  
  const entries = await fs.readdir(source, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(target, entry.name);
    
    // 检查是否应该过滤此文件/目录
    if (shouldFilter(srcPath, appName)) {
      console.log(`过滤文件: ${srcPath}`);
      continue;
    }
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath, appName);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// 执行主函数
main();