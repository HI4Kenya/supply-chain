<script>
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };

    $('#savePdf').click(function () {
        doc.fromHTML($('#content').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.save('sample-file.pdf');
    });
</script>


<div class="container-fluid" id="content">
    <div class="panel panel-success">
        <div class="panel-heading">
            <h2>Ministry Of Health</h2></br></br>
            <h3 id="formName"></h3></br>
            <b style="color:black">Facility Name:</b><span id="facility_detail"></span>&nbsp;&nbsp;&nbsp;<b style="color:black">Master Facility Code:</b><span id="facility_id"></span>&nbsp;&nbsp;
            <h4><b>Period of reporting:<span id="reportingperiod"></span></b></h4>
            <button class="btn btn-success post-data">Post Data</button>
<!--            <div id="editor"></div>-->
<!--            <button id="savePdf" class="btn btn-default">Save as PDF</button>-->

            <div id="loading"></div>
            <div id="post-log"></div>
        </div>
        <div class="panel-body" style="overflow: scroll" id="formData">
        </div>
    </div>

    <p>&nbsp;</p>

</div>
