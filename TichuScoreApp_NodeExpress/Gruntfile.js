/*global module */
    'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        // read in the project settings from the package.json file into the pkg property
        pkg: grunt.file.readJSON('package.json'),

        githooks: {
            all: {
                'pre-commit': 'stashNode',
                'post-commit': 'restoreNode',
            }
        },
        exec: {
            stashNode: {cmd: genstash },//'move ./node_modules/googleapis ./node_modules/socketio-jwt ../;',
            restoreNode: { cmd: genrestore }, //'move ../googleapis ./node_modules',
        },

    });
    
    var problem_nodes = ['googleapis', 'socketio-jwt', 'tsd'];
    function genstash() {
        var cmd = '';
        problem_nodes.forEach(function (p) {
            cmd += 'move ./node_modules/' + p + " ../ &";
        });
        return cmd;
    }
    
    function genrestore() {
        var cmd = '';
        problem_nodes.forEach(function (p) {
            cmd += 'move ../' + p + " ./node_modules &";
        });
        return cmd;
    }
    
    // Add all plugins that your project needs here
    grunt.loadNpmTasks('grunt-githooks');
    grunt.loadNpmTasks('grunt-exec');

    // this would be run by typing "grunt test" on the command line
    // the array should contains the names of the tasks to run
    grunt.registerTask('test', []);

    // define the default task that can be run just by typing "grunt" on the command line
    // the array should contains the names of the tasks to run
    grunt.registerTask('default', []);
    
    grunt.registerTask('buildDeploy', 'Sample task that finds all the js files', function () {
        mvJsFiles();
    });

    
    //    grunt.registerTask('stashNode', 'Stash the node_module directory for commit purposes', function () { stashNode(); });
    //    grunt.registerTask('restoreNode', 'Restore the node_module directory for commit purposes', function () { restoreNode(); });
    

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

