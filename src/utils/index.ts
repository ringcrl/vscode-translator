/**
 * @summary 搜狗 API 调用 UUID 计算
 */
export const _sougouUuid = () => {
  let t;
  let e;
  let n = '';
  for (t = 0; t < 32; t++) {
    /* tslint:disable */
    (e = (16 * Math.random()) | 0),
    (t !== 8 && t !== 12 && t !== 16 && t !== 20) || (n += '-'),
    (n += (t === 12 ? 4 : t === 16 ? (3 & e) | 8 : e).toString(16));
    /* tslint:enable */
  }

  return n;
};
