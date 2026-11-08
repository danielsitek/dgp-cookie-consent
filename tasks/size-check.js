// Reports raw, gzip (level 9) and Brotli (quality 11) sizes of the shipped bundles
// against the reviewed budgets in size-budget.json. Never writes the budget file.
const { readFileSync, existsSync } = require('fs');
const { gzipSync, brotliCompressSync, constants } = require('zlib');
const path = require('path');

const root = path.resolve(__dirname, '..');
const budget = JSON.parse(readFileSync(path.join(root, 'size-budget.json'), 'utf8'));
const METRICS = ['raw', 'gzip', 'brotli'];

const measure = (buffer) => ({
  raw: buffer.length,
  gzip: gzipSync(buffer, { level: 9 }).length,
  brotli: brotliCompressSync(buffer, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  }).length,
});

const formatDelta = (value) => (value > 0 ? `+${value}` : `${value}`);

const runtime = {
  node: process.version,
  zlib: process.versions.zlib,
  brotli: process.versions.brotli,
};

console.log(`Runtime: Node ${runtime.node}, zlib ${runtime.zlib}, brotli ${runtime.brotli}`);

const recorded = budget.baseline.runtime;
if (runtime.zlib !== recorded.zlib || runtime.brotli !== recorded.brotli) {
  console.warn(
    `Warning: baseline was measured with zlib ${recorded.zlib}, brotli ${recorded.brotli}; compressed sizes may differ.`,
  );
}

if (process.version.split('.')[0] !== `v${budget.canonicalNode}`) {
  console.warn(`Warning: the canonical Node version for this gate is ${budget.canonicalNode}.`);
}

const rows = [];
const combined = { raw: 0, gzip: 0, brotli: 0 };
const combinedBase = { raw: 0, gzip: 0, brotli: 0 };
let failed = false;

for (const file of Object.keys(budget.limits)) {
  const filePath = path.join(root, file);

  if (!existsSync(filePath)) {
    console.error(`Missing ${file}, run \`npm run build:prod\` first.`);
    process.exit(1);
  }

  const size = measure(readFileSync(filePath));
  const base = budget.baseline.bundles[file];
  const limit = budget.limits[file];

  for (const metric of METRICS) {
    const over = size[metric] > limit[metric];
    failed = failed || over;
    combined[metric] += size[metric];
    combinedBase[metric] += base[metric];

    rows.push({
      bundle: file,
      metric,
      bytes: size[metric],
      delta: formatDelta(size[metric] - base[metric]),
      limit: limit[metric],
      status: over ? 'OVER' : 'ok',
    });
  }
}

for (const metric of METRICS) {
  rows.push({
    bundle: 'combined',
    metric,
    bytes: combined[metric],
    delta: formatDelta(combined[metric] - combinedBase[metric]),
    limit: '',
    status: '',
  });
}

console.table(rows);

if (failed) {
  console.error('Size budget exceeded. Reduce the bundle or raise the limit in size-budget.json after review.');
  process.exit(1);
}
