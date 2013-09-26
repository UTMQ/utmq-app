var APP_SRC = './public/**/*';

module.exports = function(grunt) {

  grunt.initConfig({
    // node-webkit build stuff
    nodewebkit: {
      options: {
        version: '0.7.5',
        build_dir: './build', // Where the build version of my node-webkit app is saved
        credits: './public/credits.html'
      },
      // the mac version is the default debug build
      mac: {
        options: {
          mac: true,
          win: false,
          linux32: false,
          linux64: false
        },
        src: APP_SRC
      },
      all: {
        options: {
          mac: true,
          win: true,
          linux32: true,
          linux64: true
        },
        src: APP_SRC
      }
    },
    // watch
    watch: {
      scripts: {
        files: [ APP_SRC ],
        tasks: [ 'nodewebkit:mac' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['nodewebkit']);
  grunt.registerTask('dev', ['nodewebkit']);

};
