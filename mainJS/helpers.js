// Function to load a JSON file and update it

const fs = require('fs')




module.exports = {
    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    isObject: function (item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },

    /**
     * Deep merge two objects.
     * @param target
     * @param ...sources
     */
    mergeDeep: function (target, sources, mergeMethod = Object.assign) {
        if (module.exports.isObject(sources)) {
            sources = [sources]
        }
        if (!sources.length) return target;
        const source = sources.shift();

        if (module.exports.isObject(target) && module.exports.isObject(source)) {
            for (const key in source) {
                if (module.exports.isObject(source[key])) {
                    if (!target[key]) mergeMethod(target, { [key]: {} });
                    module.exports.mergeDeep(target[key], source[key]);
                } else {
                    mergeMethod(target, { [key]: source[key] });
                }
            }
        }

        return module.exports.mergeDeep(target, sources);
    },

    updateJSON: function (filePath, updateObject, overwrite = true) {
        let data = {};

        try {
            let text = fs.readFileSync(filePath)
            data = JSON.parse(text)
        } finally {
            // Create new data
            if (overwrite) {
                // FIXME: I tink tat object.assin needs to be a kind of deeper version
                data = Object.assign(data, updateObject)
            } else {
                data = Object.assign(updateObject, data)
            }

            fs.writeFileSync(filePath, JSON.stringify(data))
        }
    },

    // https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
    updateJSONDeep: function (filePath, updateObject, overwrite = true) {
        let data;

        try {
            let text = fs.readFileSync(filePath)
            data = JSON.parse(text)
        } catch (err) {
            if (err.code == "ENOENT") {
                data = {};
            } else { // I'm pretty sure that it is good practice to throw all the errors you aren't intending to happen
                throw err;
            }
        } finally {
            let mergeMethod = Object.assign;
            if (!overwrite) {
                mergeMethod = (a, b) => Object.assign(b, a)
            }

            const merged = module.exports.mergeDeep(data, updateObject, mergeMethod);

            // Also creates the file if necessary
            fs.writeFileSync(filePath, JSON.stringify(merged))
        }
    }
}