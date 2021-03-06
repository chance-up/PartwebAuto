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
    let date;
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
        url: '/weeklyWork',
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

    // ?????? ?????? ?????????
    // ?????? ??? ?????????
    let thisMonday = moment().day(1);
    let thisFriday = moment().day(5);
    let nextMonday = moment().day(1).add(7,"d");
    let nextFriday = moment().day(5).add(7,"d");
    let weekTitle = weekNumByMonth(thisMonday.format("YYYY-MM-DD"));

    $("#weeklyDatePicker").val(thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD"));
    $("#weeklyWorkTitle").text("" + weekTitle.month + "??? " + weekTitle.weekNum + "?????? ????????????");
    //$("#weeklyWorkTitle").text("" + thisMonday.format("MM") + "??? " + weekTitle.weekNum + "?????? ????????????");

    $("#thisWeekTextAreaLabel").text("?????? ??? ??????(" + thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD")+")");
    $("#nextWeekTextAreaLabel").text("?????? ??? ??????(" + nextMonday.format("YYYY-MM-DD") + " ~ " + nextFriday.format("YYYY-MM-DD") + ")");
    
    refreshWeeklyWork('thisWeek',"#thisWeekTextArea","#nextWeekTextArea","#weeklyDatePicker","");
    refreshWeeklyWork('nextWeek',"#thisWeekTextArea","#nextWeekTextArea","#weeklyDatePicker","");

    //Get the value of Start and End of Week
    $('#weeklyDatePicker').on('dp.change', function (e) {
        var value = $("#weeklyDatePicker").val();
        var firstDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
        var lastDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
        $("#weeklyDatePicker").val(firstDate + " ~ " + lastDate);
        let thisWeekTitle = weekNumByMonth(firstDate);
        $("#weeklyWorkTitle").text("" + thisWeekTitle.month + "??? " + thisWeekTitle.weekNum + "?????? ????????????");

        let nextWeekFirstDate = moment(value, "YYYY-MM-DD").day(1).add(7, "d").format("YYYY-MM-DD");
        let nextWeekLastDate = moment(value, "YYYY-MM-DD").day(5).add(7, "d").format("YYYY-MM-DD");

        $("#thisWeekTextAreaLabel").text("?????? ??? ??????(" + firstDate + "~" + lastDate+")");
        $("#nextWeekTextAreaLabel").text("?????? ??? ??????(" + nextWeekFirstDate + "~" + nextWeekLastDate + ")");
        
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
        type: 'put',
        url: '/weeklyWork',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            alert("?????? ??????");
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
        type: 'put',
        url: '/workSchedule',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            alert("?????? ??????");
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
        0: "?????????",
        1: "??????",
        2: "??????",
    }
    let date = getThisWeek(DatePicker);
    let workScheduleObject = new Object();
    workScheduleObject.startDate = date.startDate;
    workScheduleObject.endDate = date.endDate;
    let jsonData = JSON.stringify(workScheduleObject)

    let schedules;
    $.ajax({
        type: 'post',
        url: '/workSchedule',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        async:false,
        success: function (response) {
            if (response.result == 'empty') {
                schedules = [0,0,0,0,0];
                return;
            }
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
    // admin.html?????? ????????? ??????
    else {
        if (schedules != 0) {
            $(".modal-body #mon").text(forAdminSchedune[schedules[0]]);
            $(".modal-body #tue").text(forAdminSchedune[schedules[1]]);
            $(".modal-body #wed").text(forAdminSchedune[schedules[2]]);
            $(".modal-body #thu").text(forAdminSchedune[schedules[3]]);
            $(".modal-body #fri").text(forAdminSchedune[schedules[4]]);
        } else {
            $(".modal-body #mon").text("?????????");
            $(".modal-body #tue").text("?????????");
            $(".modal-body #wed").text("?????????");
            $(".modal-body #thu").text("?????????");
            $(".modal-body #fri").text("?????????");
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

    // ?????? ?????? ?????????
    // ?????? ??? ?????????
    let thisMonday = moment().day(1);
    let thisFriday = moment().day(5);
    let weekTitle = weekNumByMonth(thisMonday.format("YYYY-MM-DD"));

    $("#scheduleDatePicker").val(thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD"));
    $("#workScheduleTitle1").text("" + weekTitle.month + "??? " + weekTitle.weekNum + "?????? ?????? ?????? ??????");
    $("#workScheduleTitle2").text("" + thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD"));
    
    // ??? ?????? title??? ????????? ????????????
    $("#monWorkTitle").html("?????????<br/>["+moment().day(1).format("DD") + "???]");
    $("#tueWorkTitle").html("?????????<br/>["+moment().day(2).format("DD") + "???]");
    $("#wedWorkTitle").html("?????????<br/>["+moment().day(3).format("DD") + "???]");
    $("#thuWorkTitle").html("?????????<br/>["+moment().day(4).format("DD") + "???]");
    $("#friWorkTitle").html("?????????<br/>[" + moment().day(5).format("DD") + "???]");
    
    // DB?????? ????????? ??? Select??? Set
    refreshWorkSchedule("#scheduleDatePicker",0);

    $('#scheduleDatePicker').on('dp.change', function (e) {
        var value = $("#scheduleDatePicker").val();
        var firstDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
        var lastDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
        $("#scheduleDatePicker").val(firstDate + " ~ " + lastDate);
        let thisWeekTitle = weekNumByMonth(firstDate);
        let nextWeekFirstDate = moment(value, "YYYY-MM-DD").day(1).add(7, "d").format("YYYY-MM-DD");
        let nextWeekLastDate = moment(value, "YYYY-MM-DD").day(5).add(7, "d").format("YYYY-MM-DD");

        $("#workScheduleTitle1").text("" + thisWeekTitle.month + "??? " + thisWeekTitle.weekNum + "?????? ?????? ?????? ??????" );
        $("#workScheduleTitle2").text("" + firstDate + " ~ " + lastDate);
        // ??? ?????? title??? ????????? ????????????
        $("#monWorkTitle").html("?????????<br/>["+moment(value, "YYYY-MM-DD").day(1).format("DD") + "???]");
        $("#tueWorkTitle").html("?????????<br/>["+moment(value, "YYYY-MM-DD").day(2).format("DD") + "???]");
        $("#wedWorkTitle").html("?????????<br/>["+moment(value, "YYYY-MM-DD").day(3).format("DD") + "???]");
        $("#thuWorkTitle").html("?????????<br/>["+moment(value, "YYYY-MM-DD").day(4).format("DD") + "???]");
        $("#friWorkTitle").html("?????????<br/>[" + moment(value, "YYYY-MM-DD").day(5).format("DD") + "???]");

        // DB?????? ????????? ??? Select??? Set
        refreshWorkSchedule("#scheduleDatePicker",0);
    });
}


// device.html 
function getDevice(mac){
    let device;
    $.ajax({
        type: 'get',
        url: '/device/getDevice',
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
        url: '/device/getDevices',
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

function initAdminAllWeeklyWorkTable() {
    let date = $("#adminDatePickerAll").val();
    
    $('#WeeklyWorktableAdmin').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
				extend: 'excelHtml5'
				,text: '????????????'
				,filename: '????????????'
                , title: date,
                exportOptions: {
                    format: {
                        body: function(data, column, row) {
                            if (typeof data === 'string' || data instanceof String) {
                                data = data.replace(/<br\s*\/?>/ig, "\r\n");
                            }
                            return data;
                        }
                    }
                }
                
			},
        ],
        searching: false,
        ordering: false,
        paging: false,
        autoWidth: false,
        info: false,
    });
}

function initAdminWorkScheduleTable() {
    let date = $("#adminDatePickerAllSchedule").val();
    
    $('#WorkScheduleTableAdmin').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
				extend: 'excelHtml5'
				,text: '????????????'
				,filename: '????????????'
                , title: date,
                exportOptions: {
                    format: {
                        body: function(data, column, row) {
                            if (typeof data === 'string' || data instanceof String) {
                                data = data.replace(/<br\s*\/?>/ig, "\r\n");
                            }
                            return data;
                        }
                    }
                }
                
			},
        ],
        searching: false,
        ordering: false,
        paging: false,
        autoWidth: false,
        info: false,
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
        url: '/admin/setPermission',
        data: jsonData,
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            alert("?????? ?????? ??????!");
        },
        error: function (request, status, error) {
            alert("Message : " + request.responseJSON.msg);
        }
    });
}


function getWeeklyWorks(startDate){
    let weeklyWorks;
    $.ajax({
        type: 'get',
        url: '/admin/getAdminWeeklyWorks',
        data: { startDate : startDate},
        async: false,
        success: function (response,status) {
            weeklyWorks = response;
        },
        error: function (request, status, error) {
            alert("Message : " + request.responseJSON.msg);
            weeklyWorks = 0;
        }
    });

    return weeklyWorks;
}


function getAdminAllUser(){
    let allUsers;
    $.ajax({
        type: 'get',
        url: '/admin/getAdminAllUser',
        async: false,
        success: function (response,status) {
            allUsers = response;
        },
        error: function (request, status, error) {
            alert("Message : " + request.responseJSON.msg);
            allUsers = 0;
        }
    });

    return allUsers;
}

function getAllWeeklyWorks(thisMonday) {
    $('#adminWeeklyWork').html("");
    let tempKeyname = '';
    let tempObject = {};
    var mySet = new Set();
    let allUsers = getAdminAllUser();
    for (let i = 0; i < allUsers.length; i++){
        mySet.add(allUsers[i]["userName"]);
    }

    // ?????? ??? ?????? ???????????? ???????????? ????????? ????????????.
    let thisWeeklyWorks = getWeeklyWorks(thisMonday.format("YYYY-MM-DD"));
    for (let i = 0; i < thisWeeklyWorks.length; i++) {
        tempKeyname = thisWeeklyWorks[i].userName;
        tempObject[tempKeyname + 'thisWeek'] = thisWeeklyWorks[i].text.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
    
    // ?????? ??? ?????? ???????????? ???????????? ????????? ????????????.
    let nextWeeklyWorks = getWeeklyWorks(thisMonday.add('days', 7).format("YYYY-MM-DD"));
    for (let i = 0; i < nextWeeklyWorks.length; i++) {
        tempKeyname = nextWeeklyWorks[i].userName;
        tempObject[tempKeyname + 'nextWeek'] = nextWeeklyWorks[i].text.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

    let html = "";
    mySet.forEach((v) => {
        html += "<tr>";
        html += "<td>" + v + "</td>";
        html += (tempObject[v + 'thisWeek'] !== undefined ? "<td>" + tempObject[v + 'thisWeek'] + "</td>" : "<td style='color:red;'>?????????</td>")
        html += (tempObject[v + 'nextWeek'] !== undefined ?  "<td>" + tempObject[v + 'nextWeek']+ "</td>": "<td style='color:red;'>?????????</td>")
        html += "</tr>";
    });
    $('#adminWeeklyWork').append(html);
    return;
}



function initAdminDatePickerAll() {
    moment.locale('en', {
        week: { dow: 1 } 
    });

    $("#adminDatePickerAll").datetimepicker({
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
        },

    });

    let thisMonday = moment().day(1);
    let thisFriday = moment().day(5);
    $("#adminDatePickerAll").val(thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD"));
    getAllWeeklyWorks(thisMonday);
    initAdminAllWeeklyWorkTable();

    $('#adminDatePickerAll').on('dp.change', function (e) {
        var value = $("#adminDatePickerAll").val();
        var firstDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
        var lastDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
        $("#adminDatePickerAll").val(firstDate + " ~ " + lastDate);
        $('#WeeklyWorktableAdmin').DataTable().destroy();
        initAdminAllWeeklyWorkTable();
        getAllWeeklyWorks(moment(value, "YYYY-MM-DD").day(1));

    });
}

function getWorkSchedules(startDate){
    let workSchedules;
    $.ajax({
        type: 'get',
        url: '/admin/getAdminWorkSchedules',
        data: { startDate : startDate},
        async: false,
        success: function (response,status) {
            workSchedules = response;
        },
        error: function (request, status, error) {
            alert("Message : " + request.responseJSON.msg);
            workSchedules = 0;
        }
    });

    console.log(workSchedules);

    return workSchedules;
}


function getAllWorkSchedule(thisMonday) {
    $('#adminWorkSchedule').html("");
    let tempKeyname = '';
    let tempObject = {};
    var mySet = new Set();
    let allUsers = getAdminAllUser();
    for (let i = 0; i < allUsers.length; i++){
        mySet.add(allUsers[i]["userName"]);
    }

    // ?????? ??? ?????? ???????????? ???????????? ????????? ????????????.
    let thisWorkSchedules = getWorkSchedules(thisMonday.format("YYYY-MM-DD"));
    for (let i = 0; i < thisWorkSchedules.length; i++) {
        tempKeyname = thisWorkSchedules[i].userName;
        tempObject[tempKeyname + 'mon'] = thisWorkSchedules[i].schedule[0];
        tempObject[tempKeyname + 'tue'] = thisWorkSchedules[i].schedule[1];
        tempObject[tempKeyname + 'wed'] = thisWorkSchedules[i].schedule[2];
        tempObject[tempKeyname + 'thu'] = thisWorkSchedules[i].schedule[3];
        tempObject[tempKeyname + 'fri'] = thisWorkSchedules[i].schedule[4];
        
    }
    let forAdminSchedule = {
        0: "?????????",
        1: "??????",
        2: "??????",
    }

    let forAdminScheduleColor = {
        0: " class='h5 bg-primary text-white'",
        1: " class='h5 bg-success text-white'",
        2: " class='h5 bg-warning text-white'",
    }

    let html = "";
    mySet.forEach((v) => {
        html += "<tr align='center'>";
        html += "<td>" + v + "</td>";
        html += (tempObject[v + 'mon'] !== undefined ? ("<td" + forAdminScheduleColor[tempObject[v + 'mon']] + ">"
            + forAdminSchedule[tempObject[v + 'mon']]) + "</td>" : "<td class='h5 bg-primary text-white'>?????????</td>")
        html += (tempObject[v + 'tue'] !== undefined ? ("<td" + forAdminScheduleColor[tempObject[v + 'tue']] + ">"
            + forAdminSchedule[tempObject[v + 'tue']]) + "</td>" : "<td class='h5 bg-primary text-white'>?????????</td>")
        html += (tempObject[v + 'wed'] !== undefined ? ("<td" + forAdminScheduleColor[tempObject[v + 'wed']] + ">"
            + forAdminSchedule[tempObject[v + 'wed']]) + "</td>" : "<td class='h5 bg-primary text-white'>?????????</td>")
        html += (tempObject[v + 'thu'] !== undefined ? ("<td" + forAdminScheduleColor[tempObject[v + 'thu']] + ">"
            + forAdminSchedule[tempObject[v + 'thu']]) + "</td>" : "<td class='h5 bg-primary text-white'>?????????</td>")
        html += (tempObject[v + 'fri'] !== undefined ? ("<td" + forAdminScheduleColor[tempObject[v + 'fri']] + ">"
            + forAdminSchedule[tempObject[v + 'fri']]) + "</td>" : "<td class='h5 bg-primary text-white'>?????????</td>")
        html += "</tr>";
    });
    $('#adminWorkSchedule').append(html);
    return;
}




function initAdminDatePickerAllSchedule() {
    moment.locale('en', {
        week: { dow: 1 } 
    });

    $("#adminDatePickerAllSchedule").datetimepicker({
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
        },

    });

    let thisMonday = moment().day(1);
    let thisFriday = moment().day(5);
    $("#adminDatePickerAllSchedule").val(thisMonday.format("YYYY-MM-DD") + " ~ " + thisFriday.format("YYYY-MM-DD"));

    console.log(thisMonday);
    getAllWorkSchedule(thisMonday);
    // initAdminAllWeeklyWorkTable();

    $('#adminDatePickerAllSchedule').on('dp.change', function (e) {
        var value = $("#adminDatePickerAllSchedule").val();
        var firstDate = moment(value, "YYYY-MM-DD").day(1).format("YYYY-MM-DD");
        var lastDate = moment(value, "YYYY-MM-DD").day(5).format("YYYY-MM-DD");
        $("#adminDatePickerAllSchedule").val(firstDate + " ~ " + lastDate);
        // $('#WeeklyWorktableAdmin').DataTable().destroy();
        // initAdminAllWeeklyWorkTable();
        getAllWorkSchedule(moment(value, "YYYY-MM-DD").day(1));

    });
}


