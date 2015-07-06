// Function validateEmail
// Validates an email to ensure it follows the correct email syntax
function validateEmail(email) 
{
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
/*--------------------------------------------------------------------------------------------------------------------------------*/

// Function validatePhoneNumber
// Validate a 10 digit phone number with no plus in the beggining
function validatePhoneNumber(phoneNumber)  
{  
    var phoneno = /^\d{10}$/; 
      if(phoneNumber.match(phoneno)) 
      {
        return true;
      }
      else 
      {
        return false;
      } 
}
/*--------------------------------------------------------------------------------------------------------------------------------*/