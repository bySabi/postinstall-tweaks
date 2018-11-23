const editJsonFile = require('edit-json-file');
const fs = require('fs');

const _module = [
    {
        path: "./node_modules/react/package.json",
        update: {
            "version": "16.7.99"
        }
    },
    {
        path: "./node_modules/react-native/package.json",
        update: {
            "version": "0.58.99"
        }
    }
];

_module.forEach(function(m) {
    fs.stat(m.path, function(err, stat) {
        if(err == null) {
            const file = editJsonFile(m.path);
            const { update } = m;
            for (const key in update) {
                file.set(key, update[key]);
            }
            file.save();
        } else if(err.code === 'ENOENT') {
            console.log(`ERROR: File not found "${m.path}"`);
        } else {
            console.log(`ERROR: Something bad happens "${err.code}"`);
        }
    });
});
