module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // CSS
    sass: {
      dist: {
        options: {
          implementation: require('sass'),
          style: 'expanded',
          precision: 15
        },
        files: [{
          expand: true,
          cwd: 'src/style/',
          src: ['**/*.scss'],
          dest: 'src/style/',
          ext: '.css'
        }]
      }
    },
    concat: {
      css: {
        files: {
          'assets/combined.css': ['src/style/*.css']
        }
      },
      js: {
        files: {
          'assets/combined.js': ['src/js/*.js']
        }
      }
    },
    cssmin: {
      minify: {
        files: {
          'assets/combined.min.css': ['assets/combined.css']
        }
      }
    },
    uglify: {
      js: {
        files: {
          'assets/combined.min.js': ['assets/combined.js']
        }
      }
    },
    compress: {
      css: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, src: ['assets/combined.min.css'], dest: '', ext: '.gz.css'}
        ]
      },
      js: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, src: ['assets/combined.min.js'], dest: '', ext: '.gz.js'}
        ]
      }
    },
    

    
    
    // Linting
    postcss: {
      options: {
        processors: [
          require('stylelint')(),
          require('postcss-reporter')({ clearMessages: true })
        ]
      },
      dist: {
        src: ['src/style/*.css']
      }
    },
    // Watch
    watch: {
      html: {
        files: ['*.html'],
        options: {
        }
      },
      scss: {
        files: ['src/style/**/*.scss'],
        tasks: ['sass'],
        options: {
        }
      },
      css: {
        files: ['src/style/*.css'],
        tasks: ['concat:css', 'cssmin', 'compress:css'],
        options: {
        }
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat:js', 'uglify', 'compress:js'],
        options: {
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compress');
  
  grunt.loadNpmTasks('grunt-sass');
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('@lodder/grunt-postcss');

  grunt.registerTask('lint', [ 'postcss' ]);
  grunt.registerTask('browserSyncCLI', function() {
    var done = this.async();
    require('browser-sync').create().init({
      server: {
        baseDir: "./"
      },
      files: ['assets/*.css', '*.html'],
      ghostMode: true
    }, done);
  });
  grunt.registerTask('default', [ 'browserSyncCLI', 'watch' ]);
};
