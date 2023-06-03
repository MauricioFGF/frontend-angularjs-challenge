module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    concat: {
      options: {
        separator: ";",
      },
      dist: {
        files: {
          "build/strands/strands.json": ["app/strands/strands.json"],
        },
      },
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ["app/view/*"],
            dest: "build/view/",
          },
          {
            expand: true,
            flatten: true,
            src: ["app/components/*"],
            dest: "build/components/",
          },
        ],
      },
    },

    uglify: {
      my_target: {
        files: {
          "build/js/script.min.js": [
            "app/js/*.js",
            "app/js/*/*.js",
            "app/lib/ngDialog/*.js",
          ],
        },
      },
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          "build/css/style.min.css": [
            "app/css/*.css",
            "app/lib/ngDialog/*.css",
          ],
        },
      },
    },

    processhtml: {
      options: {},
      dist: {
        files: {
          "build/index.html": ["app/index.html"],
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-processhtml");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.registerTask("build", [
    "concat",
    "copy",
    "uglify",
    "cssmin",
    "processhtml",
  ]);
};
