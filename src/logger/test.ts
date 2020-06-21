import LoggerTool from './index';

/*
 * 这是临时的测试文件，后期需要更换成jest或者mocha
 * */
const logs = new LoggerTool();

let i = 0;

logs.setLabel('log-test');

// console.log(`logger:`, logs);

const logActions = (): void => {
  logs.error(`This is an error log item ${i}`, {});

  logs.warn(`This is an warn log item ${i}`, {});

  logs.info(`This is an info log item ${i}`, {});

  logs.http(`This is an http log item ${i}`, {});

  logs.verbose(`This is an verbose log item ${i}`, {});

  logs.debug(`This is an debug log item ${i}`, {});

  logs.silly(`This is an silly log item ${i}`, {});
};

for (let j = 0; j < 1; j += 1) {
  i += 1;
  logActions();
}
