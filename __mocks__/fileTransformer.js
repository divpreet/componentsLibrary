// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    process(_src_, filename) {
        return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
    }
};
