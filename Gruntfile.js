module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		sass: {
			dist: {
				files: {
					"css/main.css" : "scss/main.scss"
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		},
		exec: {
			run: {
				command: 'electron main.js'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exec');
	
	grunt.registerTask('default', 'exec');
	grunt.registerTask('dev', ['sass']);
	grunt.registerTask('release', ['sass']);
}