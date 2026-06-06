const fs = require('fs');
const path = require('path');

const directories = ['app', 'components', 'lib'];
const replacements = {
    'Bhuvan Soni': 'Riddhi-tg',
    'Bhuvan.': 'Riddhi-tg.',
    'Bhuvan': 'Riddhi-tg',
    'BHUVAN': 'RIDDHI-TG',
    'bhuvansoni.com': 'riddhitg.com',
    'linkedin.com/in/bhuvansoni': 'linkedin.com/in/riddhi-tg',
    'contact@bhuvansoni.com': 'hello@riddhitg.com',
    'Finance & Data Portfolio': 'Web3 & AI Portfolio',
    'finance': 'web3',
    'data analytics': 'machine learning',
    'CMA US': 'GenAI',
    'Power BI': 'React',
    'SQL': 'Next.js',
    'SAP': 'Solidity',
    'Jaipur': 'San Francisco',
    'BCom Student': 'Software Engineer'
};

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css') || fullPath.endsWith('.txt')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;
            for (let k in replacements) {
                newContent = newContent.split(k).join(replacements[k]);
            }
            if (newContent !== content) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log('Updated', fullPath);
            }
        }
    });
}

directories.forEach(walk);
