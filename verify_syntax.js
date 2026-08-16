import fs from 'fs';
import path from 'path';

function checkDirectory(dir) {
  const files = fs.readdirSync(dir);
  let errorCount = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      errorCount += checkDirectory(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Basic validation checks
      const openBrackets = (content.match(/\{/g) || []).length;
      const closeBrackets = (content.match(/\}/g) || []).length;
      const openParens = (content.match(/\(/g) || []).length;
      const closeParens = (content.match(/\)/g) || []).length;

      if (openBrackets !== closeBrackets) {
        console.error(`❌ Mismatched curly brackets in ${fullPath}: { (${openBrackets}) vs } (${closeBrackets})`);
        errorCount++;
      } else if (openParens !== closeParens) {
        console.error(`❌ Mismatched parentheses in ${fullPath}: ( (${openParens}) vs ) (${closeParens})`);
        errorCount++;
      } else {
        console.log(`✅ File syntax structure OK: ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  }

  return errorCount;
}

console.log('🔍 Validating Ojas Toy Exchange code structure...');
const errors = checkDirectory('./src');

if (errors === 0) {
  console.log('\n🎉 ALL Project files verified cleanly with 0 errors!');
} else {
  console.error(`\n❌ Found ${errors} files with syntax issues.`);
  process.exit(1);
}
