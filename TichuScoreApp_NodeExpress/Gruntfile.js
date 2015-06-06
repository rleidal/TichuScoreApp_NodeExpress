/*global module */
    'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        // read in the project settings from the package.json file into the pkg property
        pkg: grunt.file.readJSON('package.json'),

        // define configuration for each of the tasks we have
        // this is a sample jshint task config
        /*
            jshint: {
                    // define the files to lint
                    files: ['gruntfile.js', 'src/*.js', '/*.js'],
                    // configure JSHint (documented at http://www.jshint.com/docs/)
                    options: {
                    // more options here if you want to override JSHint defaults
                    globals: {
                            jQuery: true,
                            console: true,
                            module: true
                            }
                        }
                    }
        */
        //copy: {
        //    stash_node: {
        //        cwd: '.',
        //        src: ['node_modules/**/*'],
        //        dest: '../',
        //        expand:true,
        //    },
        //    restore_node: {
        //        files: [],
        //    },
        //},
    });

    // Add all plugins that your project needs here
    grunt.loadNpmTasks('grunt-contrib-copy');
    

    // this would be run by typing "grunt test" on the command line
    // the array should contains the names of the tasks to run
    grunt.registerTask('test', []);

    // define the default task that can be run just by typing "grunt" on the command line
    // the array should contains the names of the tasks to run
    grunt.registerTask('default', []);
    
    grunt.registerTask('buildDeploy', 'Sample task that finds all the js files', function () {
        mvJsFiles();
    });

    
    function mvJsFiles() {
        var i = 0;
        var files = grunt.file.expand({matchBase:true},['*.js','*.json','*.md','*.jade', 'public/**', '!node_modules/**', '!*.ts']);
        for (i = 0; i < files.length; i++) {
            if (grunt.file.isFile(files[i])) {
                grunt.log.writeln("Copying File: " + files[i]);
                grunt.file.copy(files[i], 'bin/Deploy/' + files[i]);
            }
        }
    }
    
};

