const path = require('path');
const fs = require('fs');
const { PNG } = require('pngjs');
const getHull = require('hull.js');

const getPoints = ({ width, height, data }) => {
  const points = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let idx = (width * y + x) << 2;
      const channels = data[idx] + data[idx + 1] + data[idx + 2];
      if (channels > (255 * 3) / 2) {
        points.push([x, y]);
      }
    }
  }
  return points;
};

const getCentroid = (points) => {
  const first = points[0];
  const last = points[points.length - 1];
  if (first.x != last.x || first.y != last.y) {
    points.push(first);
  }
  let x = 0;
  let y = 0;
  let twiceArea = 0;
  let f = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const p1 = points[i];
    const p2 = points[j];
    f = p1[0] * p2[1] - p2[0] * p1[1];
    twiceArea += f;
    x += (p1[0] + p2[0]) * f;
    y += (p1[1] + p2[1]) * f;
  }
  f = twiceArea * 3;
  return [x / f, y / f];
};

const getMeta = (imagePath) => {
  const png = PNG.sync.read(fs.readFileSync(imagePath));
  const points = getPoints(png);
  const hull = getHull(points, 1);
  const centroid = getCentroid([...hull]);
  return { hull, centroid };
};

const outputDir = path.resolve(__dirname, '../dist');
const assetsDir = path.resolve(__dirname, '../assets');
const beforePath = path.join(assetsDir, 'before.png');
const afterPath = path.join(assetsDir, 'after.png');

const before = getMeta(beforePath);
const after = getMeta(afterPath);

const translate = [
  after.centroid[0] - before.centroid[0],
  after.centroid[1] - before.centroid[1],
];

const getFarthestRelative = ({ hull, centroid }) => {
  const [cx, cy] = centroid;
  return hull
    .map(([x, y]) => {
      const [rx, ry] = [x - cx, y - cy];
      return {
        distance: Math.sqrt(rx ** 2, ry ** 2),
        relative: [rx, ry],
      };
    })
    .reduce(
      (prev, curr) => (!prev || curr.distance > prev.distance ? curr : prev),
      undefined
    ).relative;
};

const [bx, by] = getFarthestRelative(before);
const [ax, ay] = getFarthestRelative(after);
const rotate = -Math.acos(
  (bx * ax + by * ay) / Math.sqrt((bx ** 2 + by ** 2) * (ax ** 2 + ay ** 2))
);

const result = {
  before,
  after,
  transform: {
    translate,
    rotate,
  },
};

console.log('translation =', translate);
console.log('rotataion =', rotate);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(
  path.join(outputDir, 'result.json'),
  JSON.stringify(result, null, 2)
);
