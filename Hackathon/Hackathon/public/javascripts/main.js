
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
                        '<td><input type="text" name="name_' + mylist.id + '" value="' + mylist.name +
                        '"></input></td><td><input type="text" name="StromProKopf_' + mylist.id + '" value="' + mylist.StromProKopf +
                        '"></input></td><td><input type="text" name="StromProQM_' + mylist.id + '" value="' + mylist.StromProQM +
                        '"></input></td><td><input type="text" name="GasProKopf_' + mylist.id + '" value="' + mylist.GasProKopf +
                        '"></input></td><td><input type="text" name="GasProQM_' + mylist.id + '" value="' + mylist.GasProQM +
                        '"></input></td><td><input type="text" name="OilProKopf_' + mylist.id + '" value="' + mylist.OilProKopf +
                        '"></input></td><td><input type="text" name="OilProQM_' + mylist.id + '" value="' + mylist.OilProQM +
                        '"></input></td><td><button onClick="onUpdate(' + mylist.id + ')">Update</button></td></tr>');
                });

        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);

        }
    });

    $('#add-title').on('click', function() {
        var titleObj = {
            title: $title.val(), "StromProKopf": "1",
            "StromProQM": "1",
            "GasProKopf": "1",
            "GasProQM": "1",
            "OilProKopf": "1",
            "OilProQM": "1" };

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/branchen',
                data: titleObj,
                success: function(mylist) {
                    $orders.append('<tr id="brance_' + titleObj.id + '><td><input type="text" name="name_' + titleObj.id+'" value="' + mylist.name +
                        '"></input></td><td><input type="text" name="StromProKopf_' + mylist.id + '" value="' + titleObj.StromProKopf +
                        '"></input></td><td><input type="text" name="StromProQM_' + mylist.id + '" value="' + titleObj.StromProQM +
                        '"></input></td><td><input type="text" name="GasProKopf_' + mylist.id + '" value="' + titleObj.GasProKopf +
                        '"></input></td><td><input type="text" name="GasProQM_' + mylist.id + '" value="' + titleObj.GasProQM +
                        '"></input></td><td><input type="text" name="OilProKopf_' + mylist.id + '" value="' + titleObj.OilProKopf +
                        '"></input></td><td><input type="text" name="OilProQM_' + mylist.id + '" value="' + titleObj.OilProQM +
                        '"></input><button onClick=("onUpdate(' + mylist.id + ')")) Update /></td></tr>');
                },
                error: function (xhr, status, error) {
                    alert(xhr.responseText);
                   
                }
            });
    });

    

});

function onUpdate(id) {
    var titleObj = {
        title: $('#name_' + id).val(),
        "StromProKopf": $('#StromProKopf_' + id).val(),
        "StromProQM": $('#StromProQM_' + id).val(),
        "GasProKopf": $('#GasProKopf_' + id).val(),
        "GasProQM": $('#GasProQM_' + id).val(),
        "OilProKopf": $('#OilProKopf_' + id).val(),
        "OilProQM": $('#OilProQM_' + id).val()
    };

    request = $.ajax({ url: 'http://localhost:3000/branchen/' + id, type: 'POST', data: titleObj });

    request.done(function () {
        alert('updated');
        window.location.href = "/";
    });
}