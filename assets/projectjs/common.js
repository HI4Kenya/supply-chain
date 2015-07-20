/*Function to change the icon in the collapsible menu*/
function changeIcon(itemID)
{
    var icon=$("#"+itemID);

    if (icon.hasClass("glyphicon-plus-sign"))
    {
        icon.removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");

        // if(icon.hasClass("fa fa-folder-o"))
        // {
        //     icon.removeClass("fa fa-folder-o").addClass("fa fa-folder-open");
        // }
        // else
        // {
        //     icon.removeClass("fa fa-folder-open").addClass("fa fa-folder-o");
        // } 
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
    var any = $(".color");
    var facility=$("#"+facilityID);

    if (any.hasClass("clickedColor selectedFacility"))
    {
        any.removeClass("clickedColor selectedFacility").addClass("unclickedColor");

        if (facility.hasClass("unclickedColor"))
        {
            facility.removeClass("unclickedColor").addClass("clickedColor selectedFacility");
        }
        else
        {
            facility.removeClass("clickedColor selectedFacility").addClass("unclickedColor");
        }
    }
    
    else
    {
        if (facility.hasClass("unclickedColor"))
        {
            facility.removeClass("unclickedColor").addClass("clickedColor selectedFacility");
        }
        else
        {
            facility.removeClass("clickedColor selectedFacility").addClass("unclickedColor");
        }

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