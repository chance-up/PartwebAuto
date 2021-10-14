jQuery.fn.serializeObject = function() { 
    var obj = null; 
    try { 
    if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) { 
        var arr = this.serializeArray(); 
        if(arr){ obj = {}; 
        jQuery.each(arr, function() { 
            obj[this.name] = this.value; }); 
        } 
    } 
    }catch(e) { 
        alert(e.message); 
    }finally {} 
    return obj; 
}


function initDatePicker() {
    moment.locale('en', {
        week: { dow: 1 } // Monday is the first day of the week
    });

    //$("#weeklyDatePicker").val(firstDate + " - " + lastDate)

    console.log(moment().day(1).format("YYYY-MM-DD"))
    console.log(moment().day(5).format("YYYY-MM-DD"))

    //Initialize the datePicker(I have taken format as mm-dd-yyyy, you can     //have your owh)
    $("#weeklyDatePicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat:'YYYY-MM',
        daysOfWeekDisabled:[0,6],
        toolbarPlacement:'top'
    });

    $("#weeklyDatePicker").val(moment().day(1).format("YYYY-MM-DD") + " ~ " + moment().day(5).format("YYYY-MM-DD"));

    //Get the value of Start and End of Week
    $('#weeklyDatePicker').on('dp.change', function (e) {
        var value = $("#weeklyDatePicker").val();
        var firstDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
        var lastDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
        $("#weeklyDatePicker").val(firstDate + " ~ " + lastDate);
    });
}