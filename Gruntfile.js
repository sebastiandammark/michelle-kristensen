/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
			js: {
        src: ['app/assets/js/*.js', 'app/js/*.js'],
        dest: 'tmp/js/functions.min.js'
      },
			css: {
        src: ['app/assets/css/*.css', 'tmp/css/*.css'],
        dest: 'public/css/styles.css'
      }
    },
    uglify: {
      js: {
        src: '<%= concat.js.dest %>',
        dest: 'public/js/functions.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
		compass: {
	    dist: {
	      options: {
					httpPath: 'public',
	        sassDir: 'app/sass',
					imagesDir: 'images',
	        cssDir: 'tmp/css',
	        environment: 'production',
					outputStyle: 'compressed',
					relativeAssets: true,
					noLineComments: true,
					force: true
	      },
	    },
	    dev: {
	      options: {
					httpPath: 'public',
	        sassDir: 'app/sass',
					imagesDir: 'images',
	        cssDir: 'tmp/css',
					environment: 'development',
					outputStyle: 'expanded',
					relativeAssets: true,
					noLineComments: false
	      },
	    }
	  },
		clean: ["tmp"],
		imagemin: {
	    png: {
	      options: {
	        optimizationLevel: 7
	      },
	      files: [
	        {
	          // Set to true to enable the following options…
	          expand: true,
	          // cwd is 'current working directory'
	          cwd: 'app/assets/images/',
	          src: ['**/*.png'],
	          // Could also match cwd line above. i.e. project-directory/img/
	          dest: 'public/images',
	          ext: '.png'
	        }
	      ]
	    },
	    jpg: {
	      options: {
	        progressive: true
	      },
	      files: [
	        {
	          // Set to true to enable the following options…
	          expand: true,
	          // cwd is 'current working directory'
	          cwd: 'app/assets/images/',
	          src: ['**/*.jpg'],
	          // Could also match cwd. i.e. project-directory/img/
	          dest: 'public/images',
	          ext: '.jpg'
	        }
	      ]
	    },
			gif: {
	      options: {
	        progressive: true
	      },
	      files: [
	        {
	          // Set to true to enable the following options…
	          expand: true,
	          // cwd is 'current working directory'
	          cwd: 'app/assets/images/',
	          src: ['**/*.gif'],
	          // Could also match cwd. i.e. project-directory/img/
	          dest: 'public/images',
	          ext: '.gif'
	        }
	      ]
	    }
	  },
		'ftp-deploy': {
		  stage: {
		    auth: {
		      host: '192.168.2.100',
		      port: 21,
		      authKey: 'stage'
		    },
		    src: 'public',
		    dest: 'Web/mk',
		    exclusions: ['public/**/.DS_Store', 'public/**/Thumbs.db'],
		    server_sep: '/'
		  }
		},
		copy: {
		  assets: {
		    files: [
		      {expand: true, flatten: true, src: ['app/assets/fonts/*'], dest: 'public/fonts/', filter: 'isFile'}
		    ]
		  },
			temps: {
		    files: [
		      {expand: true, flatten: true, src: ['<%= concat.js.dest %>'], dest: 'public/js/', filter: 'isFile'}
		    ]
		  }
		},
		watch: {
		  css: {
		    files: ['app/**/*.scss', 'app/**/*.js'],
		    tasks: ['imagemin', 'copy:assets', 'compass:dev', 'concat:js', 'concat:css', 'copy:temps', 'clean'],
		    options: {
		      livereload: true,
		    },
		  },
		},
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['imagemin', 'copy:assets', 'compass:dist', 'concat:js', 'concat:css', 'uglify:js', 'clean']);
  grunt.registerTask('deploy:stage', ['build', 'ftp-deploy:stage']);
};
