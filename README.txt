/***********************************************************************************
* HI4KENYA AFYAINFO BOOTCAMP 2015                                                  *
* -------------------------------                                                  *
* MSH SUPPLY PIPELINE HIERARCHY PROJECT	                                           *
* JUNE 2015                                                                        *
* ----------------------------------                                               *
* DEVELOPED BY:                                                                    *
*                                                                                  *
* 1. Kelvin Wahome                                                                 *
*    Computer Science                                                              *
* 	 School of Computing and Informatics                                           *
* 	 The University of Nairobi                                                     *
* 	 kevowahome@gmail.com                                                          *
*                                                                                  *
* 2. Dennis Banga                                                                  *
*                                                                                  *
* 3. Dennis Kayeli                                                                 *
* ---------------------------------------------------------------------------------*
**
* By Kelvin Wahome
**
* ---------------------------------------------------------------------------------*
*/

PROJECT NOTES
**************************************************************************************
	
	1. OVERVIEW:
	-----------------------------------------------------------------------------------

	The purpose of this project is to establish a hierarchy of the drugs supply chain
	that is not captured in DHIS2 for purposes of analysis and report generation.

	Currently, the Kenya instance of DHIS2 only establishes a hierarchy based on 
	the countries administrative units which while important, does not capture the
	supply chain hierarchy.

	The drug supply hierarchy needs to place facilities in their correct order clearly
	showing the reporting chain ie what facilities report to what and what facilities
	are children so to speak of what facilities.

	Five types of facilities used of drugs supply exist:
		1. SUB-COUNTY STORES
		2. CENTRAL SITES
		3. CENTRAL SITE / SUB-COUNTY STORE DISPENSING POINTS
		4. SATELLITE SITES
		5. STAND ALONE SITES

	Sub-county stores are at the top and own (in the reporting hierarchy) the sub-county store
	dispensing points and the sub-county store satellite sites.

	Central Sites are at the same level with the sub-county stores and own (in the reporting 
	hierarchy) the central site dispensing points and the central site satellite sites.

	Central site dispensing points are central sites or sub-county stores that act as 
	dispensing points which means in essence, it is the same facility but acts as both a central 
	site or a sub-county store and a dispensing point.

	Satellite sites are facilities that report to their parent sites (Central sites or sub-county
	stores).

	Stand alone sites as the name suggests do not have any affiliation in the reporting
	hierarchy.

	Existing facilities (Level 4) are used as sites for the purpose of drug dispensing.
	These facilities are captured in DHIS2 as Level 4 Organization Units and thus no
	hierarchy exists between them.

	Each program has its own list of sites thus the hierarchy is determined by the program.

	The purpose of this project is to establish that hierarchy, use it to generate reports
	and post back data to DHIS2 as well

	-----------------------------------------------------------------------------------
	
	2. APPROACH:
	-----------------------------------------------------------------------------------
	Thhis system is developed as a stand alone web application requiring 
	user authentication before access.

	The Web API is used to a great deal as a source of data for the backborne database
	used. The API allows us to query for all organization units and sort them into
	Counties (Level 2), SubCounties (Level 3) and facilities (Level 4). This data is
	then used to populate the respective tables in the database.

	In addition, users can be pulled from DHIS2 and registered to access this system.

	Once all this data is inserted into the database, the process of establishing which
	facilities lie under which category begins. This is left to the discretion of the
	user who is prompted to supply facilities under each category from the list we have.

	The purpose of incorporating the existing DHIS2 hierarchy of counties and sub-
	counties is to aid the user in the search and selection process by providing a
	mechanism in which they can drill down to a smaller number of facilities as opposed
	to being presented with all the facilities at once.

	Once the sub-county stores, central sites, dispensing points, satellite sites and 
	stand alone sites  are established and inserted into the database, DHIS2 Web API 
	is queried for analytics based on the hierarchy established and the results displayed.

	-----------------------------------------------------------------------------------
	
	3. DEVELOPMENT TOOLS:
	-----------------------------------------------------------------------------------
	Below is a description of the development tools and technologies used for the test
	instance:
		
		1. Database - MySQL

		   A MySQL database is used to store data. The sql dump file is attached 
		   (msh_task.sql)

		2. Server side - PHP and Apache2

			The scripting language PHP and web server Apache2 were used for the server
			side logic.
			No PHP framework is used.

		3. DHIS2 Web API Querying - JavaScript, AJAX, jQuery, PHP CURL

			To query the JSON API for data, JavaScript, jQuery and PHP CURL are used.
			AJAX asynchronous POST is used to send data to the PHP scripts to commit
			to the database

		4. User Interface (Presentation) - HTML5, Bootstrap, Font-Awesome, 
										   JavaScript, jQuery

			Since this is a Web APP, the interface is coded in HTML5 with Bootstrap &
			Font-Awesome frameworks incorporated to provide a better user experience
			JavaScript and jQuery are also used to make the interface responsive and
			event/data driven

	-----------------------------------------------------------------------------------
	4. PROJECT STRUCTURE:
	-----------------------------------------------------------------------------------
 
	   The project folder contains three sub-folders: assets, client, db
	   Each of the sub-folders forms an important part of this project.

	   		i. api 	  - These are PHP5_CURL scripts that interact with the DHIS2 API.
	   					Data querying from DHIS2 API and some level of processing is
	   					done here

	   	   ii. assets - These are the resources needed in this project. It contains
	   					the JavaScript, CSS, Bootstrap, Font-Awesome scripts.

	   	  iii. client - This is the presentation and user interface logic. It contains
	   	   				scripts that will display on the browser.

	   	   				Inside, their is a templates sub-folder that contains header,
	   	   				footer and navigation scripts which are uniform in all the
	   	   				project pages.

	   	  iv. db 	  - This is the database logic. It contains scripts for database
	   	  				authentication and connection creation as well as those for
	   	  				inserting, fetching and updating items on the database.

	   	   v. system  - This is the system environment variables. It contains parameters
	   	   				that need to be set for the system to run once deployed. They
	   	   				include the database authentication and connection creation 
	   	   				parameters as well as DHIS2 authentication parameters.

	   	  				Edit the config (config.php) file to reflect your local
	   	  				environment

	   	The projects landing page is index.php which is located at its root. It is the
	   	login page

	-----------------------------------------------------------------------------------
	5. DEPLOYMENT PREREQUISITES:
	-----------------------------------------------------------------------------------
 
	   	You require the following when deploying this system

	   		i. PHP_CURL
	   	   ii. MySQL and MySQLI

	-----------------------------------------------------------------------------------

***************************************************************************************

USER GUIDE
***************************************************************************************
