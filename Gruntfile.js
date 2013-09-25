module.exports = function(grunt) {

  grunt.initConfig({
    nodewebkit: {
      options: {
        build_dir: './build', // Where the build version of my node-webkit app is saved
        credits: './public/credits.html',
        mac: true, // We want to build it for mac
        win: false, // We want to build it for win
        linux32: true, // We don't need linux32
        linux64: true, // We don't need linux64
      },
      src: './public/**/*' // Your node-wekit app
    },
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.registerTask('default', ['nodewebkit']);

};
