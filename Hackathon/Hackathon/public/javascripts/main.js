//
//Get data on start from REST service
//
$(function() {

    var $orders = $('#mylist');
    var $title = $('#title');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/branchen',
        success: function(mylist) {
            $.each(mylist,
                function(i, mylist) {
                    $orders.append('<tr id="brance_' + mylist.id + '">' +
                        '<td><input type="text" id="name_' + mylist.id + '" value="' + mylist.name +
                        '"></input></td><td><input type="text" id="StromProKopf_' + mylist.id + '" value="' + mylist.StromProKopf +
                        '"></input></td><td><input type="text" id="StromProQM_' + mylist.id + '" value="' + mylist.StromProQM +
                        '"></input></td><td><input type="text" id="GasProKopf_' + mylist.id + '" value="' + mylist.GasProKopf +
                        '"></input></td><td><input type="text" id="GasProQM_' + mylist.id + '" value="' + mylist.GasProQM +
                        '"></input></td><td><input type="text" id="OilProKopf_' + mylist.id + '" value="' + mylist.OilProKopf +
                        '"></input></td><td><input type="text" id="OilProQM_' + mylist.id + '" value="' + mylist.OilProQM +
                        '"></input></td><td><button onClick="onUpdate(' + mylist.id + ')">Update</button></td></tr>');
                });

        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);

        }
    });

    //
    // Add click event to Add button adding new Brance with name
    //
    $('#add-title').on('click', function() {
       
        // Data are formated as json string because java script objects carshes parser
        var titleObj = "{\"name\":\"" + $title.val() + "\"," +
            "\"StromProKopf\":\"1\"," +
            "\"StromProQM\":\"1\"," +
            "\"GasProKopf\":\"1\"," +
            "\"GasProQM\":\"1\"," +
            "\"OilProKopf\":\"1\"," +
            "\"OilProQM\":\"1\"}";

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/branchen',
                data: titleObj,
                contentType: "application/json",//set content type to use json parser in server
                success: function(mylist) {
                    $orders.append('<tr id="brance_' + titleObj.id + '><td><input type="text" id="name_' + titleObj.id+'" value="' + mylist.name +
                        '"></input></td><td><input type="text" id="StromProKopf_' + mylist.id + '" value="' + titleObj.StromProKopf +
                        '"></input></td><td><input type="text" id="StromProQM_' + mylist.id + '" value="' + titleObj.StromProQM +
                        '"></input></td><td><input type="text" id="GasProKopf_' + mylist.id + '" value="' + titleObj.GasProKopf +
                        '"></input></td><td><input type="text" id="GasProQM_' + mylist.id + '" value="' + titleObj.GasProQM +
                        '"></input></td><td><input type="text" id="OilProKopf_' + mylist.id + '" value="' + titleObj.OilProKopf +
                        '"></input></td><td><input type="text" id="OilProQM_' + mylist.id + '" value="' + titleObj.OilProQM +
                        '"></input><button onClick=("onUpdate(' + mylist.id + ')")) Update /></td></tr>');
                },
                error: function (xhr, status, error) {
                    alert(xhr.responseText);
                   
                }
            });
    });

    

});

//
// Add function used by update Buttons, id is id of entry from REST service
//
function onUpdate(id) {

    var name = $('#name_' + id);

    // Data are formated as json string because java script objects carshes parser
    var titleObj = "{\"id\":\""+id+"\","+
        "\"name\":\""+ name.val()+"\","+
        "\"StromProKopf\":\""+ $('#StromProKopf_' + id).val() + "\"," +
        "\"StromProQM\":\"" + $('#StromProQM_' + id).val() + "\"," +
        "\"GasProKopf\":\"" + $('#GasProKopf_' + id).val() + "\"," +
        "\"GasProQM\":\"" + $('#GasProQM_' + id).val() + "\"," +
        "\"OilProKopf\":\"" + $('#OilProKopf_' + id).val() + "\"," +
        "\"OilProQM\":\"" + $('#OilProQM_' + id).val() + "\"}";

    
    request = $.ajax({
        url: 'http://localhost:3000/branchen/' + id,
        type: 'PATCH',
        contentType: "application/json",//set content type to use json parser in server
        data: titleObj,
        sucess: function (mylist) {
            alert('updated');
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);

        }
    });

    request.done(function () {
        alert('updated');
        window.location.href = "/";
    });
}