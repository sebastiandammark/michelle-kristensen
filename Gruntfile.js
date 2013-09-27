/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
			dev: {
        src: ['app/js/*.js'],
        dest: 'public/js/functions.min.js'
      },
			dist: {
        src: ['app/js/*.js'],
        dest: 'tmp/js/functions.min.js'
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
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
	        cssDir: 'public/css',
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
	        cssDir: 'public/css',
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
		      host: '127.0.0.1',
		      port: 21,
		      authKey: 'figureitout'
		    },
		    src: 'public',
		    dest: '{destination path}',
		    exclusions: ['public/**/.DS_Store', 'public/**/Thumbs.db'],
		    server_sep: '/'
		  }
		},
		watch: {
		  css: {
		    files: ['app/**/*.scss', 'app/**/*.js'],
		    tasks: ['compass:dev', 'concat:dev'],
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['watch', 'concat:dev', 'compass:dev', 'clean', 'imagemin']);
  grunt.registerTask('build', ['concat:dist', 'uglify:dist', 'compass:dist', 'clean', 'imagemin']);
  grunt.registerTask('deploy:stage', ['build', 'ftp-deploy:stage']);
};
