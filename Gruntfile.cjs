
module.exports = (grunt) => {

    const builder = require(`corifeus-builder`);
    const loader = new builder.loader(grunt);
    loader.js({
        replacer: {
            type: 'p3x',
        },
    });

    let defaults = builder.config.task.build.js.slice()
    grunt.registerTask('default', defaults);

}
