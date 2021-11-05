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


function refreshWeeklyWork(week,thisWeekTextArea,nextWeekTextArea, DatePicker, userEmail) {
    $(thisWeekTextArea).val("");
    $(nextWeekTextArea).val("");
    let date, text;
    if (week === "thisWeek") {
        date = getThisWeek(DatePicker);
    }
    else if (week === "nextWeek") {
        date = getNextWeek(DatePicker);
    }

    let weeklyWorkObject = new Object();
    weeklyWorkObject.userEmail = userEmail;
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
                $(thisWeekTextArea).val(response.text)
            }
            else if (week === "nextWeek") {
                $(nextWeekTextArea).val(response.text)
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
    
    refreshWeeklyWork('thisWeek',"#thisWeekTextArea","#nextWeekTextArea","#weeklyDatePicker","");
    refreshWeeklyWork('nextWeek',"#thisWeekTextArea","#nextWeekTextArea","#weeklyDatePicker","");

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
        
        refreshWeeklyWork('thisWeek',"#thisWeekTextArea","#nextWeekTextArea","#weeklyDatePicker","");
        refreshWeeklyWork('nextWeek',"#thisWeekTextArea","#nextWeekTextArea","#weeklyDatePicker","");
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


function saveWorkSchedule() {
    let date;
    date = getThisWeek("#scheduleDatePicker");
    let scheduleObject = new Object();
    scheduleObject.startDate = date.startDate;
    scheduleObject.endDate = date.endDate;
    scheduleObject.schedule = [$("#monWork").val(),$("#tueWork").val(), $("#wedWork").val(), $("#thuWork").val(), $("#friWork").val()];
    let jsonData = JSON.stringify(scheduleObject)

    $.ajax({
        type: 'post',
        url: '/saveWorkSchedule',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            alert("저장 성공");
            window.location.href = "/workSchedule"
        },
        error: function (request, status, error) {
            alert("Message : " + request.responseJSON.msg);
            window.location.href = "/"
        }
    });
}

function refreshWorkSchedule(DatePicker, flag) {
    let forAdminSchedune = {
        0: "사무실",
        1: "재택",
        2: "휴무",
    }
    let date = getThisWeek(DatePicker);
    let workScheduleObject = new Object();
    workScheduleObject.startDate = date.startDate;
    workScheduleObject.endDate = date.endDate;
    let jsonData = JSON.stringify(workScheduleObject)

    let schedules;
    $.ajax({
        type: 'post',
        url: '/refreshWorkSchedule',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        async:false,
        success: function (response) {
            schedules = response.schedule;
        },
        error: function (request, status, error) {
            if (request.responseJSON.result == 'empty') {
                schedules = 0;
            }
        }
    });
    
    if (flag == 0) {
        if (schedules != 0) {
            $("#monWork").val(schedules[0])
            $("#tueWork").val(schedules[1])
            $("#wedWork").val(schedules[2])
            $("#thuWork").val(schedules[3])
            $("#friWork").val(schedules[4])
        } else {
            $("#monWork").val(0)
            $("#tueWork").val(0)
            $("#wedWork").val(0)
            $("#thuWork").val(0)
            $("#friWork").val(0)
        }
    }
    // admin.html에서 호출한 경우
    else {
        if (schedules != 0) {
            $(".modal-body #mon").text(forAdminSchedune[schedules[0]]);
            $(".modal-body #tue").text(forAdminSchedune[schedules[1]]);
            $(".modal-body #wed").text(forAdminSchedune[schedules[2]]);
            $(".modal-body #thu").text(forAdminSchedune[schedules[3]]);
            $(".modal-body #fri").text(forAdminSchedune[schedules[4]]);
        } else {
            $(".modal-body #mon").text("사무실");
            $(".modal-body #tue").text("사무실");
            $(".modal-body #wed").text("사무실");
            $(".modal-body #thu").text("사무실");
            $(".modal-body #fri").text("사무실");
        }
    }
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
    refreshWorkSchedule("#scheduleDatePicker",0);

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
        refreshWorkSchedule("#scheduleDatePicker",0);
    });
}


// device.html 
function getDevice(mac){
    let device;
    $.ajax({
        type: 'get',
        url: '/getDevice',
        data: { devMacId : mac},
        async: false,
        success: function (response,status) {
            device = response;

        },
        error: function (request, status, error) {
            alert("Message : " + request.responseJSON.msg);
            device = 0;
        }
    });
    return device;
}

// device.html 
function getDevices(userName){
    let devices;
    $.ajax({
        type: 'get',
        url: '/getDevices',
        data: { userName : userName},
        async: false,
        success: function (response,status) {
            devices = response;

        },
        error: function (request, status, error) {
            alert("Message : " + request.responseJSON.msg);
            devices = 0;
        }
    });
    return devices;
}

function initDevice() {
    var table = $('#table_id').DataTable({
        select: true,
        ordering: false,
        paging: false
    });


    $('#table_id tbody').on('click', 'tr', function () {
        if (table.row(this).index() === 0) {
            $('#gigaModal').modal('show');
            return;
        }
        let device = getDevice(table.row(this).data()[1]);
        $(".modal-body #model").val(device.model);
        $(".modal-body #mac").val(device.devMacId);
        $(".modal-body #said").val(device.said);
        $(".modal-body #user").val(device.userName);
        $(".modal-body #otv").prop("checked", device.otv);
        $(".modal-body #serial").prop("checked", device.serial);
        $(".modal-body #msg").val(device.msg);

        $('#gigaModal').modal('show');
    });
}

// admin.html

function initAdmin() {
    $('#table_admin').DataTable({
        ordering: false,
        paging: false,
        autoWidth: false,
    });
}

function initAdminDeviceTable() {
    $('#tableAdminDevice').DataTable({
        ordering: false,
        paging: false,
        autoWidth: false,
        info: false
    });
}

function destroyAdminDeviceTable() {
    $('#tableAdminDevice').DataTable().destroy();
}

function initAdminDatePicker(userEmail) {
    moment.locale('en', {
        week: { dow: 1 } 
    });

    

    $("#adminDatePicker").datetimepicker({
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

    let thisMonday = moment().day(1);
    let thisFriday = moment().day(5);
    $("#adminDatePicker").val(thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD"));


    refreshWeeklyWork('thisWeek',"#thisWeekTextArea","#nextWeekTextArea","#adminDatePicker",userEmail);
    refreshWeeklyWork('nextWeek',"#thisWeekTextArea","#nextWeekTextArea","#adminDatePicker",userEmail);
    refreshWorkSchedule("#adminDatePicker",1);
    //Get the value of Start and End of Week
    $('#adminDatePicker').on('dp.change', function (e) {
        var value = $("#adminDatePicker").val();
        var firstDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
        var lastDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
        $("#adminDatePicker").val(firstDate + " ~ " + lastDate);

        refreshWeeklyWork('thisWeek',"#thisWeekTextArea","#nextWeekTextArea","#adminDatePicker",userEmail);
        refreshWeeklyWork('nextWeek', "#thisWeekTextArea", "#nextWeekTextArea", "#adminDatePicker",userEmail);
        refreshWorkSchedule("#adminDatePicker",1);
    });
}


function setPermission(userEmail, userName, isAdmin) {
    let userObject = new Object();
    userObject.userEmail = userEmail;
    userObject.userName = userName;
    userObject.isAdmin = isAdmin;
    let jsonData = JSON.stringify(userObject)

    $.ajax({
        type: 'post',
        url: '/setPermission',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            alert("권한 변경 성공!");
        },
        error: function (request, status, error) {
            alert("Message : " + request.responseJSON.msg);
        }
    });
}