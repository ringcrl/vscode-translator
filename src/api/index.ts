import { google, sougou } from './request';
import { _sougouUuid } from '../utils';

export default {
  googleTranslate(text:string, tk:any) {
    return google('/translate_a/single', {
      params: {
        client: 't',
        sl: 'auto',
        tl: 'zh-CN',
        hl: 'zh-CN',
        tk,
        dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
        ie: 'UTF-8',
        oe: 'UTF-8',
        otf: '1',
        ssel: '0',
        tsel: '0',
        kc: '7',
        q: text
      }
    });
  },
  sougouTranslate(text:string) {
    const payload:any = {
      from: 'auto',
      to: 'zh-CHS',
      client: 'pc',
      fr: 'browser_pc',
      text,
      useDetect: 'on',
      useDetectResult: 'on',
      needQc: 1,
      uuid: _sougouUuid(),
      oxford: 'on',
      isReturnSugg: 'on'
    };

    const data = Object.keys(payload).reduce((a, b) => {
      return a + `${b === 'from' ? '' : '&'}${b}=${payload[b]}`;
    }, '');

    return sougou.post('/reventondc/translate', data);
  }
};