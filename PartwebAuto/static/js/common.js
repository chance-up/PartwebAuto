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


function weekNumByMonth(dateFormat) {
    const inputDate = new Date(dateFormat);
    var firstDaynameToNumofMonth = moment(inputDate).date(1).day()
    var selectedDay = moment(inputDate).format("DD");
    var selectedMonth = moment(inputDate).format("MM");

    // console.log("!! " + moment(inputDate).format("MM") + "월의 시작 요일은 : " + moment(inputDate).startOf("month").format("ddd"));
    // console.log("!! 숫자로바꾸면?:: " + firstDaynameToNumofMonth);
    // console.log("!! 선택한날짜는?:: " + selectedDay);

    
    if (selectedDay <= (7 - firstDaynameToNumofMonth)) return { weekNum : 1, month : selectedMonth };
    else if (selectedDay >= (8 - firstDaynameToNumofMonth) && selectedDay <= (14 - firstDaynameToNumofMonth)) return {weekNum :2, month : selectedMonth };
    else if (selectedDay >= (15 - firstDaynameToNumofMonth) && selectedDay <= (21 - firstDaynameToNumofMonth)) return {weekNum :3, month : selectedMonth };
    else if (selectedDay >= (22 - firstDaynameToNumofMonth) && selectedDay <= (28 - firstDaynameToNumofMonth)) return {weekNum :4, month : selectedMonth };
    else if (selectedDay >= (29 - firstDaynameToNumofMonth)) return {weekNum :5, month : selectedMonth };
    else return {weekNum :-1, month : selectedMonth };
}


function initDatePicker() {
    moment.locale('en', {
        week: { dow: 1 } // Monday is the first day of the week
    });

    //$("#weeklyDatePicker").val(firstDate + " - " + lastDate)


    

    //Initialize the datePicker(I have taken format as mm-dd-yyyy, you can     //have your owh)
    $("#weeklyDatePicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat:'YYYY-MM',
        daysOfWeekDisabled:[0,6],
        toolbarPlacement:'top'
    });

    $("#weeklyDatePicker").val(moment().day(1).format("YYYY-MM-DD") + " ~ " + moment().day(5).format("YYYY-MM-DD"));
    let weekTitle = weekNumByMonth(moment().day(1).format("YYYY-MM-DD"));
    $("#weeklyWorkTitle").text(""+weekTitle.month+"월 " + weekTitle.weekNum + "주차 주간보고");
    //$("#weeklyWorkTitle").val("" + weekTitle + "주차 주간보고");
    
    
    // var tempDate = moment("2021-01-01");
    // for (var i = 0; i < 365; i++){
    //     tempDate.add(1, 'd')
    //     console.log("현재날짜 : " + tempDate.format("YYYY-MM-DD") + ", 주차 : " + weekNumByMonth(tempDate.format("YYYY-MM-DD")));
    // }
    // var temp = weekNumberByMonth(moment().day(1).format("YYYY-MM-DD"));
    // console.log(moment().day(1).format("YYYY-MM-DD"));
    // console.log(temp);
    
    // if (weekdayNameToNum[firstDaynameofMonth] < ) {
        
    // }


    // $('#weeklyWorkTitle').val(" " + temp.month + "월 " + temp.weekNo + "주차 주간보고");

    //Get the value of Start and End of Week
    $('#weeklyDatePicker').on('dp.change', function (e) {
        var value = $("#weeklyDatePicker").val();
        var firstDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
        var lastDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
        $("#weeklyDatePicker").val(firstDate + " ~ " + lastDate);
        let weekTitle = weekNumByMonth(firstDate);
        $("#weeklyWorkTitle").text(""+weekTitle.month+"월 " + weekTitle.weekNum + "주차 주간보고");
    });
}
