HI4KENYA AFYAINFO BOOTCAMP 2015                                                  
MSH SUPPLY PIPELINE HIERARCHY PROJECT

Developed By
Wahome Kelvin
Banga Dennis
Kayeli Dennis

PROJECT NOTES
	
OVERVIEW:
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

