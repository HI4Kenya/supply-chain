/***********************************************************************************
* HI4KENYA AFYAINFO BOOTCAMP 2015                                                  *
* -------------------------------                                                  *
* GROUP ONE                                                                        *
* MSH SUPPLY CHAIN HIERARCHY PROJECT	                                           *
* JUNE 2015                                                                        *
* ----------------------------------                                               *
* MEMBERS                                                                          *
*                                                                                  *
* 1. Kelvin Wahome                                                                 *
*    Computer Science                                                              *
* 	 School of Computing and Informatics                                           *
* 	 The University of Nairobi                                                     *
* 	 kevowahome@gmail.com                                                          *
*                                                                                  *
* 2. Dennis Kayeli                                                                 *
*                                                                                  *
* 3. Beatrice Muthoni                                                              *
*                                                                                  *
* 4. Damaris Onyango                                                               *
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

	The purpose of this project is to establish an hierarchy of the drugs supply chain
	that is not captured in DHIS2 for purposes of analysis and report generation.

	As things stand, the Kenya instance of DHIS2 only establishes a hierarchy based on 
	the countries administrative units which while important, does not capture the
	supply chain hierarchy.

	The drug supply hierarchy needs to place facilities in their correct order clearly
	showing the reporting chain ie what facilities report to what and what facilities
	are children so to speak of what facilities.

	Four types of facilities used of drugs supply exist:
		1. CENTRAL STORES
		2. CENTRAL STORE DISPENSING POINTS
		3. SATELLITE STORES
		4. STAND ALONE SITES

	Central Stores are at the top and own (in the reporting hierarchy) the central store
	dispensing points and the satellite stores.

	Central store dispensing points are central points that act as dispensing points 
	which means in essence, it is the same facility but acts as both a central store and
	a dispensing point.

	Satellite stores are facilities that report to the central stores.

	Stand alone sites as the name suggests do not have any affiliation in the reporting
	hierarchy.

	Existing facilities (Level 4) are used as stores for the purpose of drug dispensing.
	These facilities are captures in DHIS2 as Level 4 Organization Units and thus no
	hierarchy exists between them.

	The purpose of this project is to establish that hierarchy.

	-----------------------------------------------------------------------------------
	
	2. APPROACH:
	-----------------------------------------------------------------------------------
	The project is developed as DHIS2 Web APP.

	The Web API is used to a great deal as a source of data for the backborne database
	used. The API allows us to query for all organization units and sort them into
	Counties (Level 2), SubCounties (Level 3) and facilities (Level 4). This data is
	then used to populate the respective tables in the database.

	Once all this data is inserted into the database, the process of establishing which
	facilities lie under which category begins. This is left to the discretion of the
	user who is prompted to supply facilities under each category from the list we have.

	The purpose of incorporating the existing DHIS2 hierarchy of counties and sub-
	counties is to aid the user in the search and selection process by providing a
	mechanism in which they can drill down to a smaller number of facilities as opposed
	to being presented with all the facilities at once.

	Once the Central stores, dispensing points, satellite sites and stand alone sites
	are established and inserted into the database, DHIS2 Web API is queried for 
	analytics based on the hierarchy established and the results displayed.

	-----------------------------------------------------------------------------------
	
	3. DEVELOPMENT TOOLS:
	-----------------------------------------------------------------------------------
	Below is a description of the development tools and technologies used for the test
	instance:
		
		1. Database - MySQL

		   A MySQL database is used to store data. 
		   However, another database like PostgreSQL can also be used and the choice 
		   was purely due to the rapid turn around time

		2. Server side - PHP and Apache2

			The scripting language PHP and web server Apache2 were used for the server
			side logic.
			No PHP framework is used.

		3. DHIS2 Web API Querying - JavaScript, AJAX, jQuery

			To query the JSON API for data, JavaScript and jQuery were used.
			AJAX asynchronous POST was used to send data to the PHP scripts to commit
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

	   		i. ASSETS - These are the resources needed in this project. It contains
	   					the JavaScript, CSS, Bootstrap, Font-Awesome scripts.

	   	   ii. CLIENT - This is the presentation and user interface logic. It contains
	   	   				scripts that will display on the browser.

	   	   				Inside, their is a templates sub-folder that contains header,
	   	   				footer and navigation scripts which are uniform in all the
	   	   				project pages.

	   	  iii. DB 	  - This is the database logic. It contains scripts for database
	   	  				authentication and connection creation as well as those for
	   	  				inserting, fetching and updating items on the database.

	   	  				Edit the db_con (db_auth/db_con.php) file to reflect your local
	   	  				environment

	   	The projects landing page is index.php which is located at its root.

	-----------------------------------------------------------------------------------
***************************************************************************************

USER GUIDE
***************************************************************************************
