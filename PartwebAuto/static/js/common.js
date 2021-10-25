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

    if (selectedDay <= (7 - firstDaynameToNumofMonth)) return { weekNum : 1, month : selectedMonth };
    else if (selectedDay >= (8 - firstDaynameToNumofMonth) && selectedDay <= (14 - firstDaynameToNumofMonth)) return {weekNum :2, month : selectedMonth };
    else if (selectedDay >= (15 - firstDaynameToNumofMonth) && selectedDay <= (21 - firstDaynameToNumofMonth)) return {weekNum :3, month : selectedMonth };
    else if (selectedDay >= (22 - firstDaynameToNumofMonth) && selectedDay <= (28 - firstDaynameToNumofMonth)) return {weekNum :4, month : selectedMonth };
    else if (selectedDay >= (29 - firstDaynameToNumofMonth)) return {weekNum :5, month : selectedMonth };
    else return {weekNum :-1, month : selectedMonth };
}


function refreshWeeklyWork(week) {
    $("#thisWeekTextArea").val("");
    $("#nextWeekTextArea").val("");
    let date, text;
    if (week === "thisWeek") {
        date = getThisWeek("#weeklyDatePicker");
    }
    else if (week === "nextWeek") {
        date = getNextWeek("#weeklyDatePicker");
    }

    let weeklyWorkObject = new Object();
    weeklyWorkObject.startDate = date.startDate;
    weeklyWorkObject.endDate = date.endDate;
    let jsonData = JSON.stringify(weeklyWorkObject)

    $.ajax({
        type: 'post',
        url: '/refreshWeeklyWork',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        success: function (response,status) {
            if(response.result == 'empty'){
                return;
            }

            if (week === "thisWeek") {
                $("#thisWeekTextArea").val(response.text)
            }
            else if (week === "nextWeek") {
                $("#nextWeekTextArea").val(response.text)
            }

        },
        error: function (request, status, error) {
            alert("Message : " + request.responseText);
            window.location.href = "/weeklyWork"
        }
    });
}

function getThisWeek(picker) {
    var value = $(picker).val();
    var startDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
    var endDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
    return { startDate: startDate, endDate: endDate };
}

function getNextWeek(picker) {
    var value = $(picker).val();
    var startDate = moment(value, "YYYY-MM-DD").day(1).add(7,"d").format("YYYY-MM-DD");
    var endDate = moment(value, "YYYY-MM-DD").day(5).add(7,"d").format("YYYY-MM-DD");
    return { startDate: startDate, endDate: endDate };
}


function initDatePicker() {
    moment.locale('en', {
        week: { dow: 1 } 
    });

    $("#weeklyDatePicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat:'YYYY-MM',
        daysOfWeekDisabled:[0,6],
        toolbarPlacement: 'top',
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
            previous: "fa fa-chevron-left",
            next: "fa fa-chevron-right",
            today: "fa fa-clock-o",
            clear: "fa fa-trash-o"
        }
    });

    // 이번 주를 나타냄
    // 이번 주 월요일
    let thisMonday = moment().day(1);
    let thisFriday = moment().day(5);
    let nextMonday = moment().day(1).add(7,"d");
    let nextFriday = moment().day(5).add(7,"d");
    let weekTitle = weekNumByMonth(thisMonday.format("YYYY-MM-DD"));

    $("#weeklyDatePicker").val(thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD"));
    $("#weeklyWorkTitle").text("" + weekTitle.month + "월 " + weekTitle.weekNum + "주차 주간보고");
    //$("#weeklyWorkTitle").text("" + thisMonday.format("MM") + "월 " + weekTitle.weekNum + "주차 주간보고");

    $("#thisWeekTextAreaLabel").text("이번 주 실적(" + thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD")+")");
    $("#nextWeekTextAreaLabel").text("다음 주 계획(" + nextMonday.format("YYYY-MM-DD") + " ~ " + nextFriday.format("YYYY-MM-DD") + ")");
    
    refreshWeeklyWork('thisWeek');
    refreshWeeklyWork('nextWeek');


    //Get the value of Start and End of Week
    $('#weeklyDatePicker').on('dp.change', function (e) {
        var value = $("#weeklyDatePicker").val();
        var firstDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
        var lastDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
        $("#weeklyDatePicker").val(firstDate + " ~ " + lastDate);
        let thisWeekTitle = weekNumByMonth(firstDate);
        $("#weeklyWorkTitle").text("" + thisWeekTitle.month + "월 " + thisWeekTitle.weekNum + "주차 주간보고");

        let nextWeekFirstDate = moment(value, "YYYY-MM-DD").day(1).add(7, "d").format("YYYY-MM-DD");
        let nextWeekLastDate = moment(value, "YYYY-MM-DD").day(5).add(7, "d").format("YYYY-MM-DD");

        $("#thisWeekTextAreaLabel").text("이번 주 실적(" + firstDate + "~" + lastDate+")");
        $("#nextWeekTextAreaLabel").text("다음 주 계획(" + nextWeekFirstDate + "~" + nextWeekLastDate + ")");
        
        refreshWeeklyWork('thisWeek');
        refreshWeeklyWork('nextWeek');
    });
}



function saveWeeklyWork(week) {
    let date, text;
    if(week === "thisWeek"){
        date = getThisWeek("#weeklyDatePicker");
        text = $("#thisWeekTextArea").val();
    }
    else if (week === "nextWeek"){
        date = getNextWeek("#weeklyDatePicker");
        text = $("#nextWeekTextArea").val();
    }

    let weeklyWorkObject = new Object();
    weeklyWorkObject.startDate = date.startDate;
    weeklyWorkObject.endDate = date.endDate;
    weeklyWorkObject.text = text;
    let jsonData = JSON.stringify(weeklyWorkObject)

    $.ajax({
        type: 'post',
        url: '/saveWeeklyWork',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            alert("저장 완료");
        },
        error: function (request, status, error) {
            alert("Message : " + request.responseText);
        }
    });
}


function refreshWorkSchedule() {
    let date = getThisWeek("#scheduleDatePicker");
    let workScheduleObject = new Object();
    workScheduleObject.startDate = date.startDate;
    workScheduleObject.endDate = date.endDate;
    let jsonData = JSON.stringify(workScheduleObject)

    $.ajax({
        type: 'post',
        url: '/refreshWorkSchedule',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            $("#monWork").val(response[0].schedule)
            $("#tueWork").val(response[1].schedule)
            $("#wedWork").val(response[2].schedule)
            $("#thuWork").val(response[3].schedule)
            $("#friWork").val(response[4].schedule)
        },
        error: function (request, status, error) {
            if (request.responseJSON.result == 'fail') {
                $("#monWork").val(0)
                $("#tueWork").val(0)
                $("#wedWork").val(0)
                $("#thuWork").val(0)
                $("#friWork").val(0)
            }
        }
    });
}


function initScheduleDatePicker() {
    moment.locale('en', {
        week: { dow: 1 } 
    });

    $("#scheduleDatePicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat:'YYYY-MM',
        daysOfWeekDisabled:[0,6],
        toolbarPlacement: 'top',
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
            previous: "fa fa-chevron-left",
            next: "fa fa-chevron-right",
            today: "fa fa-clock-o",
            clear: "fa fa-trash-o"
        }
    });

    // 이번 주를 나타냄
    // 이번 주 월요일
    let thisMonday = moment().day(1);
    let thisFriday = moment().day(5);
    let weekTitle = weekNumByMonth(thisMonday.format("YYYY-MM-DD"));

    $("#scheduleDatePicker").val(thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD"));
    $("#workScheduleTitle1").text("" + weekTitle.month + "월 " + weekTitle.weekNum + "주차 재택 근무 일정");
    $("#workScheduleTitle2").text("" + thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD"));
    
    // 각 요일 title에 날짜를 표시하기
    $("#monWorkTitle").html("월요일<br/>["+moment().day(1).format("DD") + "일]");
    $("#tueWorkTitle").html("화요일<br/>["+moment().day(2).format("DD") + "일]");
    $("#wedWorkTitle").html("수요일<br/>["+moment().day(3).format("DD") + "일]");
    $("#thuWorkTitle").html("목요일<br/>["+moment().day(4).format("DD") + "일]");
    $("#friWorkTitle").html("금요일<br/>[" + moment().day(5).format("DD") + "일]");
    
    // DB에서 불러온 각 Select값 Set
    refreshWorkSchedule();

    $('#scheduleDatePicker').on('dp.change', function (e) {
        var value = $("#scheduleDatePicker").val();
        var firstDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
        var lastDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
        $("#scheduleDatePicker").val(firstDate + " ~ " + lastDate);
        let thisWeekTitle = weekNumByMonth(firstDate);
        let nextWeekFirstDate = moment(value, "YYYY-MM-DD").day(1).add(7, "d").format("YYYY-MM-DD");
        let nextWeekLastDate = moment(value, "YYYY-MM-DD").day(5).add(7, "d").format("YYYY-MM-DD");

        $("#workScheduleTitle1").text("" + thisWeekTitle.month + "월 " + thisWeekTitle.weekNum + "주차 재택 근무 일정" );
        $("#workScheduleTitle2").text("" + firstDate + " ~ " + lastDate);
        // 각 요일 title에 날짜를 표시하기
        $("#monWorkTitle").html("월요일<br/>["+moment(value, "YYYY-MM-DD").day(1).format("DD") + "일]");
        $("#tueWorkTitle").html("화요일<br/>["+moment(value, "YYYY-MM-DD").day(2).format("DD") + "일]");
        $("#wedWorkTitle").html("수요일<br/>["+moment(value, "YYYY-MM-DD").day(3).format("DD") + "일]");
        $("#thuWorkTitle").html("목요일<br/>["+moment(value, "YYYY-MM-DD").day(4).format("DD") + "일]");
        $("#friWorkTitle").html("금요일<br/>[" + moment(value, "YYYY-MM-DD").day(5).format("DD") + "일]");

        // DB에서 불러온 각 Select값 Set
        refreshWorkSchedule();
    });
}
