var APP_SRC = './public/**';

module.exports = function(grunt) {

  grunt.initConfig({
    // node-webkit build stuff
    nodewebkit: {
      options: {
        build_dir: './build' // Where the build version of my node-webkit app is saved
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
      linux32: {
        options: {
          mac: false,
          win: false,
          linux32: true,
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
    shell: {
      buildUtmq: {
        options: {
          stdout: true,
          stderr: true
        },
        command: [
          'cd node_modules/utmq-viewer',
          'npm install',
          'bower install',
          'grunt '
        ].join(' && ')
      },
      openMac: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'open build/releases/UTMQ/mac/UTMQ.app'
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'node_modules/utmq-viewer/dist',
        src: '**',
        dest: 'public/'
      },
      extras: {
        expand: true,
        cwd: 'extras',
        src: '**',
        dest: 'public/'
      }
    },
    clean: {
      build: ['public'],
      // this below fixes an issue with the wrong package.json
      // https://github.com/mllrsohn/grunt-node-webkit-builder/issues/15
      pkgFix: [
        'public/bower_components/**/package.json'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['buildMac', 'shell:openMac']);
  grunt.registerTask('setup', ['clean', 'shell:buildUtmq', 'copy:main', 'copy:extras', 'clean:pkgFix']);

  grunt.registerTask('buildLinux32', ['setup', 'nodewebkit:linux32']);
  grunt.registerTask('buildMac', ['setup', 'nodewebkit:mac']);
  grunt.registerTask('build', ['setup', 'nodewebkit:all']);


};
