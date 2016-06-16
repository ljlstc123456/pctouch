module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {  
         options: {  
         },  
         dist: {  
             files: {  
                 'dist/pctouch.min.js': 'src/pctouch.js'  
             }  
         }  
     }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};