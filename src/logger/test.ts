import LoggerTool from './index';

/*
 * 这是临时的测试文件，后期需要更换成jest或者mocha
 * */
const logs = new LoggerTool();

let i = 0;

logs.setLabel('log-test');

// console.log(`logger:`, logs);

const logActions = (): void => {
  logs.error(`This is an error log item ${i}`, {
    label: 'error-label',
  });

  logs.warn(`This is an warn log item ${i}`, {
    label: 'warn-label',
  });

  logs.info(`This is an info log item ${i}`, {
    label: 'info-label',
  });

  logs.http(`This is an http log item ${i}`, {
    label: 'http-label',
  });

  logs.verbose(`This is an verbose log item ${i}`, {
    label: 'verbose-label',
  });

  logs.debug(`This is an debug log item ${i}`, {
    label: 'debug-label',
  });

  logs.silly(`This is an silly log item ${i}`, {
    label: 'silly-label',
  });
};

for (let j = 0; j < 1; j += 1) {
  i += 1;
  logActions();
}
