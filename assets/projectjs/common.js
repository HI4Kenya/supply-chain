/*Function to change the icon in the collapsible menu*/
function changeIcon()
{
    var icon=$(".changed");
    if (icon.hasClass("glyphicon-plus-sign"))
    {
        icon.removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
    }
    else if (icon.hasClass("glyphicon-minus-sign"))
    {
        icon.removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
    }
    else
    {
        icon.removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
    }                

}
/*--------------------------------------------------------------------------------------------------------------------------------*/

/*Function to select a facility for analytics*/
function selectFacility(facilityID)
{ 
    var facility=$("#"+facilityID);
    if (facility.hasClass("unclickedColor"))
    {
        facility.removeClass("unclickedColor").addClass("clickedColor selectedFacility");
    }
    else
    {
        facility.removeClass("clickedColor selectedFacility").addClass("unclickedColor");
    }
    
}
/*--------------------------------------------------------------------------------------------------------------------------------*/
/*Function to change the color of the clicked item*/
function changeColor(type)
{
    var color=$(".color");
    if (color.hasClass("unclickedColor"))
    {
        color.removeClass("unclickedColor").addClass("clickedColor");
    } 

    else if (color.hasClass("clickedColor"))
    {
        color.removeClass("clickedColor").addClass("unclickedColor");
    }              
             

}
/*--------------------------------------------------------------------------------------------------------------------------------*/