********************************************************************************
*                         Crudite Meal Planner                                 *
*                             11/30/2015                                       *
*                                                                              *
********************************************************************************

CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Configuration

 INTRODUCTION
------------
Crudite is being developed with the intent to make home meal planning simple.  The way it works is that you would enter the recipes you want to use through the provided input form, and they are stored in a persistent storage space, whereupon you can select recipes you plan to make, and have a grocery list generated for you to use to obtain the ingredients you will need.


REQUIREMENTS
------------

This module requires the following software to be locally installed:

 * MongoDB (v3.0 or higher)
 * Node.js (v 4.2.2 or higher)

 In addition, the application uses Bootstrap.  It is therefore necessary for bootstrap.min.css to be present in the /public/style directory, and the bootstrap.min.js to be present in the /public/js directory for formatting to work properly.  Alternatively, you could alter /views/layout.jade to point to the appropriate hosted source for Bootstrap instead, or use your own choice for CSS management.

INSTALLATION
------------

To install, first confirm you have a working installation of MongoDB on the local system, then do the following:

1. From a command prompt, browse to the /crudite directory on your system.

2. Enter the command "npm install".  This will automatically download and install the node.js modules required for the application.  For specifics, you can review the package.json file in the /crudite directory.

3. Enter the command "node setup.js".  This will create the necessary database and collection in MongoDB for Crudite to function.

To run the program, from the /crudite directory enter "node app.js".  Open a browser and browse to "localhost:3000".


NOTES
-----
All CRUD operations are functional.  However, when editing a recipe, the ingredients currently stored in that recipe are not displayed in the Ingredients fields.  This will be fixed soon.
Ingredients are limited to five per recipe for the moment while I work out the best of several approaches to handling an indeterminate number of ingredients per recipe.
Some directories, such as /plugins, /middleware, and /helpers, are not yet being used.  These are included to ease addition of later features.
