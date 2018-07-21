import { sougou } from './request';
import { _sougouUuid } from '../utils';
const { google } = require('translation.js');

async function getSougouTranslateResult(srcText:string) {
  const payload:any = {
    from: 'auto',
    to: 'zh-CHS',
    client: 'pc',
    fr: 'browser_pc',
    srcText,
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

  
  const translateResult:any = await sougou.post('/reventondc/translate', data);
  if (translateResult.errorCode !== 0) { return; }
  const translateText = translateResult.translate.dit;
  return translateText;
}

async function getGoogleTranslateResult(srcText:string) {
  const translateResult:any = await google.translate(srcText);
  const translateText = translateResult.dict ? 
    translateResult.dict.join('\n') :
    translateResult.result.join('\n');
  return translateText;
}

export default {
  getSougouTranslateResult,
  getGoogleTranslateResult,
};